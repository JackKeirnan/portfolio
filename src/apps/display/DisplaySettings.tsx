"use client";

import { useSettings } from "@/os/settings";
import { WALLPAPERS } from "@/os/wallpapers";
import styles from "../apps.module.css";

/** wallpaper picker + sound switch, choices get saved through the settings provider */
export function DisplaySettings() {
  const settings = useSettings();
  return (
    <div className={styles.page}>
      <fieldset className={styles.fieldset}>
        <legend>Wallpaper</legend>
        {WALLPAPERS.map((wallpaper) => (
          <label key={wallpaper.id} className={styles.option}>
            <input
              type="radio"
              name="wallpaper"
              value={wallpaper.id}
              checked={settings.wallpaper === wallpaper.id}
              onChange={() => settings.setWallpaper(wallpaper.id)}
            />
            {wallpaper.label}
          </label>
        ))}
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
