"use client";

import { useEffect, useState } from "react";
import { useSettings } from "./settings";
import styles from "./Tray.module.css";

/** Taskbar/status-bar clock. Empty until mounted so server and client markup match. */
export function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick();
    const timer = setInterval(tick, 15_000);
    return () => clearInterval(timer);
  }, []);
  return <time className={styles.clock}>{time}</time>;
}

/** Sound on/off switch shown in the tray and the phone bottom bar. */
export function SoundToggle() {
  const { soundOn, setSoundOn } = useSettings();
  return (
    <button type="button" className={styles.sound} aria-pressed={soundOn} onClick={() => setSoundOn(!soundOn)}>
      ♪ {soundOn ? "On" : "Off"}
    </button>
  );
}
