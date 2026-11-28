import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { SOUND_NAMES, SOUND_PRESETS } from "./sound";
import { ZZFX_SAMPLE_RATE, zzfxGenerate } from "./vendor/zzfx";

describe("sounds", () => {
  it("ships the ZzFX MIT licence with the site", () => {
    expect(existsSync(path.join(process.cwd(), "public/licenses/zzfx.txt"))).toBe(true);
  });

  it("has a preset for every sound name", () => {
    for (const name of SOUND_NAMES) expect(SOUND_PRESETS[name]?.length, name).toBeGreaterThan(0);
  });

  it("uses retro square waves, sitting at full level most of the time", () => {
    for (const name of SOUND_NAMES) {
      const samples = zzfxGenerate(...SOUND_PRESETS[name][0].params);
      const peak = Math.max(...samples.map(Math.abs));
      // A square wave sits at +/- peak outside its short release; a sine almost never does.
      const atPeak = samples.filter((value) => Math.abs(Math.abs(value) - peak) < 1e-9).length;
      expect(atPeak / samples.length, name).toBeGreaterThan(0.5);
    }
  });

  it("gives each action its own sound", () => {
    const fingerprints = SOUND_NAMES.map((name) => JSON.stringify(SOUND_PRESETS[name]));
    expect(new Set(fingerprints).size).toBe(SOUND_NAMES.length);
  });

  it("generates short, finite, in-range audio for every preset", () => {
    for (const name of SOUND_NAMES) {
      for (const note of SOUND_PRESETS[name]) {
        const samples = zzfxGenerate(...note.params);
        expect(samples.length, name).toBeGreaterThan(0);
        // UI sounds stay under a second so they never drag behind the action.
        expect(samples.length / ZZFX_SAMPLE_RATE + note.at, name).toBeLessThan(1);
        expect(samples.every((value) => Number.isFinite(value) && Math.abs(value) <= 1), name).toBe(true);
      }
    }
  });
});
