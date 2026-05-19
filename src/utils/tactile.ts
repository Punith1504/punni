"use client";

let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

// Helper to create a piano-like tone
const playPianoNote = (ctx: AudioContext, frequency: number, duration: number, maxGain: number) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Mix of sine (fundamental) and triangle (some harmonics) for a soft piano feel
  osc.type = "sine";
  
  const osc2 = ctx.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(frequency, ctx.currentTime);
  
  const mixGain = ctx.createGain();
  mixGain.gain.value = 0.2; // triangle wave is quieter

  osc.frequency.setValueAtTime(frequency, ctx.currentTime);

  // Envelope: Sharp attack, exponential decay
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(maxGain, ctx.currentTime + 0.015); // Fast attack
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration); // Slow decay

  osc.connect(gain);
  osc2.connect(mixGain);
  mixGain.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc2.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
  osc2.stop(ctx.currentTime + duration);
};

// Subtle piano note for click (e.g., C5 - 523.25Hz)
export const playClick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  // Play a soft C5 major chord for a pleasing click
  playPianoNote(ctx, 523.25, 1.0, 0.4); // C5
  playPianoNote(ctx, 659.25, 1.0, 0.3); // E5

  if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(15);
};

// Soft low-pitched piano note for hover (e.g., G4 - 392.00Hz)
export const playHover = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  playPianoNote(ctx, 392.00, 0.8, 0.2); // G4
};

// Very short, subtle piano note for scrolling (e.g., G5 - 783.99Hz)
export const playTick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  // Very short duration and low gain for scrolling so it's not overwhelming
  playPianoNote(ctx, 783.99, 0.15, 0.05); // G5
  
  if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(5);
};
