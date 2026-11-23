import type { CSSProperties } from "react";
import { PIXEL_ICONS, type PixelIconName } from "./pixelIcons";
import styles from "./PixelIcon.module.css";

/** Renders an icon as a white pixel glyph on a bevelled, coloured tile. Decorative: labels carry the meaning. */
export function PixelIcon({ name, size = 32 }: { name: PixelIconName; size?: number }) {
  const icon = PIXEL_ICONS[name];
  // Thinner bevel on small icons (title bars, taskbar) so the glyph keeps its room.
  const bevel = size >= 24 ? 2 : 1;
  const style = { width: size, height: size, borderWidth: bevel, background: icon.tile } as CSSProperties;
  return (
    <span className={styles.tile} style={style} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="75%" height="75%" fill="#ffffff" shapeRendering="crispEdges" focusable="false">
        <path d={icon.path} />
      </svg>
    </span>
  );
}
