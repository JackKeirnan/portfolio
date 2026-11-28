/** wallpapers offered in Display Settings, each has a matching rule in theme.css */
export const WALLPAPERS = [
  { id: "plum", label: "Plum" },
  { id: "aurora", label: "Aurora" },
  { id: "lagoon", label: "Lagoon" },
  { id: "midnight", label: "Midnight grid" },
] as const;

/** union of the wallpaper ids above so a bad id won't compile */
export type WallpaperId = (typeof WALLPAPERS)[number]["id"];

export const DEFAULT_WALLPAPER: WallpaperId = "plum";

/** guards values read back from storage, could be anything */
export function isWallpaperId(value: unknown): value is WallpaperId {
  return WALLPAPERS.some((wallpaper) => wallpaper.id === value);
}
