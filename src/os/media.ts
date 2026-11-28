"use client";

import { useEffect, useState } from "react";

/** below this width JackOS switches to phone mode */
export const PHONE_QUERY = "(max-width: 767px)";

/**
 * true on phone-sized screens. starts false so server and first client render
 * match (desktop markup), then switches after hydration
 */
export function useIsPhone(): boolean {
  const [isPhone, setIsPhone] = useState(false);
  useEffect(() => {
    // watch the width query so rotating or resizing the window switches modes
    const query = window.matchMedia(PHONE_QUERY);
    const update = () => setIsPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isPhone;
}

/** true when the visitor asked the OS for less motion, used to skip the boot animation */
export function prefersReducedMotion(): boolean {
  // read the OS preference at call time, not on module load
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
