import { describe, expect, it } from "vitest";
import { PIXEL_ICONS, PIXEL_PALETTE, toRects } from "./pixelIcons";

describe("pixel icons", () => {
  it("draws every icon on a 12x12 grid using palette colours only", () => {
    for (const [name, grid] of Object.entries(PIXEL_ICONS)) {
      expect(grid, name).toHaveLength(12);
      for (const row of grid) {
        expect(row, `${name}: "${row}"`).toHaveLength(12);
        for (const cell of row) expect(cell === "." || cell in PIXEL_PALETTE, `${name}: '${cell}'`).toBe(true);
      }
    }
  });

  it("merges horizontal runs of one colour into a single rect", () => {
    expect(toRects(["kk.w"])).toEqual([
      { x: 0, y: 0, width: 2, fill: PIXEL_PALETTE.k },
      { x: 3, y: 0, width: 1, fill: PIXEL_PALETTE.w },
    ]);
  });
});
