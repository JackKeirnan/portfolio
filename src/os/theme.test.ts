import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PIXEL_ICONS } from "./pixelIcons";

/** reads one --os-* colour token straight from theme.css */
const css = readFileSync(path.join(process.cwd(), "src/os/theme.css"), "utf8");
const token = (name: string) => css.match(new RegExp(`--os-${name}:\\s*(#[0-9a-f]{6})`))![1];
/** the same token as dark mode sets it, falling back to the light value when dark mode doesn't override it */
const darkBlock = css.slice(css.indexOf('[data-theme="dark"]'));
const darkToken = (name: string) =>
  darkBlock.slice(0, darkBlock.indexOf("}")).match(new RegExp(`--os-${name}:\\s*(#[0-9a-f]{6})`))?.[1] ?? token(name);

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
  it("keeps white title text readable on active and inactive title bars (title-to also backs selected icon labels)", () => {
    for (const end of ["title-from", "title-to", "title-inactive-from", "title-inactive-to"]) expect(contrast("#ffffff", token(end)), end).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps white JackOS button text readable", () => {
    expect(contrast("#ffffff", token("start"))).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps body, muted, link and heading text readable on panels and chrome", () => {
    for (const text of ["text", "muted", "link", "heading"]) {
      expect(contrast(token(text), token("panel")), `${text} on panel`).toBeGreaterThanOrEqual(4.5);
      expect(contrast(token(text), token("chrome")), `${text} on chrome`).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("keeps dark mode text readable on its panels, chrome and pressed buttons", () => {
    for (const text of ["text", "muted", "link", "heading"]) {
      for (const surface of ["panel", "chrome", "panel-raised"]) {
        expect(contrast(darkToken(text), darkToken(surface)), `${text} on dark ${surface}`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("keeps white glyphs visible on every icon tile", () => {
    // icons are decorative, so the 3:1 non-text contrast level applies
    for (const [name, icon] of Object.entries(PIXEL_ICONS)) expect(contrast("#ffffff", icon.tile), name).toBeGreaterThanOrEqual(3);
  });
});

describe("cursors", () => {
  it("points every cursor token at a file in public/cursors and ships Kenney's licence", () => {
    for (const name of ["cursor", "cursor-hand", "cursor-busy"]) {
      const file = css.match(new RegExp(`--os-${name}:\\s*url\\("([^"]+)"\\)`))?.[1];
      expect(file, name).toMatch(/^\/cursors\/[a-z]+\.png$/);
      expect(existsSync(path.join(process.cwd(), "public", file!)), file).toBe(true);
    }
    expect(existsSync(path.join(process.cwd(), "public/licenses/kenney-cursor-pixel-pack.txt"))).toBe(true);
  });
});

describe("wallpaper", () => {
  it("points the animated art and its reduced-motion still at files in public/art", () => {
    const files = [...css.matchAll(/--os-wallpaper-art:\s*url\("([^"]+)"\)/g)].map((match) => match[1]);
    expect(files).toEqual(["/art/fudge-and-ginger.gif", "/art/fudge-and-ginger.png"]);
    for (const file of files) expect(existsSync(path.join(process.cwd(), "public", file)), file).toBe(true);
  });
});
