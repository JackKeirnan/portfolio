import { getAppMeta, type AppId, type AppParams, type OpenRequest } from "./apps";

/** Usable desktop area in px (browser window minus the taskbar). */
export type Viewport = { width: number; height: number };

/** One open window. Position and size are ignored in phone mode. */
export type WindowState = {
  id: string;
  appId: AppId;
  params?: AppParams;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

/** Everything the window manager tracks. */
export type WMState = { windows: WindowState[]; focusedId: string | null };

/** Every change the window manager supports. Viewport-dependent actions carry it so the reducer stays pure. */
export type WMAction =
  | { type: "open"; request: OpenRequest; viewport: Viewport }
  | { type: "close"; id: string }
  | { type: "focus"; id: string }
  | { type: "minimize"; id: string }
  | { type: "toggleMaximize"; id: string }
  | { type: "move"; id: string; x: number; y: number; viewport: Viewport }
  | { type: "resize"; id: string; w: number; h: number; viewport: Viewport }
  | { type: "fit"; viewport: Viewport }
  | { type: "closeAll" }
  | { type: "truncate"; keep: number };

// Used for server rendering and the first client render, so both match.
export const DEFAULT_VIEWPORT: Viewport = { width: 1280, height: 764 };
export const MIN_WINDOW_SIZE = { w: 240, h: 160 };
export const TITLE_BAR_HEIGHT = 28;
// A window can slide off-screen, but this much of it always stays grabbable.
export const MIN_VISIBLE_WIDTH = 80;
export const EMPTY_STATE: WMState = { windows: [], focusedId: null };

// New windows start right of the desktop icon column and cascade.
const ICON_COLUMN_WIDTH = 104;
const TOP_MARGIN = 16;
const CASCADE_STEP = 24;

/** Window id: the app id, plus the instance key's value for per-item apps. */
export function windowId(request: OpenRequest): string {
  // Per-item apps (like projects) name the param that makes each window unique.
  const key = getAppMeta(request.appId).instanceKey;
  const value = key ? request.params?.[key] : undefined;
  return value ? `${request.appId}:${value}` : request.appId;
}

/** Keeps a size between the minimum and the viewport. */
function clampSize(w: number, h: number, viewport: Viewport) {
  return {
    w: Math.max(MIN_WINDOW_SIZE.w, Math.min(w, viewport.width)),
    h: Math.max(MIN_WINDOW_SIZE.h, Math.min(h, viewport.height)),
  };
}

/** Keeps enough of the title bar on screen to drag the window back. */
function clampPosition(x: number, y: number, w: number, viewport: Viewport) {
  return {
    x: Math.min(Math.max(x, MIN_VISIBLE_WIDTH - w), viewport.width - MIN_VISIBLE_WIDTH),
    y: Math.min(Math.max(y, 0), Math.max(0, viewport.height - TITLE_BAR_HEIGHT)),
  };
}

/** Next z-index above every open window. */
function nextZ(windows: WindowState[]): number {
  return windows.reduce((max, w) => Math.max(max, w.z), 0) + 1;
}

/** Id of the highest visible window, which should get focus next. */
function topVisibleId(windows: WindowState[]): string | null {
  const visible = windows.filter((w) => !w.minimized).sort((a, b) => b.z - a.z);
  return visible[0]?.id ?? null;
}

/** Windows from bottom to top. Phone mode treats this as its navigation stack. */
export function stackOrder(state: WMState): WindowState[] {
  return [...state.windows].sort((a, b) => a.z - b.z);
}

/** Applies one action. Unknown window ids leave the state untouched. */
export function wmReducer(state: WMState, action: WMAction): WMState {
  switch (action.type) {
    case "open": {
      // An app that is already open is focused, not duplicated.
      const id = windowId(action.request);
      if (state.windows.some((w) => w.id === id)) return wmReducer(state, { type: "focus", id });

      // Size from the registry, then cascade, keeping the whole window in view when it fits.
      const meta = getAppMeta(action.request.appId);
      const size = clampSize(meta.defaultSize.w, meta.defaultSize.h, action.viewport);
      const step = CASCADE_STEP * (state.windows.length % 8);
      const x = Math.max(0, Math.min(ICON_COLUMN_WIDTH + step, action.viewport.width - size.w));
      const y = Math.max(0, Math.min(TOP_MARGIN + step, action.viewport.height - size.h));

      const opened: WindowState = {
        id,
        appId: action.request.appId,
        params: action.request.params,
        x,
        y,
        ...size,
        z: nextZ(state.windows),
        minimized: false,
        maximized: false,
      };
      return { windows: [...state.windows, opened], focusedId: id };
    }

    case "focus": {
      const target = state.windows.find((w) => w.id === action.id);
      if (!target) return state;
      // Raise above everything and restore it if minimised.
      const z = nextZ(state.windows);
      return {
        windows: state.windows.map((w) => (w.id === action.id ? { ...w, z, minimized: false } : w)),
        focusedId: action.id,
      };
    }

    case "close": {
      if (!state.windows.some((w) => w.id === action.id)) return state;
      // Drop the window, then hand focus to the top visible one if it had focus.
      const windows = state.windows.filter((w) => w.id !== action.id);
      const focusedId = state.focusedId === action.id ? topVisibleId(windows) : state.focusedId;
      return { windows, focusedId };
    }

    case "minimize": {
      // Unknown or already-minimised windows change nothing.
      const target = state.windows.find((w) => w.id === action.id);
      if (!target || target.minimized) return state;
      // Hide the window, then move focus off it if it had focus.
      const windows = state.windows.map((w) => (w.id === action.id ? { ...w, minimized: true } : w));
      const focusedId = state.focusedId === action.id ? topVisibleId(windows) : state.focusedId;
      return { windows, focusedId };
    }

    case "toggleMaximize": {
      const target = state.windows.find((w) => w.id === action.id);
      if (!target) return state;
      // Maximising also brings the window to the front.
      const focused = wmReducer(state, { type: "focus", id: action.id });
      return {
        ...focused,
        windows: focused.windows.map((w) => (w.id === action.id ? { ...w, maximized: !w.maximized } : w)),
      };
    }

    case "move": {
      // Unknown ids change nothing.
      if (!state.windows.some((w) => w.id === action.id)) return state;
      // Clamp the dragged position so the title bar stays reachable.
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, ...clampPosition(action.x, action.y, w.w, action.viewport) } : w,
        ),
      };
    }

    case "resize": {
      // Unknown ids change nothing.
      if (!state.windows.some((w) => w.id === action.id)) return state;
      // Clamp the size, then re-clamp the position: a wider-to-narrower resize moves the left bound.
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w;
          const size = clampSize(action.w, action.h, action.viewport);
          return { ...w, ...size, ...clampPosition(w.x, w.y, size.w, action.viewport) };
        }),
      };
    }

    case "fit": {
      // Re-clamp everything after the browser window changes size.
      return {
        ...state,
        windows: state.windows.map((w) => {
          const size = clampSize(w.w, w.h, action.viewport);
          return { ...w, ...size, ...clampPosition(w.x, w.y, size.w, action.viewport) };
        }),
      };
    }

    case "closeAll":
      // Reset to the empty state.
      return EMPTY_STATE;

    case "truncate": {
      // Keep the bottom `keep` windows of the stack; used by phone back navigation.
      const kept = stackOrder(state).slice(0, Math.max(0, action.keep));
      if (kept.length === state.windows.length) return state;
      return { windows: kept, focusedId: topVisibleId(kept) };
    }
  }
}

/** State for the windows a URL asks for, opened in order. */
export function initialState(requests: OpenRequest[], viewport: Viewport = DEFAULT_VIEWPORT): WMState {
  return requests.reduce((state, request) => wmReducer(state, { type: "open", request, viewport }), EMPTY_STATE);
}
