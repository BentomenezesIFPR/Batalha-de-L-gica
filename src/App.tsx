import { useCallback, useEffect, useState } from 'react';
import { AnswerRecord, GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { TitleScreen } from './components/TitleScreen';
import { Question, selectMatchQuestions } from './data/questions';
import {
  playClickSound,
  playCorrectSound,
  playVictorySound,
  playWrongSound,
} from './utils/sound';

type GamePhase = 'TITLE' | 'PLAYING' | 'RESULT';

const BEST_SCORE_STORAGE_KEY = 'batalha_da_logica_best_score';
const QUESTIONS_PER_MATCH = 10;
const POINTS_PER_CORRECT = 10;

function loadBestScore(): number | null {
  try {
    const raw = window.localStorage.getItem(BEST_SCORE_STORAGE_KEY);
    if (raw === null) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function saveBestScore(value: number) {
  try {
    window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(value));
  } catch {
    // Ignora caso localStorage esteja indisponível
  }
}

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('TITLE');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [history, setHistory] = useState<AnswerRecord[]>([]);
  const [muted, setMuted] = useState(false);
  const [bestScore, setBestScore] = useState<number | null>(() => loadBestScore());

  const startNewMatch = useCallback(() => {
    playClickSound(muted);
    const matchQuestions = selectMatchQuestions(QUESTIONS_PER_MATCH);
    setQuestions(matchQuestions);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setHistory([]);
    setPhase('PLAYING');
  }, [muted]);

  const handleSelectAnswer = useCallback(
    (optionIndex: number) => {
      // Impede responder duas vezes a mesma pergunta
      if (history[currentIndex]) return;
      const currentQuestion = questions[currentIndex];
      if (!currentQuestion) return;

      const isCorrect = optionIndex === currentQuestion.correctIndex;
      const newRecord: AnswerRecord = {
        question: currentQuestion,
        selectedIndex: optionIndex,
        isCorrect,
      };

      setHistory((prev) => [...prev, newRecord]);

      if (isCorrect) {
        playCorrectSound(muted);
        setScore((prev) => prev + POINTS_PER_CORRECT);
        setStreak((prev) => {
          const next = prev + 1;
          setMaxStreak((best) => Math.max(best, next));
          return next;
        });
      } else {
        playWrongSound(muted);
        setStreak(0);
      }
    },
    [currentIndex, history, muted, questions]
  );

  const handleNextQuestion = useCallback(() => {
    playClickSound(muted);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      playVictorySound(muted);
      setPhase('RESULT');
    }
  }, [currentIndex, muted, questions.length]);

  useEffect(() => {
    if (phase === 'RESULT') {
      setBestScore((prevBest) => {
        const nextBest = prevBest === null ? score : Math.max(prevBest, score);
        saveBestScore(nextBest);
        return nextBest;
      });
    }
  }, [phase, score]);

  const handleToggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const handleBackToMenu = useCallback(() => {
    playClickSound(muted);
    setPhase('TITLE');
  }, [muted]);

  return (
    <div className="min-h-screen arcade-grid-bg text-slate-100">
      {phase === 'TITLE' && (
        <TitleScreen
          bestScore={bestScore}
          muted={muted}
          onToggleMute={handleToggleMute}
          onStart={startNewMatch}
        />
      )}

      {phase === 'PLAYING' && (
        <GameScreen
          questions={questions}
          currentIndex={currentIndex}
          score={score}
          streak={streak}
          history={history}
          muted={muted}
          onToggleMute={handleToggleMute}
          onSelectAnswer={handleSelectAnswer}
          onNextQuestion={handleNextQuestion}
          onExitGame={handleBackToMenu}
        />
      )}

      {phase === 'RESULT' && (
        <ResultScreen
          score={score}
          maxScore={QUESTIONS_PER_MATCH * POINTS_PER_CORRECT}
          bestScore={bestScore ?? score}
          maxStreak={maxStreak}
          history={history}
          onPlayAgain={startNewMatch}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}
