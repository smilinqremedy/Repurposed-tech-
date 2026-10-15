/**
 * REPURPOSED TECH — SYNTHETIC RETRO AUDIO ENGINE
 * Built using native Web Audio API (Zero external MP3 dependencies).
 * Generates authentic mechanical clicks, CRT de-gauss hums, chiptunes,
 * audiophile frequency sweeps, and ambient atelier tape warmth.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private sfxEnabled: boolean = true;
  private ambientSource: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientNoiseSource: AudioBufferSourceNode | null = null;
  private isAmbientActive: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("rt_sfx_enabled");
      if (saved !== null) {
        this.sfxEnabled = saved === "true";
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.sfxEnabled;
  }

  public setEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("rt_sfx_enabled", String(enabled));
    }
    if (!enabled && this.isAmbientActive) {
      this.stopAmbient();
    }
  }

  public toggleEnabled(): boolean {
    this.setEnabled(!this.sfxEnabled);
    return this.sfxEnabled;
  }

  /**
   * Tactile Mechanical Click
   * Simulates microswitches, brass buttons, and keyboard switches
   */
  public playClick(variant: "light" | "heavy" | "toggle" = "light") {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (variant === "heavy") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (variant === "toggle") {
      osc.type = "square";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.04);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else {
      // Light tactile click
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.025);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    }
  }

  /**
   * CRT Monitor De-Gauss & Static Bloom
   * Simulates cathode ray tube powering on and magnetic coil discharge
   */
  public playCrtDeGauss() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Sub-bass thump
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(85, now);
    subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.35);
    subGain.gain.setValueAtTime(0.3, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.35);

    // High coil whine (15.7 kHz TV flyback tone simulation at pleasant audible range)
    const flyback = ctx.createOscillator();
    const flyGain = ctx.createGain();
    flyback.type = "sine";
    flyback.frequency.setValueAtTime(3800, now);
    flyback.frequency.exponentialRampToValueAtTime(5200, now + 0.2);
    flyGain.gain.setValueAtTime(0.04, now);
    flyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    flyback.connect(flyGain);
    flyGain.connect(ctx.destination);
    flyback.start(now);
    flyback.stop(now + 0.25);
  }

  /**
   * CleanAmp Harmonic Chime
   * Plays a luxurious ascending 4-note retro arpeggio
   */
  public playCleanAmpChime() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    });
  }

  /**
   * Hardware Acoustic Benchmark Sample
   * Previews authentic sound signatures for specific machines
   */
  public playHardwareSample(type: "chiptune" | "wolfson" | "thock" | "shutter" | "cyberdeck" | "braun") {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    switch (type) {
      case "chiptune": {
        // Game Boy 8-bit pulse melody
        const melody = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
        melody.forEach((freq, idx) => {
          const t = now + idx * 0.08;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.075);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.075);
        });
        break;
      }
      case "wolfson": {
        // iPod Wolfson DAC warm acoustic chord
        const chord = [220, 277.18, 329.63, 440, 554.37];
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.08, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 1.2);
        });
        break;
      }
      case "thock": {
        // Mechanical keyboard 180Hz thock acoustic resonance
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.08);
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }
      case "shutter": {
        // Rangefinder dual leaf shutter action
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "square";
        osc1.frequency.setValueAtTime(900, now);
        osc1.frequency.exponentialRampToValueAtTime(180, now + 0.03);
        gain1.gain.setValueAtTime(0.2, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.03);

        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "square";
        osc2.frequency.setValueAtTime(750, now + 0.06);
        osc2.frequency.exponentialRampToValueAtTime(120, now + 0.09);
        gain2.gain.setValueAtTime(0.25, now + 0.06);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.06);
        osc2.stop(now + 0.09);
        break;
      }
      case "cyberdeck": {
        // Cyberdeck avionics terminal telemetry beep
        [750, 1500, 2250].forEach((freq, idx) => {
          const t = now + idx * 0.05;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.14, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.045);
        });
        break;
      }
      case "braun": {
        // Braun Dieter Rams 1982 pure sine test tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.9);
        break;
      }
    }
  }

  /**
   * Ambient Lagos Atelier Tape Deck
   * Continuous warm lo-fi tape saturation and subtle low frequency drone
   */
  public startAmbient(): boolean {
    if (!this.sfxEnabled) return false;
    const ctx = this.getContext();
    if (!ctx) return false;

    if (this.isAmbientActive) return true;

    try {
      const now = ctx.currentTime;

      // Soft ambient warm drone chord
      const droneOsc = ctx.createOscillator();
      const droneFilter = ctx.createBiquadFilter();
      const droneGain = ctx.createGain();

      droneOsc.type = "sawtooth";
      droneOsc.frequency.setValueAtTime(55, now); // A1 note
      droneFilter.type = "lowpass";
      droneFilter.frequency.setValueAtTime(220, now);

      droneGain.gain.setValueAtTime(0.001, now);
      droneGain.gain.linearRampToValueAtTime(0.04, now + 1.5);

      droneOsc.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(ctx.destination);

      droneOsc.start(now);
      this.ambientSource = droneOsc;
      this.ambientGain = droneGain;

      // Generate subtle analog tape noise
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filter approximation
        lastOut = (lastOut + 0.02 * white) / 1.02;
        output[i] = lastOut * 0.15;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.015, now + 1.5);

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(800, now);
      noiseFilter.Q.setValueAtTime(0.5, now);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      this.ambientNoiseSource = noise;

      this.isAmbientActive = true;
      return true;
    } catch (e) {
      console.warn("Ambient audio init failed", e);
      return false;
    }
  }

  public stopAmbient() {
    if (!this.isAmbientActive) return;
    const ctx = this.ctx;
    if (ctx && this.ambientGain) {
      try {
        const now = ctx.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        setTimeout(() => {
          this.ambientSource?.stop();
          this.ambientNoiseSource?.stop();
          this.ambientSource = null;
          this.ambientNoiseSource = null;
          this.ambientGain = null;
          this.isAmbientActive = false;
        }, 550);
      } catch (e) {
        this.isAmbientActive = false;
      }
    } else {
      this.isAmbientActive = false;
    }
  }

  public isAmbient(): boolean {
    return this.isAmbientActive;
  }

  public toggleAmbient(): boolean {
    if (this.isAmbientActive) {
      this.stopAmbient();
      return false;
    } else {
      return this.startAmbient();
    }
  }
}

export const soundEngine = new SoundEngine();
