"use client";

export const playMagicalChime = () => {
  try {
    const WebAudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!WebAudioContext) return;
    const ctx = new WebAudioContext();
    const now = ctx.currentTime;

    // 1. The "Magic Sweep" (Arpeggio going up)
    const sweepOsc = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    
    sweepOsc.type = "sine";
    // Start at a mid-high frequency and rapidly sweep up
    sweepOsc.frequency.setValueAtTime(400, now);
    sweepOsc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
    
    sweepGain.gain.setValueAtTime(0, now);
    sweepGain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    sweepGain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
    
    sweepOsc.connect(sweepGain);
    sweepGain.connect(ctx.destination);
    
    sweepOsc.start(now);
    sweepOsc.stop(now + 0.6);

    // 2. The "Sparkle" (High-pitched twinkling notes)
    const notes = [800, 1000, 1200, 1600]; // Magic pentatonic-ish intervals
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + (i * 0.05));
      
      gain.gain.setValueAtTime(0, now + (i * 0.05));
      gain.gain.linearRampToValueAtTime(0.1, now + (i * 0.05) + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + (i * 0.05) + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + (i * 0.05));
      osc.stop(now + (i * 0.05) + 0.4);
    });

    // 3. The "Woosh" (Low frequency wind/impact sound)
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    
    bassOsc.type = "triangle";
    bassOsc.frequency.setValueAtTime(150, now);
    bassOsc.frequency.exponentialRampToValueAtTime(40, now + 0.4);
    
    bassGain.gain.setValueAtTime(0, now);
    bassGain.gain.linearRampToValueAtTime(0.3, now + 0.1);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
    
    bassOsc.connect(bassGain);
    bassGain.connect(ctx.destination);
    
    bassOsc.start(now);
    bassOsc.stop(now + 0.8);

  } catch (e) {
    console.error("Audio playback failed", e);
  }
};
