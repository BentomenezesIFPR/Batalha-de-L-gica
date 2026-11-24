import { useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  LogOut,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Question } from '../data/questions';
import { CodeBlock } from './CodeBlock';

export interface AnswerRecord {
  question: Question;
  selectedIndex: number;
  isCorrect: boolean;
}

interface GameScreenProps {
  questions: Question[];
  currentIndex: number;
  score: number;
  streak: number;
  history: AnswerRecord[];
  muted: boolean;
  onToggleMute: () => void;
  onSelectAnswer: (optionIndex: number) => void;
  onNextQuestion: () => void;
  onExitGame: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

const OPTION_STYLES = [
  {
    idle: 'border-sky-500/45 bg-[#0E1730] hover:border-sky-400 hover:bg-sky-500/15 hover:shadow-[0_0_22px_rgba(56,189,248,0.28)]',
    badge: 'bg-sky-500 text-slate-950',
  },
  {
    idle: 'border-purple-500/45 bg-[#151130] hover:border-purple-400 hover:bg-purple-500/15 hover:shadow-[0_0_22px_rgba(168,85,247,0.28)]',
    badge: 'bg-purple-400 text-slate-950',
  },
  {
    idle: 'border-emerald-500/45 bg-[#0C1D24] hover:border-emerald-400 hover:bg-emerald-500/15 hover:shadow-[0_0_22px_rgba(16,185,129,0.28)]',
    badge: 'bg-emerald-400 text-slate-950',
  },
  {
    idle: 'border-indigo-400/45 bg-[#111532] hover:border-indigo-300 hover:bg-indigo-500/15 hover:shadow-[0_0_22px_rgba(129,140,248,0.28)]',
    badge: 'bg-indigo-400 text-slate-950',
  },
];

export function GameScreen({
  questions,
  currentIndex,
  score,
  streak,
  history,
  muted,
  onToggleMute,
  onSelectAnswer,
  onNextQuestion,
  onExitGame,
}: GameScreenProps) {
  const question = questions[currentIndex];
  const currentRecord = history[currentIndex];
  const isAnswered = Boolean(currentRecord);
  const isLastQuestion = currentIndex === questions.length - 1;

  const [scorePopKey, setScorePopKey] = useState(0);

  useEffect(() => {
    if (currentRecord?.isCorrect) {
      setScorePopKey((k) => k + 1);
    }
  }, [currentRecord]);

  // Suporte a atalhos de teclado: 1-4 / A-D para responder e Enter para avançar
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) return;
      const key = event.key.toLowerCase();

      if (!isAnswered) {
        const keyMap: Record<string, number> = {
          '1': 0,
          a: 0,
          '2': 1,
          b: 1,
          '3': 2,
          c: 2,
          '4': 3,
          d: 3,
        };
        if (key in keyMap) {
          event.preventDefault();
          onSelectAnswer(keyMap[key]);
        }
      } else if (key === 'enter' || key === ' ') {
        event.preventDefault();
        onNextQuestion();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, onSelectAnswer, onNextQuestion]);

  if (!question) return null;

  return (
    <div className="min-h-screen flex flex-col px-4 py-4 sm:px-8 sm:py-6 max-w-4xl mx-auto">
      {/* Compact Arcade HUD */}
      <header className="flex items-center justify-between gap-3 pb-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onExitGame}
            title="Voltar à tela inicial"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0D1326] border border-slate-700/70 text-slate-300 hover:text-white hover:border-slate-500 transition-colors text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sair</span>
          </button>
          <span className="font-display text-base sm:text-lg font-bold text-white truncate">
            Batalha da Lógica
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <div className="text-right">
            <div className="text-[11px] text-slate-400 leading-none mb-1">
              Pergunta
            </div>
            <div className="font-mono text-sm sm:text-base font-bold text-sky-300 tabular-nums">
              {String(currentIndex + 1).padStart(2, '0')} / {questions.length}
            </div>
          </div>

          <div className="relative text-right">
            <div className="text-[11px] text-slate-400 leading-none mb-1">
              Pontuação
            </div>
            <div className="font-mono text-sm sm:text-base font-bold text-emerald-400 tabular-nums">
              {score} pts
            </div>
            {scorePopKey > 0 && currentRecord?.isCorrect && (
              <span
                key={scorePopKey}
                aria-hidden="true"
                className="animate-float-score absolute -top-2 right-0 font-mono text-xs font-bold text-emerald-300 pointer-events-none"
              >
                +10
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Ativar som' : 'Silenciar som'}
            className="p-2 rounded-lg bg-[#0D1326] border border-slate-700/70 text-slate-300 hover:text-white hover:border-sky-400/50 transition-colors cursor-pointer shrink-0"
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-sky-400" />
            )}
          </button>
        </div>
      </header>

      {/* 10-Step Arcade Progress Bar */}
      <div
        aria-label={`Progresso: pergunta ${currentIndex + 1} de ${questions.length}`}
        className="grid grid-cols-10 gap-1.5 mb-6"
      >
        {questions.map((q, idx) => {
          const rec = history[idx];
          let barClass = 'bg-slate-800/90 border-slate-700/60';
          if (rec) {
            barClass = rec.isCorrect
              ? 'bg-emerald-400 border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
              : 'bg-rose-500 border-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.4)]';
          } else if (idx === currentIndex) {
            barClass = 'bg-sky-400 border-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]';
          }

          return (
            <div
              key={q.id}
              className={`h-2 rounded-sm border transition-colors duration-200 ${barClass}`}
            />
          );
        })}
      </div>

      {/* Active Question Container */}
      <main className="flex-1 flex flex-col justify-center pb-6">
        <AnimatePresence mode="wait">
          <motion.section
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl bg-[#0B1022]/95 border border-sky-500/25 p-5 sm:p-8 shadow-[0_0_40px_-18px_rgba(56,189,248,0.3)]"
          >
            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-400 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-purple-300">
                  {question.topicLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  Questão {currentIndex + 1} de {questions.length}
                </span>
              </div>
              {streak > 1 && (
                <span className="font-mono text-xs text-emerald-300 tabular-nums">
                  Sequência: {streak} acertos
                </span>
              )}
            </div>

            {/* Question Prompt */}
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug mb-5 text-balance">
              {question.prompt}
            </h2>

            {/* Optional Code Snippet */}
            {question.code && (
              <div className="mb-6">
                <CodeBlock code={question.code} />
              </div>
            )}

            {/* Answer Buttons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {question.options.map((optionText, idx) => {
                const isSelected = currentRecord?.selectedIndex === idx;
                const isRightOption = idx === question.correctIndex;
                const styleTheme = OPTION_STYLES[idx];

                let containerClasses = styleTheme.idle;
                let badgeClasses = styleTheme.badge;
                let animationClass = '';

                if (isAnswered) {
                  if (isRightOption) {
                    containerClasses =
                      'border-emerald-400 bg-emerald-500/20 shadow-[0_0_24px_rgba(16,185,129,0.35)]';
                    badgeClasses = 'bg-emerald-400 text-slate-950';
                    if (isSelected) {
                      animationClass = 'animate-arcade-pop';
                    }
                  } else if (isSelected && !isRightOption) {
                    containerClasses =
                      'border-rose-500 bg-rose-500/20 shadow-[0_0_24px_rgba(244,63,94,0.35)]';
                    badgeClasses = 'bg-rose-500 text-white';
                    animationClass = 'animate-arcade-shake';
                  } else {
                    containerClasses =
                      'border-slate-800 bg-[#080C1B] opacity-45';
                    badgeClasses = 'bg-slate-700 text-slate-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => onSelectAnswer(idx)}
                    className={`group relative flex items-center gap-3.5 w-full min-h-[68px] p-4 rounded-xl border-2 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${
                      isAnswered ? 'cursor-default' : 'cursor-pointer active:translate-y-0.5'
                    } ${containerClasses} ${animationClass}`}
                  >
                    <span
                      className={`w-9 h-9 rounded-lg font-mono text-sm font-bold flex items-center justify-center shrink-0 transition-colors ${badgeClasses}`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>

                    <span className="flex-1 font-sans text-sm sm:text-base font-semibold text-slate-100 leading-snug break-words">
                      {optionText}
                    </span>

                    {isAnswered && isRightOption && (
                      <CheckCircle2
                        aria-label="Alternativa correta"
                        className="w-5 h-5 text-emerald-400 shrink-0"
                      />
                    )}
                    {isAnswered && isSelected && !isRightOption && (
                      <XCircle
                        aria-label="Alternativa incorreta"
                        className="w-5 h-5 text-rose-400 shrink-0"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Animated Feedback & Educational Explanation */}
            <AnimatePresence>
              {isAnswered && currentRecord && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className={`mt-6 rounded-xl border p-4 sm:p-5 ${
                    currentRecord.isCorrect
                      ? 'bg-emerald-950/35 border-emerald-400/50'
                      : 'bg-rose-950/35 border-rose-500/50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 font-display text-base sm:text-lg font-bold">
                        {currentRecord.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            <span className="text-emerald-300">
                              Resposta Correta! +10 pontos
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                            <span className="text-rose-300">
                              Resposta Incorreta · 0 pontos
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        {question.explanation}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={onNextQuestion}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 active:translate-y-0.5 text-slate-950 font-display text-sm sm:text-base font-extrabold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <span>{isLastQuestion ? 'Ver Resultado' : 'Próxima Pergunta'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </AnimatePresence>
      </main>
    </div>
  );
}
