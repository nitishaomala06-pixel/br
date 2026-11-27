// Pure Web Audio API Indian classical ambient synthesizer (Raga Yaman sitar + tanpura)
// plus optional HTMLAudioElement playback when a custom audio URL/file is configured.

const YAMAN_FREQUENCIES = [
  261.63, // Sa (C4)
  293.66, // Re (D4)
  329.63, // Ga (E4)
  369.99, // Ma# (F#4 - Tivra Madhyam characteristic of Raga Yaman)
  392.0,  // Pa (G4)
  440.0,  // Dha (A4)
  493.88, // Ni (B4)
  523.25, // Sa' (C5)
];

const YAMAN_PHRASES: number[][] = [
  [6, 1, 2, 3, 4],       // Ni Re Ga Ma# Pa
  [4, 3, 2, 1, 0],       // Pa Ma# Ga Re Sa
  [2, 3, 5, 6, 7],       // Ga Ma# Dha Ni Sa'
  [7, 6, 5, 4, 3, 2, 1, 0], // Descending resolve
];

class WeddingMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private noteTimer: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private isPlayingState = false;
  private currentMode: 'classical-sitar' | 'custom' = 'classical-sitar';
  private customUrl = '';
  private phraseIndex = 0;
  private stepIndex = 0;

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  public configure(mode: 'classical-sitar' | 'custom', customAudioUrl: string): void {
    const modeChanged = this.currentMode !== mode || this.customUrl !== customAudioUrl;
    this.currentMode = mode;
    this.customUrl = customAudioUrl;
    if (modeChanged && this.isPlayingState) {
      this.stop();
      void this.play();
    }
  }

  public async play(): Promise<void> {
    if (this.isPlayingState) return;

    if (this.currentMode === 'custom' && this.customUrl.trim()) {
      try {
        if (!this.customAudio || this.customAudio.src !== this.customUrl) {
          this.customAudio = new Audio(this.customUrl);
          this.customAudio.loop = true;
          this.customAudio.volume = 0.45;
        }
        await this.customAudio.play();
        this.isPlayingState = true;
        return;
      } catch {
        // Fallback smoothly to Web Audio sitar ambiance if custom URL fails
      }
    }

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.32, this.ctx.currentTime + 1.4);
    this.masterGain.connect(this.ctx.destination);

    // Subtle Tanpura Sa-Pa warm drone
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.value = 0.14;
    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 420;
    this.droneGain.connect(droneFilter);
    droneFilter.connect(this.masterGain);

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'triangle';
    this.droneOsc1.frequency.value = 130.81; // Low Sa (C3)
    this.droneOsc1.connect(this.droneGain);
    this.droneOsc1.start();

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.value = 196.0; // Low Pa (G3)
    this.droneOsc2.connect(this.droneGain);
    this.droneOsc2.start();

    this.isPlayingState = true;
    this.scheduleNextPluck();
  }

  private scheduleNextPluck(): void {
    if (!this.isPlayingState || !this.ctx || !this.masterGain) return;

    const phrase = YAMAN_PHRASES[this.phraseIndex % YAMAN_PHRASES.length];
    const freq = YAMAN_FREQUENCIES[phrase[this.stepIndex % phrase.length]];

    this.pluckSitarNote(freq);

    this.stepIndex += 1;
    let delayMs = 780;
    if (this.stepIndex >= phrase.length) {
      this.stepIndex = 0;
      this.phraseIndex += 1;
      delayMs = 1550; // Gentle breath between raga phrases
    }

    this.noteTimer = window.setTimeout(() => {
      this.scheduleNextPluck();
    }, delayMs);
  }

  private pluckSitarNote(freq: number): void {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const env = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle sitar jawari overtone shimmer
    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 2.4, now);
    filter.Q.value = 1.6;

    env.gain.setValueAtTime(0.001, now);
    env.gain.linearRampToValueAtTime(0.24, now + 0.035);
    env.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

    const harmonicGain = this.ctx.createGain();
    harmonicGain.gain.value = 0.28;

    osc.connect(filter);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + 2.5);
    harmonic.stop(now + 2.5);
  }

  public stop(): void {
    this.isPlayingState = false;
    if (this.noteTimer !== null) {
      clearTimeout(this.noteTimer);
      this.noteTimer = null;
    }

    if (this.customAudio) {
      this.customAudio.pause();
    }

    try {
      this.droneOsc1?.stop();
      this.droneOsc2?.stop();
    } catch {
      // Ignore already stopped oscillators
    }
    this.droneOsc1 = null;
    this.droneOsc2 = null;

    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.disconnect();
      } catch {
        // Ignore disconnect errors
      }
      this.masterGain = null;
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlayingState) {
      this.stop();
      return false;
    }
    await this.play();
    return true;
  }
}

export const weddingMusicEngine = new WeddingMusicEngine();
