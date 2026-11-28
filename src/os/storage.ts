/** Keys for everything JackOS remembers between visits. */
export const STORAGE_KEYS = {
  visited: "jackos.visited",
  wallpaper: "jackos.wallpaper",
  sound: "jackos.sound",
} as const;

/**
 * Reads a saved JSON value. localStorage throws in Safari private mode and
 * when cookies are blocked, so any failure returns the fallback instead.
 */
export function readSetting<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    // Storage blocked or value corrupt: fall back rather than crash the desktop.
    return fallback;
  }
}

/** Saves a JSON value; when storage is unavailable it lasts this visit only. */
export function writeSetting(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked: the in-memory state still holds the choice.
  }
}
