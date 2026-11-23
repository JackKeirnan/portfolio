"use client";

import { useCallback, useState } from "react";
import { getAppMeta, windowTitle } from "../apps";
import { PixelIcon } from "../PixelIcon";
import { useSettings } from "../settings";
import { Clock, SoundToggle } from "../Tray";
import { useWindowManager } from "../WindowManagerProvider";
import { StartMenu } from "./StartMenu";
import styles from "./Taskbar.module.css";

/** Bottom bar: JackOS menu button, one button per open window, and the tray. */
export function Taskbar({ onShutDown }: { onShutDown: () => void }) {
  const wm = useWindowManager();
  const { play } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  // Stable so StartMenu's outside-click effect is not re-subscribed every render.
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <footer className={`${styles.taskbar} os-raised`}>
      <button
        type="button"
        data-start-button
        className={`${styles.start} os-raised`}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        onClick={() => {
          // Tick only when the menu opens, not when it closes.
          if (!menuOpen) play("menu");
          setMenuOpen(!menuOpen);
        }}
      >
        JackOS
      </button>
      {menuOpen && <StartMenu onClose={closeMenu} onShutDown={onShutDown} />}

      <div className={styles.tasks} aria-label="Open windows" role="group">
        {wm.state.windows.map((win) => {
          // Clicking the active window's button minimises it; otherwise it is brought forward.
          const active = wm.state.focusedId === win.id && !win.minimized;
          const title = windowTitle(win.appId, win.params);
          return (
            <button
              key={win.id}
              type="button"
              aria-pressed={active}
              className={`${styles.task} os-raised ${active ? styles.active : ""}`}
              onClick={() => (active ? wm.minimize(win.id) : wm.focus(win.id))}
            >
              <PixelIcon name={getAppMeta(win.appId).icon} size={16} />
              <span>{title}</span>
            </button>
          );
        })}
      </div>

      <div className={`${styles.tray} os-sunken`}>
        <SoundToggle />
        <Clock />
      </div>
    </footer>
  );
}
