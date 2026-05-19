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

// Ultra-pleasant ambient pad sound for scrolling
export const playTick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  // We will play a very soft major 7th chord (Cmaj7) shifted down a bit
  const baseFreq = 261.63; // C4
  const freqs = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 1.875]; // C E G B
  
  const masterGain = ctx.createGain();
  // Very slow attack, very long release for a smooth pad feel
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.1);
  masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  // Filter sweep
  filter.frequency.setValueAtTime(400, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.2);
  filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.8);
  filter.Q.value = 1;

  freqs.forEach(f => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    // Slight detune for each scroll event
    osc.frequency.setValueAtTime(f + (Math.random() * 4 - 2), ctx.currentTime);
    osc.connect(filter);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  });

  filter.connect(masterGain);
  masterGain.connect(ctx.destination);
  
  // Vibrate extremely softly
  if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(1);
};
