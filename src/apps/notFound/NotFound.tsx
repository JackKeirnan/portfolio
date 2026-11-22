"use client";

import { PixelIcon } from "@/os/PixelIcon";
import { useWindowManager } from "@/os/WindowManagerProvider";
import styles from "../apps.module.css";

/** Shown for unknown URLs and missing projects. */
export function NotFound() {
  const wm = useWindowManager();
  // Error message plus a way back to the project list.
  return (
    <div role="alert" className={styles.alert}>
      <PixelIcon name="error" size={32} />
      <div>
        <p className={styles.paragraph}><strong>File not found</strong></p>
        <p className={styles.paragraph}>The file or folder you are looking for doesn&apos;t exist. It may have been moved or renamed.</p>
        <div className={styles.buttons}>
          <button type="button" className="os-raised os-button" onClick={() => wm.open({ appId: "projects" })}>
            Open My Projects
          </button>
        </div>
      </div>
    </div>
  );
}
