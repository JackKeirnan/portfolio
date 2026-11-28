"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BootScreen.module.css";

/** startup tips, one shown per boot */
const BOOT_TIPS = [
  "double-click a desktop icon to open it.",
  "right-click the desktop for more options.",
  "type 'help' in the Terminal.",
  "turn on sound from the taskbar tray.",
  "switch on dark mode in Display Settings.",
];

/** which sequence to show, whether it's the short returning-visitor boot, and the done callback */
type Props = { mode: "boot" | "shutdown"; short: boolean; onDone: () => void };

/** full-screen boot or shutdown sequence, boot can be skipped with any key, click or tap */
export function BootScreen({ mode, short, onDone }: Props) {
  const duration = mode === "boot" && short ? 1000 : 2000;
  // timer and skip can both fire, only the first one counts
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
    // only boot is skippable, the shutdown joke is short anyway
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

  // fake BIOS memory test counting up to 640K over the first half of the boot
  const [memory, setMemory] = useState(0);
  useEffect(() => {
    if (mode !== "boot") return;
    const timer = setInterval(() => setMemory((kb) => Math.min(640, kb + 64)), duration / 20);
    return () => clearInterval(timer);
  }, [mode, duration]);
  // one tip per boot, picked once so re-renders don't reshuffle it
  const [tip] = useState(() => BOOT_TIPS[Math.floor(Math.random() * BOOT_TIPS.length)]);

  return (
    <div className={styles.screen} data-testid="boot-screen" role="status" aria-live="polite">
      {mode === "boot" && (
        <p className={styles.bios}>
          JackOS BIOS v1.0 - Memory test: {memory}K{memory === 640 ? " OK" : ""}
        </p>
      )}
      <div className={styles.logo}>Jack<span>OS</span></div>
      {mode === "boot" ? (
        <>
          <div className={styles.progress}><div className={styles.bar} style={{ animationDuration: `${duration}ms` }} /></div>
          <p className={styles.message}>Starting up. Press any key to skip.</p>
          <p className={styles.tip}>Tip: {tip}</p>
        </>
      ) : (
        <p className={styles.message}>JackOS is shutting down... see you soon.</p>
      )}
    </div>
  );
}
