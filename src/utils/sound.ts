let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Ctx) {
      audioCtx = new Ctx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType,
  gainPeak: number,
  delay = 0
) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainPeak, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  } catch {
    // Ignora caso áudio esteja bloqueado pelo navegador
  }
}

export function playClickSound(muted: boolean) {
  if (muted) return;
  playTone(540, 0.06, 'triangle', 0.06);
}

export function playCorrectSound(muted: boolean) {
  if (muted) return;
  playTone(523.25, 0.12, 'triangle', 0.1, 0); // C5
  playTone(659.25, 0.12, 'triangle', 0.1, 0.07); // E5
  playTone(783.99, 0.22, 'triangle', 0.11, 0.14); // G5
}

export function playWrongSound(muted: boolean) {
  if (muted) return;
  playTone(210, 0.14, 'sawtooth', 0.06, 0);
  playTone(165, 0.22, 'sawtooth', 0.06, 0.11);
}

export function playVictorySound(muted: boolean) {
  if (muted) return;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, idx) => {
    playTone(freq, 0.18, 'triangle', 0.1, idx * 0.09);
  });
}
