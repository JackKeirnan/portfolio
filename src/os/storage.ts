/** keys for everything JackOS remembers between visits */
export const STORAGE_KEYS = {
  visited: "jackos.visited",
  dark: "jackos.dark",
  sound: "jackos.sound",
} as const;

/**
 * read a saved JSON value. localStorage throws in Safari private mode and
 * when cookies are blocked, so any failure just returns the fallback
 */
export function readSetting<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    // storage blocked or value corrupt - fall back instead of crashing the desktop
    return fallback;
  }
}

/** save a JSON value, if storage isn't available it only lasts this visit */
export function writeSetting(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage blocked - in-memory state still holds the choice
  }
}
