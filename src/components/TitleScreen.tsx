import { Play, Trophy, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

interface TitleScreenProps {
  bestScore: number | null;
  muted: boolean;
  onToggleMute: () => void;
  onStart: () => void;
}

const COVERED_TOPICS = [
  { name: 'if & else', desc: 'Decisões condicionais', accent: 'border-sky-500/35 text-sky-300' },
  { name: 'for & while', desc: 'Laços de repetição', accent: 'border-purple-500/35 text-purple-300' },
  { name: 'Arrays', desc: 'Listas e índices', accent: 'border-emerald-500/35 text-emerald-300' },
  { name: 'Variáveis', desc: 'Armazenamento de dados', accent: 'border-sky-500/35 text-sky-300' },
  { name: 'Operadores Lógicos', desc: '&&, || e negação !', accent: 'border-purple-500/35 text-purple-300' },
];

export function TitleScreen({
  bestScore,
  muted,
  onToggleMute,
  onStart,
}: TitleScreenProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-6 sm:px-8 sm:py-8 max-w-4xl mx-auto">
      {/* Top Bar */}
      <header className="flex items-center justify-between gap-4">
        <span className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
          Batalha da Lógica
        </span>
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? 'Ativar som' : 'Silenciar som'}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0D1326] border border-slate-700/70 text-slate-300 hover:text-white hover:border-sky-400/50 transition-colors text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
        >
          {muted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
          <span>{muted ? 'Som desligado' : 'Som ligado'}</span>
        </button>
      </header>

      {/* Main Hero */}
      <main className="my-auto py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl bg-[#0B1022]/95 border border-sky-500/30 shadow-[0_0_50px_-15px_rgba(56,189,248,0.3)] p-6 sm:p-10"
        >
          {/* Arcade Geometric Emblem */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
            <div
              aria-hidden="true"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#070B18] border border-purple-500/40 flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(168,85,247,0.28)]"
            >
              <svg viewBox="0 0 64 64" className="w-11 h-11" fill="none">
                <path
                  d="M32 6L54 17V34C54 46.5 44.5 55.5 32 59C19.5 55.5 10 46.5 10 34V17L32 6Z"
                  stroke="#38BDF8"
                  strokeWidth="3"
                />
                <path
                  d="M23 26L17 32L23 38"
                  stroke="#A855F7"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M41 26L47 32L41 38"
                  stroke="#10B981"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M34 22L30 42"
                  stroke="#38BDF8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-medium text-sky-300 mb-1.5">
                Desafio Educativo de Pensamento Computacional
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-balance">
                BATALHA DA{' '}
                <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  LÓGICA
                </span>
              </h1>
            </div>
          </div>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            Teste seus reflexos de programador respondendo desafios rápidos de lógica.
            Analise códigos reais, escolha a resposta certa e conquiste a pontuação máxima.
          </p>

          {/* Match Rules Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-800/90 py-5 mb-8">
            <div>
              <div className="text-xs text-slate-400 mb-1">Duração da partida</div>
              <div className="font-display text-xl font-bold text-white tabular-nums">
                10 perguntas
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Valor por acerto</div>
              <div className="font-display text-xl font-bold text-emerald-400 tabular-nums">
                +10 pontos
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 mb-1">Pontuação máxima</div>
              <div className="font-display text-xl font-bold text-sky-400 tabular-nums">
                100 pontos
              </div>
            </div>
          </div>

          {/* Covered Concepts */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-slate-200 mb-3">
              Conteúdos da partida
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {COVERED_TOPICS.map((topic) => (
                <div
                  key={topic.name}
                  className={`rounded-xl bg-[#070B18] border px-3 py-2.5 ${topic.accent}`}
                >
                  <div className="font-mono text-xs sm:text-sm font-bold truncate">
                    {topic.name}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {topic.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={onStart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-purple-500 to-emerald-500 hover:brightness-110 active:translate-y-0.5 text-slate-950 font-display text-lg font-extrabold tracking-wide shadow-[0_0_28px_rgba(56,189,248,0.45)] transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>Iniciar Partida</span>
            </button>

            {bestScore !== null && (
              <div className="flex items-center gap-2.5 text-sm text-slate-300 tabular-nums">
                <Trophy className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Melhor pontuação: <strong className="text-white">{bestScore} / 100</strong>
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      <footer className="text-center text-xs text-slate-500">
        Batalha da Lógica · Jogo educativo 100% no navegador
      </footer>
    </div>
  );
}
