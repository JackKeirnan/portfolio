"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { playSound, type SoundName } from "./sound";
import { readSetting, STORAGE_KEYS, THEME_SCRIPT, writeSetting } from "./storage";

/** visitor prefs shared by the shells and Display Settings */
export type Settings = {
  dark: boolean;
  setDark(on: boolean): void;
  animatedWallpaper: boolean;
  setAnimatedWallpaper(on: boolean): void;
  soundOn: boolean;
  setSoundOn(on: boolean): void;
  // only plays if the visitor turned sound on
  play(name: SoundName): void;
};

const SettingsContext = createContext<Settings | null>(null);

/** holds + saves dark mode, wallpaper motion and sound choices, sound is off by default */
export function SettingsProvider({ children }: { children: ReactNode }) {
  // start from defaults so server and client markup match, then load saved choices
  const [dark, setDarkState] = useState(false);
  const [animatedWallpaper, setAnimatedWallpaperState] = useState(false);
  const [soundOn, setSoundOnState] = useState(false);

  // load saved choices after mount, storage only exists in the browser
  useEffect(() => {
    // THEME_SCRIPT normally ran before first paint; notFound() pages render client-side only, so run it here
    if (!document.documentElement.dataset.theme) new Function(THEME_SCRIPT)();
    setDarkState(document.documentElement.dataset.theme === "dark");
    setAnimatedWallpaperState(document.documentElement.dataset.wallpaper === "animated");
    // sound stays off unless it was explicitly saved as true
    setSoundOnState(readSetting<unknown>(STORAGE_KEYS.sound, false) === true);
  }, []);

  const value = useMemo<Settings>(
    () => ({
      dark,
      animatedWallpaper,
      soundOn,
      setDark(on) {
        setDarkState(on);
        document.documentElement.dataset.theme = on ? "dark" : "light";
        writeSetting(STORAGE_KEYS.dark, on);
      },
      setAnimatedWallpaper(on) {
        setAnimatedWallpaperState(on);
        document.documentElement.dataset.wallpaper = on ? "animated" : "still";
        writeSetting(STORAGE_KEYS.animatedWallpaper, on);
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
    [dark, animatedWallpaper, soundOn],
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
