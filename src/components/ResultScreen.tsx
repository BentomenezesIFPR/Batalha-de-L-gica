import { Award, Home, RotateCcw, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { AnswerRecord } from './GameScreen';

interface ResultScreenProps {
  score: number;
  maxScore: number;
  bestScore: number;
  maxStreak: number;
  history: AnswerRecord[];
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

function getPerformanceFeedback(score: number) {
  if (score >= 90) {
    return {
      title: 'Mestre da Lógica!',
      message:
        'Desempenho extraordinário! Você domina estruturas condicionais, laços de repetição, arrays e operadores lógicos.',
      accent: 'text-emerald-400',
      border: 'border-emerald-400/40',
    };
  }
  if (score >= 70) {
    return {
      title: 'Excelente Raciocínio!',
      message:
        'Muito bem! Seu pensamento computacional está afiado e falta pouco para atingir a pontuação máxima.',
      accent: 'text-sky-400',
      border: 'border-sky-400/40',
    };
  }
  if (score >= 50) {
    return {
      title: 'Bom Progresso!',
      message:
        'Você já compreende os fundamentos da programação. Observe os tópicos abaixo e jogue novamente para evoluir ainda mais.',
      accent: 'text-purple-400',
      border: 'border-purple-400/40',
    };
  }
  return {
    title: 'Continue Praticando!',
    message:
      'A lógica de programação melhora com prática constante. Leia cada explicação com atenção e tente uma nova partida!',
    accent: 'text-sky-300',
    border: 'border-sky-500/35',
  };
}

export function ResultScreen({
  score,
  maxScore,
  bestScore,
  maxStreak,
  history,
  onPlayAgain,
  onBackToMenu,
}: ResultScreenProps) {
  const correctCount = history.filter((item) => item.isCorrect).length;
  const totalCount = history.length;
  const feedback = getPerformanceFeedback(score);
  const isNewRecord = score > 0 && score >= bestScore;

  // Agrupa acertos por tópico na partida atual
  const topicStats = history.reduce<
    Record<string, { label: string; correct: number; total: number }>
  >((acc, item) => {
    const key = item.question.topic;
    if (!acc[key]) {
      acc[key] = { label: item.question.topicLabel, correct: 0, total: 0 };
    }
    acc[key].total += 1;
    if (item.isCorrect) acc[key].correct += 1;
    return acc;
  }, {});

  const topicEntries = Object.entries(topicStats);

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8 sm:px-8 max-w-3xl mx-auto">
      <motion.section
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`rounded-2xl bg-[#0B1022]/95 border ${feedback.border} p-6 sm:p-10 shadow-[0_0_50px_-15px_rgba(168,85,247,0.3)]`}
      >
        {/* Header & Score Highlight */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>Resultado Final da Partida</span>
              {isNewRecord && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-300 font-semibold">
                    Melhor marca igualada ou batida
                  </span>
                </>
              )}
            </div>
            <h1 className={`font-display text-3xl sm:text-4xl font-extrabold ${feedback.accent}`}>
              {feedback.title}
            </h1>
          </div>

          <div className="rounded-xl bg-[#070B18] border border-slate-800 px-5 py-4 text-left sm:text-right shrink-0">
            <div className="text-xs text-slate-400 mb-1">Pontuação total</div>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
              {score}
              <span className="text-base font-semibold text-slate-400">
                {' '}
                / {maxScore}
              </span>
            </div>
          </div>
        </div>

        <p className="text-slate-300 text-base leading-relaxed my-6">
          {feedback.message}
        </p>

        {/* Key Match Metrics */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="rounded-xl bg-[#070B18] border border-slate-800/90 p-4">
            <div className="text-xs text-slate-400 mb-1">Acertos</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">
              {correctCount}/{totalCount}
            </div>
          </div>
          <div className="rounded-xl bg-[#070B18] border border-slate-800/90 p-4">
            <div className="text-xs text-slate-400 mb-1">Maior sequência</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-sky-400 tabular-nums">
              {maxStreak}
            </div>
          </div>
          <div className="rounded-xl bg-[#070B18] border border-slate-800/90 p-4">
            <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Recorde</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-purple-300 tabular-nums">
              {bestScore} pts
            </div>
          </div>
        </div>

        {/* Topic Breakdown */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-slate-200 mb-3">
            Desempenho por assunto
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topicEntries.map(([key, stat]) => {
              const pct = Math.round((stat.correct / stat.total) * 100);
              return (
                <div
                  key={key}
                  className="rounded-xl bg-[#070B18] border border-slate-800/90 px-4 py-3"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                    <span className="font-medium text-slate-200">{stat.label}</span>
                    <span className="font-mono text-slate-400 tabular-nums">
                      {stat.correct}/{stat.total}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        pct === 100
                          ? 'bg-emerald-400'
                          : pct >= 50
                          ? 'bg-sky-400'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={onPlayAgain}
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 hover:brightness-110 active:translate-y-0.5 text-slate-950 font-display text-base sm:text-lg font-extrabold shadow-[0_0_26px_rgba(16,185,129,0.35)] transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Jogar Novamente</span>
          </button>

          <button
            type="button"
            onClick={onBackToMenu}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#070B18] border border-slate-700 hover:border-slate-500 text-slate-200 font-display text-base font-bold transition-colors cursor-pointer whitespace-nowrap"
          >
            <Home className="w-4 h-4" />
            <span>Tela Inicial</span>
          </button>
        </div>
      </motion.section>
    </div>
  );
}
