"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { playSound, type SoundName } from "./sound";
import { readSetting, STORAGE_KEYS, writeSetting } from "./storage";
import { DEFAULT_WALLPAPER, isWallpaperId, type WallpaperId } from "./wallpapers";

/** visitor prefs shared by the shells and Display Settings */
export type Settings = {
  wallpaper: WallpaperId;
  setWallpaper(id: WallpaperId): void;
  soundOn: boolean;
  setSoundOn(on: boolean): void;
  // only plays if the visitor turned sound on
  play(name: SoundName): void;
};

const SettingsContext = createContext<Settings | null>(null);

/** holds + saves wallpaper and sound choices, sound is off by default */
export function SettingsProvider({ children }: { children: ReactNode }) {
  // start from defaults so server and client markup match, then load saved choices
  const [wallpaper, setWallpaperState] = useState<WallpaperId>(DEFAULT_WALLPAPER);
  const [soundOn, setSoundOnState] = useState(false);

  // load saved choices after mount, storage only exists in the browser
  useEffect(() => {
    // ignore a saved wallpaper id that doesn't exist anymore, keep the default
    const saved = readSetting<unknown>(STORAGE_KEYS.wallpaper, DEFAULT_WALLPAPER);
    if (isWallpaperId(saved)) setWallpaperState(saved);
    // sound stays off unless it was explicitly saved as true
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
        // audible check that sound works now
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

/** needs to be inside SettingsProvider */
export function useSettings(): Settings {
  const settings = useContext(SettingsContext);
  // fail loudly in dev instead of returning empty defaults
  if (!settings) throw new Error("useSettings must be used inside SettingsProvider");
  return settings;
}
