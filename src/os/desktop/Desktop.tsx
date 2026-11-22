"use client";

import { useState } from "react";
import { AppContent } from "../appComponents";
import { APPS } from "../apps";
import { IconButton } from "../IconButton";
import { useWindowManager } from "../WindowManagerProvider";
import { Window } from "./Window";
import styles from "./Desktop.module.css";

/** Wallpaper area with app icons and every open window. */
export function Desktop() {
  const wm = useWindowManager();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      className={styles.desktop}
      onPointerDown={(event) => {
        // Clicking empty wallpaper clears the icon selection.
        if (event.target === event.currentTarget) setSelected(null);
      }}
      onContextMenu={(event) => {
        // Right-click on empty wallpaper opens Display Settings.
        if ((event.target as HTMLElement).closest("button, [role='dialog']")) return;
        event.preventDefault();
        wm.open({ appId: "display" });
      }}
    >
      <nav aria-label="Desktop" className={styles.icons}>
        {APPS.filter((app) => app.onDesktop).map((app) => (
          <IconButton
            key={app.id}
            variant="desktop"
            label={app.title}
            icon={app.icon}
            selected={selected === app.id}
            onSelect={() => setSelected(app.id)}
            onOpen={() => wm.open({ appId: app.id })}
          />
        ))}
      </nav>
      {wm.state.windows.map((win) => (
        <Window key={win.id} win={win} focused={wm.state.focusedId === win.id}>
          <AppContent appId={win.appId} params={win.params} />
        </Window>
      ))}
    </div>
  );
}
