/** screen rectangle in px, as getBoundingClientRect gives it */
export type Box = { left: number; top: number; right: number; bottom: number };

/** the box between two drag points, whichever way the drag went */
export function boxFromPoints(startX: number, startY: number, endX: number, endY: number): Box {
  return { left: Math.min(startX, endX), top: Math.min(startY, endY), right: Math.max(startX, endX), bottom: Math.max(startY, endY) };
}

/** true when two boxes overlap at all - touching edges don't count */
export function boxesOverlap(a: Box, b: Box): boolean {
  return a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
}

/** one screensaver logo: where it is and how far it moves per frame */
export type Bouncer = { x: number; y: number; dx: number; dy: number };

/** moves the logo one frame, flipping direction at the edges so it stays inside width x height */
export function bounceStep(logo: Bouncer, width: number, height: number): Bouncer {
  let { x, y, dx, dy } = logo;
  x += dx;
  y += dy;
  // clamp back inside and reverse, like the old DVD-player screensaver
  if (x < 0 || x > width) { dx = -dx; x = Math.min(Math.max(x, 0), Math.max(width, 0)); }
  if (y < 0 || y > height) { dy = -dy; y = Math.min(Math.max(y, 0), Math.max(height, 0)); }
  return { x, y, dx, dy };
}
