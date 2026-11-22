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
  // Read the raw string; a missing key means the caller's fallback applies.
  try {
    const raw = window.localStorage.getItem(key);
    // Parse only when something was saved; bad JSON falls through to catch.
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    // Storage blocked or value corrupt: fall back rather than crash the desktop.
    return fallback;
  }
}

/** Saves a JSON value; when storage is unavailable it lasts this visit only. */
export function writeSetting(key: string, value: unknown): void {
  // Serialize and store; any throw from storage is swallowed below.
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked: the in-memory state still holds the choice.
  }
}
