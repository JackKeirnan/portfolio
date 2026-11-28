"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { playSound, type SoundName } from "./sound";
import { readSetting, STORAGE_KEYS, writeSetting } from "./storage";
import { DEFAULT_WALLPAPER, isWallpaperId, type WallpaperId } from "./wallpapers";

/** Visitor preferences shared by the shells and Display Settings. */
export type Settings = {
  wallpaper: WallpaperId;
  setWallpaper(id: WallpaperId): void;
  soundOn: boolean;
  setSoundOn(on: boolean): void;
  // Plays a sound only when the visitor has turned sound on.
  play(name: SoundName): void;
};

const SettingsContext = createContext<Settings | null>(null);

/** Holds and persists wallpaper and sound choices. Sound is off by default. */
export function SettingsProvider({ children }: { children: ReactNode }) {
  // Start from defaults so server and client markup match, then load saved choices.
  const [wallpaper, setWallpaperState] = useState<WallpaperId>(DEFAULT_WALLPAPER);
  const [soundOn, setSoundOnState] = useState(false);

  // After mount, load saved choices; storage is only reachable in the browser.
  useEffect(() => {
    // Ignore a saved wallpaper id that no longer exists; keep the default.
    const saved = readSetting<unknown>(STORAGE_KEYS.wallpaper, DEFAULT_WALLPAPER);
    if (isWallpaperId(saved)) setWallpaperState(saved);
    // Sound stays off unless it was explicitly saved as true.
    setSoundOnState(readSetting<unknown>(STORAGE_KEYS.sound, false) === true);
  }, []);

  const value = useMemo<Settings>(
    () => ({
      wallpaper,
      soundOn,
      setWallpaper(id) {
        setWallpaperState(id);
        writeSetting(STORAGE_KEYS.wallpaper, id);
      },
      setSoundOn(on) {
        setSoundOnState(on);
        writeSetting(STORAGE_KEYS.sound, on);
        // Audible confirmation that sound now works.
        if (on) playSound("open");
      },
      play(name) {
        if (soundOn) playSound(name);
      },
    }),
    [wallpaper, soundOn],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

/** Reads settings; must be used inside SettingsProvider. */
export function useSettings(): Settings {
  const settings = useContext(SettingsContext);
  // Fail loudly during development rather than returning empty defaults.
  if (!settings) throw new Error("useSettings must be used inside SettingsProvider");
  return settings;
}
