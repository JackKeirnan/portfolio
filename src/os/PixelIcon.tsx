import { PIXEL_ICONS, type PixelIconName } from "./pixelIcons";

/** Renders a JackOS pixel icon, kept crisp when scaled. Decorative: labels carry the meaning. */
export function PixelIcon({ name, size = 32 }: { name: PixelIconName; size?: number }) {
  return (
    // Plain img: the PNGs are tiny and pre-sized, so next/image optimisation adds nothing.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={PIXEL_ICONS[name]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      draggable={false}
      style={{ imageRendering: "pixelated", objectFit: "contain" }}
    />
  );
}
