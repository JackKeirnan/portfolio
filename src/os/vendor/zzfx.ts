/*! ZzFX v1.3.0 sample generator, MIT, (c) 2019 Frank Force (github.com/KilledByAPixel/ZzFX); licence in public/licenses/zzfx.txt.
    Ported to TypeScript; playback lives in ../sound.ts so importing never creates an AudioContext. */

/** Output sample rate, matching ZzFX's default. */
export const ZZFX_SAMPLE_RATE = 44100;
const ZZFX_VOLUME = 0.3;

/** ZzFX parameter list in ZzFX's own order; names and defaults are in zzfxGenerate's first statement. */
export type ZzfxParams = readonly (number | undefined)[];

/** Generates one sound's samples from ZzFX parameters (ZzFX's zzfxG, unchanged in behaviour). */
export function zzfxGenerate(...params: ZzfxParams): number[] {
  // Read parameters with ZzFX's defaults; undefined slots fall back like ZzFX's sparse arrays.
  let [
    volume = 1, randomness = 0.05, frequency = 220, attack = 0, sustain = 0,
    release = 0.1, shape = 0, shapeCurve = 1, slide = 0, deltaSlide = 0,
    pitchJump = 0, pitchJumpTime = 0, repeatTime = 0, noise = 0, modulation = 0,
    bitCrush = 0, delay = 0, sustainVolume = 1, decay = 0, tremolo = 0, filter = 0,
  ] = params;

  // Init state, as in ZzFX.
  const PI2 = Math.PI * 2;
  const sign = (v: number) => (v < 0 ? -1 : 1);
  let startSlide = (slide *= (500 * PI2) / ZZFX_SAMPLE_RATE / ZZFX_SAMPLE_RATE);
  let startFrequency = (frequency *= ((1 + randomness * 2 * Math.random() - randomness) * PI2) / ZZFX_SAMPLE_RATE);
  const b: number[] = [];
  let t = 0, tm = 0, i = 0, j = 1, r = 0, c = 0, s = 0, f = 0;

  // Biquad low/high-pass filter coefficients.
  const quality = 2, w = (PI2 * Math.abs(filter) * 2) / ZZFX_SAMPLE_RATE;
  const cos = Math.cos(w), alpha = Math.sin(w) / 2 / quality;
  const a0 = 1 + alpha, a1 = (-2 * cos) / a0, a2 = (1 - alpha) / a0;
  const b0 = (1 + sign(filter) * cos) / 2 / a0, b1 = -(sign(filter) + cos) / a0, b2 = b0;
  let x2 = 0, x1 = 0, y2 = 0, y1 = 0;

  // Scale times to samples.
  attack = attack * ZZFX_SAMPLE_RATE + 9;
  decay *= ZZFX_SAMPLE_RATE;
  sustain *= ZZFX_SAMPLE_RATE;
  release *= ZZFX_SAMPLE_RATE;
  delay *= ZZFX_SAMPLE_RATE;
  deltaSlide *= (500 * PI2) / ZZFX_SAMPLE_RATE ** 3;
  modulation *= PI2 / ZZFX_SAMPLE_RATE;
  pitchJump *= PI2 / ZZFX_SAMPLE_RATE;
  pitchJumpTime *= ZZFX_SAMPLE_RATE;
  repeatTime = (repeatTime * ZZFX_SAMPLE_RATE) | 0;
  volume *= ZZFX_VOLUME;

  // Generate the waveform sample by sample.
  const length = (attack + decay + sustain + release + delay) | 0;
  for (; i < length; b[i++] = s * volume) {
    if (!(++c % ((bitCrush * 100) | 0))) {
      // Wave shape: 0 sine, 1 triangle, 2 saw, 3 tan, 4 noise.
      s = shape
        ? shape > 1
          ? shape > 2
            ? shape > 3
              ? Math.sin(t * t)
              : Math.max(Math.min(Math.tan(t), 1), -1)
            : 1 - (((2 * t) / PI2) % 2 + 2) % 2
          : 1 - 4 * Math.abs(Math.round(t / PI2) - t / PI2)
        : Math.sin(t);

      // Envelope: attack, decay, sustain, release, with optional tremolo.
      s =
        (repeatTime ? 1 - tremolo + tremolo * Math.sin((PI2 * i) / repeatTime) : 1) *
        sign(s) * Math.abs(s) ** shapeCurve *
        (i < attack
          ? i / attack
          : i < attack + decay
            ? 1 - ((i - attack) / decay) * (1 - sustainVolume)
            : i < attack + decay + sustain
              ? sustainVolume
              : i < length - delay
                ? ((length - i - delay) / release) * sustainVolume
                : 0);

      // Echo delay.
      s = delay
        ? s / 2 + (delay > i ? 0 : ((i < length - delay ? 1 : (length - i) / delay) * b[(i - delay) | 0]) / 2 / volume)
        : s;

      // Filter.
      if (filter) s = y1 = b2 * x2 + b1 * (x2 = x1) + b0 * (x1 = s) - a2 * y2 - a1 * (y2 = y1);
    }

    // Advance frequency with slide and modulation, plus noise.
    f = (frequency += slide += deltaSlide) * Math.cos(modulation * tm++);
    t += f + f * noise * Math.sin(i ** 5);

    // One-off pitch jump.
    if (j && ++j > pitchJumpTime) {
      frequency += pitchJump;
      startFrequency += pitchJump;
      j = 0;
    }

    // Repeat: reset pitch and slide.
    if (repeatTime && !(++r % repeatTime)) {
      frequency = startFrequency;
      slide = startSlide;
      j = j || 1;
    }
  }

  return b;
}
