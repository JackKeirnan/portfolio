import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PIXEL_ICONS } from "./pixelIcons";

/** reads one --os-* colour token straight from theme.css */
const css = readFileSync(path.join(process.cwd(), "src/os/theme.css"), "utf8");
const token = (name: string) => css.match(new RegExp(`--os-${name}:\\s*(#[0-9a-f]{6})`))![1];

/** WCAG contrast ratio between two #rrggbb colours */
function contrast(a: string, b: string): number {
  const luminance = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
      return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

describe("theme contrast (WCAG AA, 4.5:1)", () => {
  it("keeps white title text readable on both ends of the title bar", () => {
    for (const end of ["title-from", "title-to"]) expect(contrast("#ffffff", token(end)), end).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps white JackOS button text readable", () => {
    expect(contrast("#ffffff", token("start"))).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps body, muted and link text readable on panels and chrome", () => {
    for (const text of ["text", "muted", "link"]) {
      expect(contrast(token(text), token("panel")), `${text} on panel`).toBeGreaterThanOrEqual(4.5);
      expect(contrast(token(text), token("chrome")), `${text} on chrome`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps white glyphs visible on every icon tile", () => {
    // icons are decorative, so the 3:1 non-text contrast level applies
    for (const [name, icon] of Object.entries(PIXEL_ICONS)) expect(contrast("#ffffff", icon.tile), name).toBeGreaterThanOrEqual(3);
  });
});
