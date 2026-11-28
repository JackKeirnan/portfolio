"use client";

import { useEffect, useRef, useState } from "react";
import { bounceStep } from "./geometry";
import styles from "./Screensaver.module.css";

/** how long the desktop sits untouched before the screensaver starts */
export const IDLE_MS = 60_000;

// anything the visitor does counts as activity and wakes the screen
const ACTIVITY = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"] as const;

/** true once nobody has touched the page for `ms`; any input sets it back to false */
export function useIdle(ms: number, enabled: boolean): boolean {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    let timer = setTimeout(() => setIdle(true), ms);
    const wake = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), ms);
    };
    for (const name of ACTIVITY) window.addEventListener(name, wake, { passive: true });
    return () => {
      clearTimeout(timer);
      for (const name of ACTIVITY) window.removeEventListener(name, wake);
    };
  }, [ms, enabled]);
  return enabled && idle;
}

/** full-screen black screensaver with the JackOS logo bouncing around, DVD-player style */
export function Screensaver() {
  const logoRef = useRef<HTMLDivElement>(null);

  // move the logo every frame, bouncing off the edges of the window
  useEffect(() => {
    let logo = { x: Math.random() * 200, y: Math.random() * 200, dx: 2, dy: 1.5 };
    let frame = requestAnimationFrame(function tick() {
      const element = logoRef.current;
      if (element) {
        logo = bounceStep(logo, window.innerWidth - element.offsetWidth, window.innerHeight - element.offsetHeight);
        element.style.transform = `translate(${logo.x}px, ${logo.y}px)`;
      }
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={styles.screen} data-testid="screensaver" aria-hidden="true">
      <div ref={logoRef} className={styles.logo}>Jack<span>OS</span></div>
    </div>
  );
}
