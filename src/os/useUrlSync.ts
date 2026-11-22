"use client";

import { useCallback, useEffect, useRef } from "react";
import { windowTitle } from "./apps";
import { pathForWindow } from "./routes";
import { stackOrder } from "./windowManager";
import { useWindowManager } from "./WindowManagerProvider";

// Saved in each history entry on phones so back/forward can restore the stack.
type PhoneHistoryState = { jackosDepth?: number; jackosPushed?: boolean };

/**
 * Keeps the address bar and tab title in step with the visible window.
 * Next.js patches history.pushState/replaceState, so its own state is kept.
 */
export function useUrlSync(): { back: () => void; home: () => void } {
  const { state, isPhone, close, closeAll, truncate } = useWindowManager();
  const stack = stackOrder(state);
  // Phones show the top of the stack; desktops reflect the focused window.
  const visible = isPhone ? stack.at(-1) ?? null : state.windows.find((w) => w.id === state.focusedId) ?? null;
  const path = pathForWindow(visible);
  const title = visible ? windowTitle(visible.appId, visible.params) : null;
  const topId = stack.at(-1)?.id ?? null;
  const depth = stack.length;
  const depthRef = useRef(depth);

  // Write URL and title whenever the visible window or stack depth changes.
  useEffect(() => {
    const grew = depth > depthRef.current;
    depthRef.current = depth;
    // Null path (File not found) keeps whatever URL the visitor typed.
    const url = path ?? window.location.pathname;
    if (isPhone && grew) {
      window.history.pushState({ jackosDepth: depth, jackosPushed: true }, "", url);
    } else {
      const current = (window.history.state ?? {}) as PhoneHistoryState;
      window.history.replaceState(isPhone ? { ...current, jackosDepth: depth } : current, "", url);
    }
    document.title = title ? `${title} | Jack Keirnan` : "Jack Keirnan | JackOS";
  }, [isPhone, path, title, depth]);

  // Phone: browser back/forward restores the stack depth saved in that entry.
  useEffect(() => {
    if (!isPhone) return;
    const onPopState = (event: PopStateEvent) => {
      const saved = (event.state ?? {}) as PhoneHistoryState;
      truncate(saved.jackosDepth ?? 0);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [isPhone, truncate]);

  /** On-screen Back: uses browser history for entries we pushed, so both back buttons agree. */
  const back = useCallback(() => {
    const saved = (window.history.state ?? {}) as PhoneHistoryState;
    if (saved.jackosPushed) window.history.back();
    else if (topId) close(topId);
  }, [topId, close]);

  /** On-screen Home: closes every app. */
  const home = useCallback(() => closeAll(), [closeAll]);

  return { back, home };
}
