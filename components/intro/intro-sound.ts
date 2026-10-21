/**
 * Original cinematic intro sound, synthesised live with the Web Audio API.
 * No audio files are shipped, so there is nothing to license: a filtered-noise
 * riser builds into a sub-bass impact and an opening major-chord swell.
 *
 * Must be started from a user gesture (click / key press) so browsers allow audio.
 */

const MASTER_LEVEL = 0.75;

type AudioContextCtor = typeof AudioContext;

function getAudioContextCtor(): AudioContextCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { webkitAudioContext?: AudioContextCtor };
  return window.AudioContext ?? w.webkitAudioContext ?? null;
}

function noiseBuffer(ctx: AudioContext, seconds: number) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

export class IntroSound {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private muted: boolean;
  private stopping = false;

  constructor(muted: boolean) {
    this.muted = muted;
  }

  /** Starts playback. `impactAt` is when (in seconds) the hit lands, to sync with the visuals. */
  play(impactAt = 1.05) {
    const Ctor = getAudioContextCtor();
    if (!Ctor) return;

    try {
      const ctx = new Ctor();
      this.ctx = ctx;
      void ctx.resume();

      const master = ctx.createGain();
      master.gain.value = this.muted ? 0 : MASTER_LEVEL;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.ratio.value = 4;
      master.connect(comp).connect(ctx.destination);
      this.master = master;

      const t0 = ctx.currentTime + 0.05;
      const hit = t0 + impactAt;
      const noise = noiseBuffer(ctx, 2.5);

      // 1. Riser: band-passed noise sweeping upwards into the hit.
      const riser = ctx.createBufferSource();
      riser.buffer = noise;
      const riserFilter = ctx.createBiquadFilter();
      riserFilter.type = "bandpass";
      riserFilter.Q.value = 6;
      riserFilter.frequency.setValueAtTime(250, t0);
      riserFilter.frequency.exponentialRampToValueAtTime(3200, hit);
      const riserGain = ctx.createGain();
      riserGain.gain.setValueAtTime(0.0001, t0);
      riserGain.gain.exponentialRampToValueAtTime(0.22, hit - 0.05);
      riserGain.gain.exponentialRampToValueAtTime(0.0001, hit + 0.12);
      riser.connect(riserFilter).connect(riserGain).connect(master);
      riser.start(t0);
      riser.stop(hit + 0.2);

      // 2. Sub-bass impact with a falling pitch.
      const sub = ctx.createOscillator();
      sub.type = "sine";
      sub.frequency.setValueAtTime(95, hit);
      sub.frequency.exponentialRampToValueAtTime(36, hit + 0.7);
      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.0001, hit);
      subGain.gain.exponentialRampToValueAtTime(0.95, hit + 0.015);
      subGain.gain.exponentialRampToValueAtTime(0.0001, hit + 2.4);
      sub.connect(subGain).connect(master);
      sub.start(hit);
      sub.stop(hit + 2.5);

      // 3. Body of the hit: a short low-passed noise burst.
      const thud = ctx.createBufferSource();
      thud.buffer = noise;
      const thudFilter = ctx.createBiquadFilter();
      thudFilter.type = "lowpass";
      thudFilter.frequency.setValueAtTime(1400, hit);
      thudFilter.frequency.exponentialRampToValueAtTime(180, hit + 0.45);
      const thudGain = ctx.createGain();
      thudGain.gain.setValueAtTime(0.55, hit);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, hit + 0.7);
      thud.connect(thudFilter).connect(thudGain).connect(master);
      thud.start(hit);
      thud.stop(hit + 0.8);

      // 4. Chord swell (A major, open voicing) through an opening low-pass filter.
      const padFilter = ctx.createBiquadFilter();
      padFilter.type = "lowpass";
      padFilter.Q.value = 0.8;
      padFilter.frequency.setValueAtTime(180, hit);
      padFilter.frequency.exponentialRampToValueAtTime(2600, hit + 1.5);
      padFilter.frequency.exponentialRampToValueAtTime(700, hit + 3.8);
      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.0001, hit);
      padGain.gain.exponentialRampToValueAtTime(0.2, hit + 0.9);
      padGain.gain.setValueAtTime(0.2, hit + 2.2);
      padGain.gain.exponentialRampToValueAtTime(0.0001, hit + 4.3);
      padFilter.connect(padGain).connect(master);

      for (const freq of [55, 82.41, 110, 138.59, 164.81, 220]) {
        for (const detune of [-7, 7]) {
          const osc = ctx.createOscillator();
          osc.type = "sawtooth";
          osc.frequency.value = freq;
          osc.detune.value = detune;
          osc.connect(padFilter);
          osc.start(hit);
          osc.stop(hit + 4.4);
        }
      }

      // 5. A soft high shimmer once the name has landed.
      const shimmerGain = ctx.createGain();
      shimmerGain.gain.setValueAtTime(0.0001, hit + 0.5);
      shimmerGain.gain.exponentialRampToValueAtTime(0.035, hit + 1.4);
      shimmerGain.gain.exponentialRampToValueAtTime(0.0001, hit + 3.6);
      shimmerGain.connect(master);
      for (const freq of [880, 1318.5]) {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        osc.connect(shimmerGain);
        osc.start(hit + 0.5);
        osc.stop(hit + 3.7);
      }
    } catch {
      // Audio is a nice-to-have. Never let it break the intro.
      this.dispose();
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (this.ctx && this.master && !this.stopping) {
      this.master.gain.setTargetAtTime(muted ? 0 : MASTER_LEVEL, this.ctx.currentTime, 0.04);
    }
  }

  /** Fades out quickly and releases the audio device. */
  stop(fadeSeconds = 0.3) {
    const { ctx, master } = this;
    if (!ctx || !master || this.stopping) return;
    this.stopping = true;
    try {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, fadeSeconds / 4);
    } catch {
      /* ignore */
    }
    window.setTimeout(() => this.dispose(), fadeSeconds * 1000 + 100);
  }

  private dispose() {
    const ctx = this.ctx;
    this.ctx = null;
    this.master = null;
    if (ctx && ctx.state !== "closed") void ctx.close().catch(() => {});
  }
}
