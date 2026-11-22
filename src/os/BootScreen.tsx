"use client";

import { useEffect, useRef } from "react";
import styles from "./BootScreen.module.css";

type Props = { mode: "boot" | "shutdown"; short: boolean; onDone: () => void };

/** Full-screen boot or shutdown sequence. Boot can be skipped with any key, click or tap. */
export function BootScreen({ mode, short, onDone }: Props) {
  const duration = mode === "boot" && short ? 1000 : 2000;
  // Timer and skip can both fire; only the first one counts.
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    doneRef.current = false;
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDoneRef.current();
    };
    const timer = setTimeout(finish, duration);
    // Only the boot is skippable; the shutdown joke is short anyway.
    if (mode === "boot") {
      window.addEventListener("keydown", finish);
      window.addEventListener("pointerdown", finish);
    }
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };
  }, [mode, duration]);

  return (
    <div className={styles.screen} data-testid="boot-screen" role="status" aria-live="polite">
      <div className={styles.logo}>Jack<span>OS</span></div>
      {mode === "boot" ? (
        <>
          <div className={styles.progress}><div className={styles.bar} style={{ animationDuration: `${duration}ms` }} /></div>
          <p className={styles.message}>Starting up. Press any key to skip.</p>
        </>
      ) : (
        <p className={styles.message}>JackOS is shutting down... see you soon.</p>
      )}
    </div>
  );
}
