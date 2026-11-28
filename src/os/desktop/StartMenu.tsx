"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { APPS } from "../apps";
import { PixelIcon } from "../PixelIcon";
import { useWindowManager } from "../WindowManagerProvider";
import styles from "./StartMenu.module.css";

/** The JackOS menu: every app, Plain view, and Shut down. */
export function StartMenu({ onClose, onShutDown }: { onClose: () => void; onShutDown: () => void }) {
  const wm = useWindowManager();
  const menuRef = useRef<HTMLDivElement>(null);

  // Focus the first item so the menu is usable from the keyboard straight away.
  useEffect(() => {
    menuRef.current?.querySelector<HTMLElement>("[role='menuitem']")?.focus();
  }, []);

  // Close on any click outside the menu (the Start button toggles it itself).
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (!menuRef.current?.contains(target) && !target.closest("[data-start-button]")) onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [onClose]);

  /** Arrow keys move between items; Esc closes and returns focus. */
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("[role='menuitem']") ?? []);
    const index = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      // Move focus one item, wrapping at both ends.
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      items[(index + step + items.length) % items.length]?.focus();
    } else if (event.key === "Escape") {
      // Close the menu and give focus back to the Start button.
      onClose();
      document.querySelector<HTMLElement>("[data-start-button]")?.focus();
    }
  }

  return (
    <div ref={menuRef} role="menu" aria-label="JackOS menu" className={`${styles.menu} os-raised`} onKeyDown={onKeyDown}>
      <div className={styles.banner} aria-hidden="true">JackOS</div>
      <div className={styles.items}>
        {APPS.filter((app) => app.inStartMenu).map((app) => (
          <button
            key={app.id}
            type="button"
            role="menuitem"
            className={styles.item}
            onClick={() => {
              wm.open({ appId: app.id });
              onClose();
            }}
          >
            <PixelIcon name={app.icon} size={16} />
            {app.title}
          </button>
        ))}
        <hr className={styles.divider} />
        <a role="menuitem" className={styles.item} href="/plain">Plain view</a>
        <button
          type="button"
          role="menuitem"
          className={styles.item}
          onClick={() => {
            onClose();
            onShutDown();
          }}
        >
          Shut down...
        </button>
      </div>
    </div>
  );
}
