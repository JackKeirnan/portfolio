import type { SoundName } from "./sound";
import type { WMState } from "./windowManager";

/**
 * picks the sound for one window-manager change, or null for silent ones
 * (moves, focus). pure so the rules get unit-tested without audio
 */
export function windowSoundFor(previous: WMState, next: WMState): SoundName | null {
  // index the old windows so each new one can be compared to its past self
  const before = new Map(previous.windows.map((win) => [win.id, win]));
  const after = new Set(next.windows.map((win) => win.id));

  // new window - File not found gets the error sound, everything else gets the open sound
  const opened = next.windows.find((win) => !before.has(win.id));
  if (opened) return opened.appId === "notFound" ? "error" : "open";

  if (previous.windows.some((win) => !after.has(win.id))) return "close";

  // same windows - look for minimise, restore and maximise changes
  for (const win of next.windows) {
    const old = before.get(win.id);
    if (!old) continue;
    if (!old.minimized && win.minimized) return "minimize";
    if (old.minimized && !win.minimized) return "open";
    if (old.maximized !== win.maximized) return "maximize";
  }
  return null;
}
