"use client";

import { useCallback, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AppContent } from "../appComponents";
import { APPS } from "../apps";
import { boxesOverlap, boxFromPoints, type Box } from "../geometry";
import { IconButton } from "../IconButton";
import { useWindowManager } from "../WindowManagerProvider";
import { ContextMenu, type ContextMenuItem } from "./ContextMenu";
import { Window } from "./Window";
import styles from "./Desktop.module.css";

/** wallpaper area with app icons, drag-to-select, a right-click menu and every open window */
export function Desktop() {
  const wm = useWindowManager();
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const [byName, setByName] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [lasso, setLasso] = useState<Box | null>(null);
  const navRef = useRef<HTMLElement>(null);
  // stable so the menu's outside-click listener isn't re-subscribed on every render
  const closeMenu = useCallback(() => setMenu(null), []);

  const desktopApps = APPS.filter((app) => app.onDesktop);
  const icons = byName ? [...desktopApps].sort((a, b) => a.title.localeCompare(b.title)) : desktopApps;

  /** drag on empty wallpaper draws a dotted box and selects every icon it touches */
  function startLasso(event: ReactPointerEvent<HTMLDivElement>) {
    // only primary presses on bare wallpaper; a plain click there just clears the selection
    if (event.button !== 0 || event.target !== event.currentTarget) return;
    setSelected(new Set());
    const area = event.currentTarget;
    const origin = area.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    area.setPointerCapture(event.pointerId);

    const onMove = (move: PointerEvent) => {
      const box = boxFromPoints(startX, startY, move.clientX, move.clientY);
      // icons render in `icons` order, so the nth button is the nth app
      const buttons = Array.from(navRef.current?.querySelectorAll("button") ?? []);
      setSelected(new Set(icons.filter((_, index) => buttons[index] && boxesOverlap(box, buttons[index].getBoundingClientRect())).map((app) => app.id)));
      // draw the box in desktop coordinates
      setLasso({ left: box.left - origin.left, top: box.top - origin.top, right: box.right - origin.left, bottom: box.bottom - origin.top });
    };
    const onEnd = () => {
      setLasso(null);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerup", onEnd);
      area.removeEventListener("pointercancel", onEnd);
    };
    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerup", onEnd);
    area.addEventListener("pointercancel", onEnd);
  }

  const menuItems: ContextMenuItem[] = [
    { label: byName ? "Default icon order" : "Arrange icons by name", onSelect: () => setByName(!byName) },
    {
      label: "Refresh",
      onSelect: () => {
        // a quick flicker of the icons, like the old desktops did
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 150);
      },
    },
    null,
    { label: "Display Settings...", onSelect: () => wm.open({ appId: "display" }) },
    { label: "About JackOS", onSelect: () => wm.open({ appId: "credits" }) },
  ];

  return (
    <div
      className={styles.desktop}
      onPointerDown={startLasso}
      onContextMenu={(event) => {
        // right-click on bare wallpaper or the icon column opens the desktop menu; icons and windows keep their own
        if ((event.target as HTMLElement).closest("button, [role='dialog'], [role='menu']")) return;
        event.preventDefault();
        setMenu({ x: event.clientX, y: event.clientY });
      }}
    >
      <nav ref={navRef} aria-label="Desktop" className={styles.icons} style={{ visibility: refreshing ? "hidden" : undefined }}>
        {icons.map((app) => (
          <IconButton
            key={app.id}
            variant="desktop"
            label={app.title}
            icon={app.icon}
            selected={selected.has(app.id)}
            onSelect={() => setSelected(new Set([app.id]))}
            onOpen={() => wm.open({ appId: app.id })}
          />
        ))}
      </nav>
      {lasso && (
        <div
          className={styles.lasso}
          aria-hidden="true"
          style={{ left: lasso.left, top: lasso.top, width: lasso.right - lasso.left, height: lasso.bottom - lasso.top }}
        />
      )}
      {wm.state.windows.map((win) => (
        <Window key={win.id} win={win} focused={wm.state.focusedId === win.id}>
          <AppContent appId={win.appId} params={win.params} />
        </Window>
      ))}
      {menu && <ContextMenu x={menu.x} y={menu.y} items={menuItems} onClose={closeMenu} />}
    </div>
  );
}
