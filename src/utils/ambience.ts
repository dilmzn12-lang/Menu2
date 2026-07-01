// Client-side Web Audio API synthesizer for a soft coffee shop ambience.
// Creates a warm, looping, soothing background chatter/ventilation hum,
// occasional steaming espresso wands, and soft mug clinks.

class CoffeeShopAmbience {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private humNode: AudioBufferSourceNode | null = null;
  private hissInterval: number | null = null;
  private clinkInterval: number | null = null;
  private isPlaying: boolean = false;

  constructor() {}

  public start() {
    if (this.isPlaying) return;

    try {
      // Create audio context
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      this.ctx = new AudioCtxClass();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(e => console.warn('Failed to resume audio context:', e));
      }
      this.masterGain = this.ctx.createGain();
      // Keep it soft by default so it stays in the background
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // 1. Generate Warm Muffled Ambient Hum (Brownian Noise)
      const bufferSize = 4 * this.ctx.sampleRate; // 4 seconds of noise
      const humBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = humBuffer.getChannelData(0);
      let lastOut = 0.0;

      // Brown noise formula
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Compensate for loss of level
      }

      this.humNode = this.ctx.createBufferSource();
      this.humNode.buffer = humBuffer;
      this.humNode.loop = true;

      // Filter to keep it warm, deep and muffled
      const humFilter = this.ctx.createBiquadFilter();
      humFilter.type = 'lowpass';
      humFilter.frequency.setValueAtTime(450, this.ctx.currentTime); // Cut high irritating noise

      const extraWarmth = this.ctx.createBiquadFilter();
      extraWarmth.type = 'peaking';
      extraWarmth.frequency.setValueAtTime(100, this.ctx.currentTime);
      extraWarmth.Q.setValueAtTime(1.0, this.ctx.currentTime);
      extraWarmth.gain.setValueAtTime(4, this.ctx.currentTime); // boost warm bass

      this.humNode.connect(humFilter);
      humFilter.connect(extraWarmth);
      extraWarmth.connect(this.masterGain);

      this.humNode.start(0);

      // 2. Schedule Periodic Espresso Machine Steam Hisses
      this.scheduleEspressoSteam();
      this.hissInterval = window.setInterval(() => this.scheduleEspressoSteam(), 14000);

      // 3. Schedule Periodic Soft Mug/Cup Clinks
      this.scheduleCupClink();
      this.clinkInterval = window.setInterval(() => {
        if (Math.random() > 0.4) {
          this.scheduleCupClink();
        }
      }, 4500);

      this.isPlaying = true;
    } catch (err) {
      console.warn('Failed to start coffee shop ambience:', err);
    }
  }

  private scheduleEspressoSteam() {
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 3.5 + Math.random() * 2.5;

      // Generate soft noise for steam
      const bufferSize = this.ctx.sampleRate * duration;
      const steamBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = steamBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const steamSource = this.ctx.createBufferSource();
      steamSource.buffer = steamBuffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1200, now);
      // Sweep frequency to simulate venting pressure
      bandpass.frequency.exponentialRampToValueAtTime(800, now + duration);
      bandpass.Q.setValueAtTime(1.5, now);

      const steamGain = this.ctx.createGain();
      steamGain.gain.setValueAtTime(0, now);
      steamGain.gain.linearRampToValueAtTime(0.06, now + 0.8); // soft entry
      steamGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      steamSource.connect(bandpass);
      bandpass.connect(steamGain);
      steamGain.connect(this.masterGain);

      steamSource.start(now);
      steamSource.stop(now + duration);
    } catch (e) {}
  }

  private scheduleCupClink() {
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const clinkGain = this.ctx.createGain();

      const baseFreq = 1800 + Math.random() * 1200; // bell-like frequency
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 1.51, now); // metallic inharmonic ratio

      clinkGain.gain.setValueAtTime(0, now);
      // extremely fast attack, nice ring out
      clinkGain.gain.linearRampToValueAtTime(0.025, now + 0.005);
      clinkGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      // High pass filter to keep it thin and shiny
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1500, now);

      // Stereo panning
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      if (panner) {
        panner.pan.setValueAtTime(Math.random() * 1.4 - 0.7, now);
        osc1.connect(clinkGain);
        osc2.connect(clinkGain);
        clinkGain.connect(filter);
        filter.connect(panner);
        panner.connect(this.masterGain);
      } else {
        osc1.connect(clinkGain);
        osc2.connect(clinkGain);
        clinkGain.connect(filter);
        filter.connect(this.masterGain);
      }

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
    } catch (e) {}
  }

  public stop() {
    if (!this.isPlaying) return;

    if (this.hissInterval) {
      clearInterval(this.hissInterval);
      this.hissInterval = null;
    }
    if (this.clinkInterval) {
      clearInterval(this.clinkInterval);
      this.clinkInterval = null;
    }

    if (this.humNode) {
      try {
        this.humNode.stop();
      } catch (e) {}
      this.humNode = null;
    }

    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }

    this.isPlaying = false;
  }

  public getActive() {
    return this.isPlaying;
  }
}

export const shopAmbience = new CoffeeShopAmbience();
