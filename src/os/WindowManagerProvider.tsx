"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { OpenRequest } from "./apps";
import { useIsPhone } from "./media";
import { initialState, wmReducer, type Viewport, type WMState } from "./windowManager";

/** has to match --os-taskbar-height in theme.css */
export const TASKBAR_HEIGHT = 36;

/** current usable desktop area - browser window minus the taskbar */
export function getViewport(): Viewport {
  return { width: window.innerWidth, height: window.innerHeight - TASKBAR_HEIGHT };
}

/** window-changing calls apps can make, each dispatches one reducer action */
type Actions = {
  open(request: OpenRequest): void;
  close(id: string): void;
  focus(id: string): void;
  minimize(id: string): void;
  toggleMaximize(id: string): void;
  move(id: string, x: number, y: number): void;
  resize(id: string, w: number, h: number): void;
  closeAll(): void;
  truncate(keep: number): void;
};

/** what apps and shells use to read and change windows */
export type WindowManager = Actions & { state: WMState; isPhone: boolean };

const WindowManagerContext = createContext<WindowManager | null>(null);

/** owns window state for one JackOS instance, `initial` comes from the URL */
export function WindowManagerProvider({ initial, children }: { initial: OpenRequest[]; children: ReactNode }) {
  const [state, dispatch] = useReducer(wmReducer, initial, initialState);
  // false on first render so it matches the server html
  const isPhone = useIsPhone();

  // actions never change identity so effects can safely depend on them
  const actions = useMemo<Actions>(
    () => ({
      open: (request) => dispatch({ type: "open", request, viewport: getViewport() }),
      close: (id) => dispatch({ type: "close", id }),
      focus: (id) => dispatch({ type: "focus", id }),
      minimize: (id) => dispatch({ type: "minimize", id }),
      toggleMaximize: (id) => dispatch({ type: "toggleMaximize", id }),
      move: (id, x, y) => dispatch({ type: "move", id, x, y, viewport: getViewport() }),
      resize: (id, w, h) => dispatch({ type: "resize", id, w, h, viewport: getViewport() }),
      closeAll: () => dispatch({ type: "closeAll" }),
      truncate: (keep) => dispatch({ type: "truncate", keep }),
    }),
    [],
  );

  // re-fit windows to the real viewport after hydration and on every resize
  useEffect(() => {
    const fit = () => dispatch({ type: "fit", viewport: getViewport() });
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const value = useMemo<WindowManager>(() => ({ ...actions, state, isPhone }), [actions, state, isPhone]);
  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

/** needs to be inside WindowManagerProvider */
export function useWindowManager(): WindowManager {
  const manager = useContext(WindowManagerContext);
  if (!manager) throw new Error("useWindowManager must be used inside WindowManagerProvider");
  return manager;
}
