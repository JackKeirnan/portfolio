"use client";

import { useCallback, useEffect, useRef } from "react";
import { windowTitle } from "./apps";
import { pathForWindow } from "./routes";
import { stackOrder } from "./windowManager";
import { useWindowManager } from "./WindowManagerProvider";

// saved in each history entry on phones so back/forward can restore the stack
type PhoneHistoryState = { jackosDepth?: number; jackosPushed?: boolean };

/** tab title for the visible window, or the site default if none are open */
function tabTitle(title: string | null): string {
  return title ? `${title} | Jack Keirnan` : "Jack Keirnan | JackOS";
}

/**
 * keeps the address bar and tab title in step with the visible window
 * Next.js patches history.pushState/replaceState so its own state is kept
 */
export function useUrlSync(): { back: () => void; home: () => void } {
  const { state, isPhone, close, closeAll, truncate } = useWindowManager();
  const stack = stackOrder(state);
  // phones show the top of the stack, desktop follows the focused window
  const visible = isPhone ? stack.at(-1) ?? null : state.windows.find((w) => w.id === state.focusedId) ?? null;
  const path = pathForWindow(visible);
  const title = visible ? windowTitle(visible.appId, visible.params) : null;
  const topId = stack.at(-1)?.id ?? null;
  const depth = stack.length;
  const depthRef = useRef(depth);
  // saved depth of the history entry we're on, so popstate can tell Back from Forward
  const entryDepthRef = useRef(0);
  // latest render values so the popstate handler never reads stale ones
  const latestRef = useRef({ depth, path, title });
  latestRef.current = { depth, path, title };

  // write URL and title whenever the visible window or stack depth changes
  useEffect(() => {
    const grew = depth > depthRef.current;
    depthRef.current = depth;
    // null path (File not found) keeps whatever URL the visitor typed
    const url = path ?? window.location.pathname;
    if (isPhone && grew) {
      window.history.pushState({ jackosDepth: depth, jackosPushed: true }, "", url);
    } else {
      const current = (window.history.state ?? {}) as PhoneHistoryState;
      window.history.replaceState(isPhone ? { ...current, jackosDepth: depth } : current, "", url);
    }
    document.title = tabTitle(title);
    // remember where this entry sits, Next.js keeps our keys when it patches history.state
    entryDepthRef.current = ((window.history.state ?? {}) as PhoneHistoryState).jackosDepth ?? 0;
  }, [isPhone, path, title, depth]);

  // browser back/forward - phones restore the saved stack depth, desktop skips phone entries and re-syncs
  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      // work out the direction - a shallower saved depth than the entry we left means Back
      const saved = (event.state ?? {}) as PhoneHistoryState;
      const savedDepth = saved.jackosDepth ?? 0;
      const goingBack = savedDepth < entryDepthRef.current;
      entryDepthRef.current = savedDepth;
      // desktop never pushes so entries left from phone mode are dead, Back skips past them
      if (!isPhone && saved.jackosPushed && goingBack) {
        window.history.back();
        return;
      }
      // desktop otherwise (Forward too) - stay put and point the entry at the focused window
      if (!isPhone) {
        const latest = latestRef.current;
        const { jackosPushed: _dead, ...state } = (window.history.state ?? {}) as PhoneHistoryState & Record<string, unknown>;
        window.history.replaceState(state, "", latest.path ?? window.location.pathname);
        document.title = tabTitle(latest.title);
        return;
      }
      truncate(savedDepth);
      // shrinking is handled by the sync effect, only a stale entry needs fixing here
      const latest = latestRef.current;
      if (savedDepth > latest.depth) {
        window.history.replaceState({ ...(event.state ?? {}), jackosDepth: latest.depth }, "", latest.path ?? window.location.pathname);
        document.title = tabTitle(latest.title);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [isPhone, truncate]);

  /** on-screen Back - uses browser history for entries we pushed so both back buttons agree */
  const back = useCallback(() => {
    const saved = (window.history.state ?? {}) as PhoneHistoryState;
    if (saved.jackosPushed) window.history.back();
    else if (topId) close(topId);
  }, [topId, close]);

  /** on-screen Home, closes every app */
  const home = useCallback(() => closeAll(), [closeAll]);

  return { back, home };
}
