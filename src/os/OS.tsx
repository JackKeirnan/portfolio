"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BootScreen } from "./BootScreen";
import { Desktop } from "./desktop/Desktop";
import { Taskbar } from "./desktop/Taskbar";
import { prefersReducedMotion } from "./media";
import { IDLE_MS, Screensaver, useIdle } from "./Screensaver";
import { PhoneShell } from "./phone/PhoneShell";
import { initialWindowsForPath } from "./routes";
import { SettingsProvider, useSettings } from "./settings";
import { readSetting, STORAGE_KEYS, writeSetting } from "./storage";
import { useUrlSync } from "./useUrlSync";
import { useWindowManager, WindowManagerProvider } from "./WindowManagerProvider";
import { windowSoundFor } from "./windowSounds";
import styles from "./OS.module.css";

/**
 * plays a sound on every window open, close, minimise or maximise (silent unless sound is on)
 * and returns true for a moment after a window opens, so the hourglass cursor shows
 */
function useWindowFeedback(): boolean {
  const { state } = useWindowManager();
  const { play } = useSettings();
  const previous = useRef(state);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const sound = windowSoundFor(previous.current, state);
    if (sound) play(sound);
    previous.current = state;
    if (sound !== "open" && sound !== "error") return;
    setBusy(true);
    const timer = setTimeout(() => setBusy(false), 350);
    return () => clearTimeout(timer);
  }, [state, play]);
  return busy;
}

/** picks the desktop or phone shell, runs boot, shutdown and URL sync */
function Shell({ isHome }: { isHome: boolean }) {
  const wm = useWindowManager();
  const { wallpaper, play } = useSettings();
  const { back, home } = useUrlSync();
  const [phase, setPhase] = useState<"desktop" | "boot" | "shutdown">("desktop");
  // Welcome only opens after the very first boot, not after a joke reboot
  const showWelcomeAfterBoot = useRef(false);
  const busy = useWindowFeedback();
  // screensaver only on the desktop, never mid-boot, and not for visitors who asked for less motion
  const [calm] = useState(() => typeof window !== "undefined" && prefersReducedMotion());
  const idle = useIdle(IDLE_MS, !wm.isPhone && phase === "desktop" && !calm);

  // first visit to "/" boots then opens Welcome, deep links and returning visitors skip both
  useEffect(() => {
    if (!isHome || readSetting(STORAGE_KEYS.visited, false)) return;
    writeSetting(STORAGE_KEYS.visited, true);
    if (prefersReducedMotion()) {
      wm.open({ appId: "welcome" });
      return;
    }
    showWelcomeAfterBoot.current = true;
    setPhase("boot");
    // mount-only - isHome is fixed for the life of the page and wm.open is stable
  }, []);

  /** boot finished or skipped */
  const finishBoot = useCallback(() => {
    setPhase("desktop");
    play("startup");
    // only the first-ever boot opens Welcome, and only once
    if (showWelcomeAfterBoot.current) {
      showWelcomeAfterBoot.current = false;
      wm.open({ appId: "welcome" });
    }
  }, [play, wm]);

  /** shutdown joke done - clear the desktop and boot again */
  const finishShutdown = useCallback(() => {
    wm.closeAll();
    setPhase("boot");
  }, [wm]);

  return (
    <div className={styles.root} data-wallpaper={wallpaper} data-busy={busy}>
      <a className={styles.skipLink} href="/plain">Skip to plain text version</a>
      {wm.isPhone ? (
        <PhoneShell onBack={back} onHome={home} />
      ) : (
        <>
          <Desktop />
          <Taskbar onShutDown={() => setPhase("shutdown")} />
        </>
      )}
      {idle && <Screensaver />}
      {phase !== "desktop" && (
        <BootScreen mode={phase} short={wm.isPhone} onDone={phase === "boot" ? finishBoot : finishShutdown} />
      )}
    </div>
  );
}

/**
 * JackOS, mounted once per page. the URL it loads on decides which windows
 * start open, later URL changes come from the window manager, not the router
 */
export function OS() {
  const pathname = usePathname();
  // read the URL once - replaceState updates pathname but mustn't reset windows
  const [initial] = useState(() => initialWindowsForPath(pathname));
  const [isHome] = useState(pathname === "/");

  return (
    <SettingsProvider>
      <WindowManagerProvider initial={initial}>
        <Shell isHome={isHome} />
      </WindowManagerProvider>
    </SettingsProvider>
  );
}
