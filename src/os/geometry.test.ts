import { describe, expect, it } from "vitest";
import { bounceStep, boxesOverlap, boxFromPoints } from "./geometry";

describe("drag-select boxes", () => {
  it("builds the same box whichever way the drag goes", () => {
    const box = { left: 10, top: 20, right: 50, bottom: 80 };
    expect(boxFromPoints(10, 20, 50, 80)).toEqual(box);
    expect(boxFromPoints(50, 80, 10, 20)).toEqual(box);
    expect(boxFromPoints(50, 20, 10, 80)).toEqual(box);
  });

  it("detects overlap, but not boxes that only touch or sit apart", () => {
    const icon = { left: 100, top: 100, right: 180, bottom: 160 };
    expect(boxesOverlap({ left: 90, top: 90, right: 110, bottom: 110 }, icon)).toBe(true);
    expect(boxesOverlap({ left: 120, top: 120, right: 130, bottom: 130 }, icon)).toBe(true);
    expect(boxesOverlap({ left: 180, top: 100, right: 200, bottom: 160 }, icon)).toBe(false);
    expect(boxesOverlap({ left: 0, top: 0, right: 50, bottom: 50 }, icon)).toBe(false);
  });
});

describe("screensaver bounce", () => {
  it("moves by its speed inside the area", () => {
    expect(bounceStep({ x: 10, y: 10, dx: 2, dy: 3 }, 100, 100)).toEqual({ x: 12, y: 13, dx: 2, dy: 3 });
  });

  it("flips direction and stays inside at each edge", () => {
    expect(bounceStep({ x: 99, y: 50, dx: 3, dy: 1 }, 100, 100)).toEqual({ x: 100, y: 51, dx: -3, dy: 1 });
    expect(bounceStep({ x: 1, y: 1, dx: -3, dy: -3 }, 100, 100)).toEqual({ x: 0, y: 0, dx: 3, dy: 3 });
  });

  it("never escapes over many frames, even in a tiny area", () => {
    let logo = { x: 0, y: 0, dx: 7, dy: 5 };
    for (let frame = 0; frame < 1000; frame++) {
      logo = bounceStep(logo, 20, 10);
      expect(logo.x).toBeGreaterThanOrEqual(0);
      expect(logo.x).toBeLessThanOrEqual(20);
      expect(logo.y).toBeGreaterThanOrEqual(0);
      expect(logo.y).toBeLessThanOrEqual(10);
    }
  });
});
