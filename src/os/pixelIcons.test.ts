import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PIXEL_ICONS } from "./pixelIcons";

describe("pixel icons", () => {
  it("gives every icon a 24px path and a tile colour", () => {
    for (const [name, icon] of Object.entries(PIXEL_ICONS)) {
      expect(icon.path, name).toMatch(/^M[\d\s.hvHVmMzZ-]+$/);
      expect(icon.tile, name).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("has a game controller icon for game projects", () => {
    expect(PIXEL_ICONS.gamepad.path.length).toBeGreaterThan(0);
  });

  it("ships the pixelarticons MIT licence with the site", () => {
    expect(existsSync(path.join(process.cwd(), "public/licenses/pixelarticons.txt"))).toBe(true);
  });
});
