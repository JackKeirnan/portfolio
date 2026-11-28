"use client";

import { useRef } from "react";
import { PixelIcon } from "./PixelIcon";
import type { PixelIconName } from "./pixelIcons";
import styles from "./IconButton.module.css";

/** icon label + look, selection state, and how it opens (single tap on phones, double-click on desktop) */
type Props = {
  label: string;
  icon: PixelIconName;
  // "desktop" = white label over wallpaper, "folder" = dark label on a white panel
  variant: "desktop" | "folder";
  selected?: boolean;
  // phones open on one tap, desktop selects on click and opens on double-click
  openOnSingleClick?: boolean;
  onSelect?: () => void;
  onOpen: () => void;
};

/**
 * desktop-style icon. touch taps, Enter and assistive-tech clicks open it, Space selects it
 * mouse clicks select on desktop (double-click opens) and open on phones
 */
export function IconButton({ label, icon, variant, selected, openOnSingleClick, onSelect, onOpen }: Props) {
  // how the last press started - touch screens can't rely on double-click (iOS might not send it)
  const pointerType = useRef<string>("mouse");
  // set while Space is down - Firefox still fires a click on keyup and that should only select
  const spacePressed = useRef(false);

  return (
    <button
      type="button"
      className={`${styles.icon} ${styles[variant]} ${selected ? styles.selected : ""}`}
      onPointerDown={(event) => {
        pointerType.current = event.pointerType;
      }}
      onClick={(event) => {
        // a click from Space only selects, whatever its detail says
        const fromSpace = spacePressed.current;
        spacePressed.current = false;
        if (fromSpace) return onSelect?.();
        // phones, touch/pen taps and screen-reader clicks (detail 0) open, mouse clicks select
        const touch = event.detail > 0 && pointerType.current !== "mouse";
        if (openOnSingleClick || touch || event.detail === 0) onOpen();
        else onSelect?.();
      }}
      onDoubleClick={() => {
        if (!openOnSingleClick && pointerType.current === "mouse") onOpen();
      }}
      onKeyDown={(event) => {
        // Enter would normally fire click (select), make it open instead, once per press
        if (event.key === "Enter") {
          event.preventDefault();
          if (event.repeat) return;
          onOpen();
        }
        // Space only selects - cancel its click where the browser lets us and mark any that still comes
        if (event.key === " " && !openOnSingleClick) {
          event.preventDefault();
          spacePressed.current = true;
          onSelect?.();
        }
      }}
      onKeyUp={(event) => {
        // clear the Space mark after Firefox's keyup click is handled (or never came)
        if (event.key === " ") setTimeout(() => (spacePressed.current = false), 0);
      }}
      onBlur={() => {
        // focus left mid-press so this icon's keyup never arrives, drop the mark
        spacePressed.current = false;
      }}
    >
      <PixelIcon name={icon} size={32} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
