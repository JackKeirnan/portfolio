"use client";

import { useEffect, useState } from "react";

/** Below this width JackOS switches to phone mode. */
export const PHONE_QUERY = "(max-width: 767px)";

/**
 * True on phone-sized screens. Starts false so server and first client render
 * match (desktop markup), then switches after hydration.
 */
export function useIsPhone(): boolean {
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    // Watch the width query so rotating or resizing the window switches modes.
    const query = window.matchMedia(PHONE_QUERY);
    const update = () => setIsPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isPhone;
}

/** True when the visitor asked the OS for less motion; used to skip the boot animation. */
export function prefersReducedMotion(): boolean {
  // Read the OS preference at call time, not at module load.
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
