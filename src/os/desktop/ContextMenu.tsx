"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import styles from "./StartMenu.module.css";

/** one entry in the right-click menu; null draws a divider */
export type ContextMenuItem = { label: string; onSelect: () => void } | null;

/** right-click menu at the pointer, kept on screen, with the same keys and look as the JackOS menu */
export function ContextMenu({ x, y, items, onClose }: { x: number; y: number; items: ContextMenuItem[]; onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);

  // nudge the menu back inside the window, then focus the first item for keyboard use
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const box = menu.getBoundingClientRect();
    menu.style.left = `${Math.max(0, Math.min(x, window.innerWidth - box.width))}px`;
    menu.style.top = `${Math.max(0, Math.min(y, window.innerHeight - box.height))}px`;
    menu.querySelector<HTMLElement>("[role='menuitem']")?.focus();
  }, [x, y]);

  // any press outside the menu closes it; capture phase so it runs before the desktop
  // handles the same press (its re-render would otherwise swap this listener mid-event)
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) onClose();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [onClose]);

  /** arrow keys move between items, Esc or Tab closes */
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const buttons = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("[role='menuitem']") ?? []);
    const index = buttons.indexOf(document.activeElement as HTMLElement);
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      buttons[(index + step + buttons.length) % buttons.length]?.focus();
    } else if (event.key === "Escape" || event.key === "Tab") {
      event.preventDefault();
      onClose();
    }
  }

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Desktop menu"
      className={`os-raised ${styles.items}`}
      style={{ position: "fixed", left: x, top: y, zIndex: 10001, minWidth: 200 }}
      onKeyDown={onKeyDown}
    >
      {items.map((item, index) =>
        item ? (
          <button
            key={item.label}
            type="button"
            role="menuitem"
            className={styles.item}
            onClick={() => {
              onClose();
              item.onSelect();
            }}
          >
            {item.label}
          </button>
        ) : (
          <hr key={`divider-${index}`} className={styles.divider} />
        ),
      )}
    </div>
  );
}
