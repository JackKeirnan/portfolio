"use client";

import { PixelIcon } from "./PixelIcon";
import type { PixelIconName } from "./pixelIcons";
import styles from "./IconButton.module.css";

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

/** A desktop-style icon. Enter opens it from the keyboard; Space selects it. */
export function IconButton({ label, icon, variant, selected, openOnSingleClick, onSelect, onOpen }: Props) {
  // Combine base, variant and selected classes into one className.
  return (
    <button
      type="button"
      className={`${styles.icon} ${styles[variant]} ${selected ? styles.selected : ""}`}
      onClick={() => (openOnSingleClick ? onOpen() : onSelect?.())}
      onDoubleClick={() => {
        if (!openOnSingleClick) onOpen();
      }}
      onKeyDown={(event) => {
        // Enter would normally fire click (select); make it open instead.
        if (event.key === "Enter") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <PixelIcon name={icon} size={36} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
