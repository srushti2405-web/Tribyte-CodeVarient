// Web Audio API Procedural Eerie Halloween Soundscape
// Generates eerie wind breeze, distant night crickets, and harmonic whispers

let audioCtx = null;
let windNode = null;
let gainNode = null;
let isPlaying = false;

export function toggleHalloweenAudio(forceState) {
  if (typeof window === "undefined") return false;

  const shouldPlay = forceState !== undefined ? forceState : !isPlaying;

  if (shouldPlay) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      // Procedural pink noise wind synthesizer
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Bandpass filter to simulate eerie night wind whistling through gnarled trees
      const bandpass = audioCtx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.value = 380;
      bandpass.Q.value = 3.2;

      // LFO to modulate wind gusts
      const lfo = audioCtx.createOscillator();
      lfo.frequency.value = 0.18; // Slow breeze oscillation
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = 220;
      lfo.connect(lfoGain);
      lfoGain.connect(bandpass.frequency);
      lfo.start();

      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 2.5);

      whiteNoise.connect(bandpass);
      bandpass.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      whiteNoise.start();

      windNode = whiteNoise;
      isPlaying = true;
      return true;
    } catch {
      isPlaying = false;
      return false;
    }
  } else {
    if (gainNode && audioCtx) {
      try {
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        setTimeout(() => {
          windNode?.stop();
          windNode?.disconnect();
          windNode = null;
        }, 1300);
      } catch {
        // Fallback
      }
    }
    isPlaying = false;
    return false;
  }
}

export function isAudioActive() {
  return isPlaying;
}
