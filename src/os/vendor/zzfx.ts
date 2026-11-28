/*! ZzFX v1.3.0 sample generator, MIT, (c) 2019 Frank Force (github.com/KilledByAPixel/ZzFX); licence in public/licenses/zzfx.txt.
    Ported to TypeScript; playback lives in ../sound.ts so importing never creates an AudioContext. */

/** Output sample rate, matching ZzFX's default. */
export const ZZFX_SAMPLE_RATE = 44100;
const ZZFX_VOLUME = 0.3;

/** ZzFX parameter list in ZzFX's own order; names and defaults are in zzfxGenerate's first statement. */
export type ZzfxParams = readonly (number | undefined)[];

/** Generates one sound's samples from ZzFX parameters (ZzFX's zzfxG, unchanged in behaviour). */
export function zzfxGenerate(...params: ZzfxParams): number[] {
  // Read parameters with ZzFX'sample defaults; undefined slots fall back like ZzFX'sample sparse arrays.
  let [
    volume = 1, randomness = 0.05, frequency = 220, attack = 0, sustain = 0,
    release = 0.1, shape = 0, shapeCurve = 1, slide = 0, deltaSlide = 0,
    pitchJump = 0, pitchJumpTime = 0, repeatTime = 0, noise = 0, modulation = 0,
    bitCrush = 0, delay = 0, sustainVolume = 1, decay = 0, tremolo = 0, filter = 0,
  ] = params;

  // Init state, as in ZzFX.
  const PI2 = Math.PI * 2;
  const sign = (value: number) => (value < 0 ? -1 : 1);
  let startSlide = (slide *= (500 * PI2) / ZZFX_SAMPLE_RATE / ZZFX_SAMPLE_RATE);
  let startFrequency = (frequency *= ((1 + randomness * 2 * Math.random() - randomness) * PI2) / ZZFX_SAMPLE_RATE);
  const samples: number[] = [];
  let phase = 0, modulationStep = 0, i = 0, pitchJumpCounter = 1, repeatCounter = 0, crushCounter = 0, sample = 0, phaseStep = 0;

  // Biquad low/high-pass filter; a0-a2, b0-b2, x1/x2, y1/y2 are the standard textbook names.
  const quality = 2, filterAngle = (PI2 * Math.abs(filter) * 2) / ZZFX_SAMPLE_RATE;
  const cos = Math.cos(filterAngle), alpha = Math.sin(filterAngle) / 2 / quality;
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
  for (; i < length; samples[i++] = sample * volume) {
    if (!(++crushCounter % ((bitCrush * 100) | 0))) {
      // Wave shape: 0 sine, 1 triangle, 2 saw, 3 tan, 4 noise.
      sample = shape
        ? shape > 1
          ? shape > 2
            ? shape > 3
              ? Math.sin(phase * phase)
              : Math.max(Math.min(Math.tan(phase), 1), -1)
            : 1 - (((2 * phase) / PI2) % 2 + 2) % 2
          : 1 - 4 * Math.abs(Math.round(phase / PI2) - phase / PI2)
        : Math.sin(phase);

      // Envelope: attack, decay, sustain, release, with optional tremolo.
      sample =
        (repeatTime ? 1 - tremolo + tremolo * Math.sin((PI2 * i) / repeatTime) : 1) *
        sign(sample) * Math.abs(sample) ** shapeCurve *
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
      sample = delay
        ? sample / 2 + (delay > i ? 0 : ((i < length - delay ? 1 : (length - i) / delay) * samples[(i - delay) | 0]) / 2 / volume)
        : sample;

      // Filter.
      if (filter) sample = y1 = b2 * x2 + b1 * (x2 = x1) + b0 * (x1 = sample) - a2 * y2 - a1 * (y2 = y1);
    }

    // Advance frequency with slide and modulation, plus noise.
    phaseStep = (frequency += slide += deltaSlide) * Math.cos(modulation * modulationStep++);
    phase += phaseStep + phaseStep * noise * Math.sin(i ** 5);

    // One-off pitch jump.
    if (pitchJumpCounter && ++pitchJumpCounter > pitchJumpTime) {
      frequency += pitchJump;
      startFrequency += pitchJump;
      pitchJumpCounter = 0;
    }

    // Repeat: reset pitch and slide.
    if (repeatTime && !(++repeatCounter % repeatTime)) {
      frequency = startFrequency;
      slide = startSlide;
      pitchJumpCounter = pitchJumpCounter || 1;
    }
  }

  return samples;
}
