"use client";

import { useSettings } from "@/os/settings";
import styles from "../apps.module.css";

/** dark mode, wallpaper motion + sound switches, choices get saved through the settings provider */
export function DisplaySettings() {
  const settings = useSettings();
  return (
    <div className={styles.page}>
      <fieldset className={styles.fieldset}>
        <legend>Appearance</legend>
        <label className={styles.option}>
          <input type="checkbox" checked={settings.dark} onChange={(event) => settings.setDark(event.target.checked)} />
          Dark mode
        </label>
        <label className={styles.option}>
          <input type="checkbox" checked={settings.animatedWallpaper} onChange={(event) => settings.setAnimatedWallpaper(event.target.checked)} />
          Animated wallpaper
        </label>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend>Sound</legend>
        <label className={styles.option}>
          <input type="checkbox" checked={settings.soundOn} onChange={(event) => settings.setSoundOn(event.target.checked)} />
          Play interface sounds
        </label>
      </fieldset>
    </div>
  );
}
