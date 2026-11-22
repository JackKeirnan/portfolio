/** Wallpapers offered in Display Settings; each has a matching rule in theme.css. */
export const WALLPAPERS = [
  { id: "aurora", label: "Aurora" },
  { id: "lagoon", label: "Lagoon" },
  { id: "midnight", label: "Midnight grid" },
  { id: "plum", label: "Plum" },
] as const;

/** Union of the wallpaper ids above, so a bad id fails to compile. */
export type WallpaperId = (typeof WALLPAPERS)[number]["id"];

export const DEFAULT_WALLPAPER: WallpaperId = "aurora";

/** Guards values read back from storage, which could be anything. */
export function isWallpaperId(value: unknown): value is WallpaperId {
  // Compare against every known id; anything else (including non-strings) is rejected.
  return WALLPAPERS.some((wallpaper) => wallpaper.id === value);
}
