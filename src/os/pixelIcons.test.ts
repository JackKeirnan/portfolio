import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PIXEL_ICONS } from "./pixelIcons";

describe("pixel icons", () => {
  it("points every icon at a PNG in public/icons", () => {
    for (const [name, src] of Object.entries(PIXEL_ICONS)) {
      expect(src, name).toMatch(/^\/icons\/[a-z-]+\.png$/);
      expect(existsSync(path.join(process.cwd(), "public", src)), src).toBe(true);
    }
  });

  it("has a game controller icon for game projects", () => {
    expect(PIXEL_ICONS.gamepad).toBe("/icons/gamepad.png");
  });
});
