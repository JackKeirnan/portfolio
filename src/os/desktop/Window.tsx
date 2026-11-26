"use client";

import { useEffect, useRef, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { getAppMeta, windowTitle } from "../apps";
import { PixelIcon } from "../PixelIcon";
import { WindowErrorBoundary } from "../WindowErrorBoundary";
import type { WindowState } from "../windowManager";
import { useWindowManager } from "../WindowManagerProvider";
import styles from "./Window.module.css";

/**
 * Tracks a pointer drag on an element. Pointer capture keeps the drag alive
 * when the cursor leaves the element; listeners are removed on release.
 */
function trackDrag(event: ReactPointerEvent<HTMLElement>, onDelta: (dx: number, dy: number) => void) {
  const target = event.currentTarget;
  const startX = event.clientX;
  const startY = event.clientY;
  target.setPointerCapture(event.pointerId);
  const onMove = (move: PointerEvent) => onDelta(move.clientX - startX, move.clientY - startY);
  const onEnd = () => {
    target.removeEventListener("pointermove", onMove);
    target.removeEventListener("pointerup", onEnd);
    target.removeEventListener("pointercancel", onEnd);
  };
  target.addEventListener("pointermove", onMove);
  target.addEventListener("pointerup", onEnd);
  target.addEventListener("pointercancel", onEnd);
}

/** A draggable, resizable window frame around one app. */
export function Window({ win, focused, children }: { win: WindowState; focused: boolean; children: ReactNode }) {
  const wm = useWindowManager();
  const rootRef = useRef<HTMLDivElement>(null);
  const title = windowTitle(win.appId, win.params);
  const titleId = `window-title-${win.id}`;

  // Move keyboard focus into the window when it becomes active, unless focus is already inside.
  useEffect(() => {
    if (focused && !rootRef.current?.contains(document.activeElement)) rootRef.current?.focus();
  }, [focused]);

  /** Drags the window by its title bar; buttons in the bar are excluded. */
  function startMove(event: ReactPointerEvent<HTMLDivElement>) {
    // Ignore maximised windows, non-primary buttons and presses on the controls.
    if (win.maximized || event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
    // Move relative to where the window was when the drag began.
    const { x, y } = win;
    trackDrag(event, (dx, dy) => wm.move(win.id, x + dx, y + dy));
  }

  /** Maximises or restores on a title-bar double-click, ignoring the control buttons. */
  function onTitleBarDoubleClick(event: ReactMouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button")) return;
    wm.toggleMaximize(win.id);
  }

  /** Resizes from the bottom-right handle; the press also bubbles up to focus the window. */
  function startResize(event: ReactPointerEvent<HTMLDivElement>) {
    // Primary button only.
    if (event.button !== 0) return;
    // Resize relative to the size when the drag began.
    const { w, h } = win;
    trackDrag(event, (dx, dy) => wm.resize(win.id, w + dx, h + dy));
  }

  // Maximised windows fill the desktop via CSS; others use their stored geometry.
  const geometry = win.maximized ? {} : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      hidden={win.minimized}
      className={`${styles.window} os-raised ${focused ? styles.focused : ""} ${win.maximized ? styles.maximized : ""}`}
      style={{ ...geometry, zIndex: win.z }}
      onPointerDown={() => {
        if (!focused) wm.focus(win.id);
      }}
      onKeyDown={(event) => {
        // Esc closes the focused window, but not while typing: fields keep Esc for themselves.
        const target = event.target as HTMLElement;
        const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
        if (event.key === "Escape" && !typing) {
          event.stopPropagation();
          wm.close(win.id);
        }
      }}
    >
      <div className={styles.titleBar} data-titlebar onPointerDown={startMove} onDoubleClick={onTitleBarDoubleClick}>
        <PixelIcon name={getAppMeta(win.appId).icon} size={16} />
        <span id={titleId} className={styles.title}>{title}</span>
        <div className={styles.controls}>
          <button type="button" className="os-raised" aria-label={`Minimise ${title}`} onClick={() => wm.minimize(win.id)}>_</button>
          <button type="button" className="os-raised" aria-label={`${win.maximized ? "Restore" : "Maximise"} ${title}`} onClick={() => wm.toggleMaximize(win.id)}>
            {win.maximized ? "▫" : "□"}
          </button>
          <button type="button" className={`os-raised ${styles.close}`} aria-label={`Close ${title}`} onClick={() => wm.close(win.id)}>×</button>
        </div>
      </div>
      <div className={styles.body}>
        <div className={`os-sunken ${styles.panel}`}>
          <WindowErrorBoundary title={title} onClose={() => wm.close(win.id)}>{children}</WindowErrorBoundary>
        </div>
      </div>
      {!win.maximized && <div className={styles.resizeHandle} onPointerDown={startResize} aria-hidden="true" />}
    </div>
  );
}
