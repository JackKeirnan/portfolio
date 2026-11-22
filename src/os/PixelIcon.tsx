import { PIXEL_ICONS, toRects, type PixelIconName } from "./pixelIcons";

/** Renders a JackOS pixel icon as a crisp SVG. Decorative: labels carry the meaning. */
export function PixelIcon({ name, size = 32 }: { name: PixelIconName; size?: number }) {
  // Turn the named grid into one rect per run of colour.
  const rects = toRects(PIXEL_ICONS[name]);
  // Scale to size via the 12x12 viewBox; crispEdges keeps pixels sharp.
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      {rects.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} x={rect.x} y={rect.y} width={rect.width} height={1} fill={rect.fill} />
      ))}
    </svg>
  );
}
