"use client";

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
 * A desktop-style icon. Enter and assistive-tech clicks (detail 0) open it; Space selects it.
 * Mouse clicks select on desktop and open on phones.
 */
export function IconButton({ label, icon, variant, selected, openOnSingleClick, onSelect, onOpen }: Props) {
  // Combine base, variant and selected classes into one className.
  return (
    <button
      type="button"
      className={`${styles.icon} ${styles[variant]} ${selected ? styles.selected : ""}`}
      // Screen readers click with detail 0 and no keydown, so treat that as "open".
      onClick={(event) => (openOnSingleClick || event.detail === 0 ? onOpen() : onSelect?.())}
      onDoubleClick={() => {
        if (!openOnSingleClick) onOpen();
      }}
      onKeyDown={(event) => {
        // Enter would normally fire click (select); make it open, once per press.
        if (event.key === "Enter") {
          event.preventDefault();
          if (event.repeat) return;
          onOpen();
        }
        // Space only selects; cancel its synthesised click so it does not open.
        if (event.key === " " && !openOnSingleClick) {
          event.preventDefault();
          onSelect?.();
        }
      }}
    >
      <PixelIcon name={icon} size={32} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
