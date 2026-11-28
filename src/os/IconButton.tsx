"use client";

import { useRef } from "react";
import { PixelIcon } from "./PixelIcon";
import type { PixelIconName } from "./pixelIcons";
import styles from "./IconButton.module.css";

/** Icon label and look, selection state, and how it opens (single tap on phones, double-click on desktops). */
type Props = {
  label: string;
  icon: PixelIconName;
  // "desktop": white label over wallpaper; "folder": dark label on a white panel.
  variant: "desktop" | "folder";
  selected?: boolean;
  // Phones open on one tap; desktops select on click and open on double-click.
  openOnSingleClick?: boolean;
  onSelect?: () => void;
  onOpen: () => void;
};

/**
 * A desktop-style icon. Touch taps, Enter and assistive-tech clicks open it; Space selects it.
 * Mouse clicks select on desktop (double-click opens) and open on phones.
 */
export function IconButton({ label, icon, variant, selected, openOnSingleClick, onSelect, onOpen }: Props) {
  // How the last press started: touch screens can't rely on double-click (iOS may not send it).
  const pointerType = useRef<string>("mouse");
  // Set while Space is down: Firefox still fires a click on keyup, which must only select.
  const spacePressed = useRef(false);

  return (
    <button
      type="button"
      className={`${styles.icon} ${styles[variant]} ${selected ? styles.selected : ""}`}
      onPointerDown={(event) => {
        pointerType.current = event.pointerType;
      }}
      onClick={(event) => {
        // A click caused by Space only selects, whatever its detail says.
        const fromSpace = spacePressed.current;
        spacePressed.current = false;
        if (fromSpace) return onSelect?.();
        // Phones, touch/pen taps and screen-reader clicks (detail 0) open; mouse clicks select.
        const touch = event.detail > 0 && pointerType.current !== "mouse";
        if (openOnSingleClick || touch || event.detail === 0) onOpen();
        else onSelect?.();
      }}
      onDoubleClick={() => {
        if (!openOnSingleClick && pointerType.current === "mouse") onOpen();
      }}
      onKeyDown={(event) => {
        // Enter would normally fire click (select); make it open, once per press.
        if (event.key === "Enter") {
          event.preventDefault();
          if (event.repeat) return;
          onOpen();
        }
        // Space only selects; cancel its click where the browser allows and mark any that still comes.
        if (event.key === " " && !openOnSingleClick) {
          event.preventDefault();
          spacePressed.current = true;
          onSelect?.();
        }
      }}
      onKeyUp={(event) => {
        // Clear the Space mark after Firefox's keyup click has been handled (or never came).
        if (event.key === " ") setTimeout(() => (spacePressed.current = false), 0);
      }}
      onBlur={() => {
        // Focus left mid-press, so this icon's keyup will never arrive; drop the mark.
        spacePressed.current = false;
      }}
    >
      <PixelIcon name={icon} size={32} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
