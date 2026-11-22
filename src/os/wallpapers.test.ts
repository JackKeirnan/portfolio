import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_WALLPAPER, WALLPAPERS, isWallpaperId } from "./wallpapers";

describe("wallpapers", () => {
  it("has a theme.css rule for every wallpaper", () => {
    const css = readFileSync(path.join(process.cwd(), "src/os/theme.css"), "utf8");
    for (const wallpaper of WALLPAPERS) expect(css).toContain(`[data-wallpaper="${wallpaper.id}"]`);
  });

  it("recognises only known wallpaper ids", () => {
    expect(isWallpaperId(DEFAULT_WALLPAPER)).toBe(true);
    expect(isWallpaperId("neon")).toBe(false);
    expect(isWallpaperId(42)).toBe(false);
  });
});
