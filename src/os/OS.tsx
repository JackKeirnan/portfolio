"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BootScreen } from "./BootScreen";
import { Desktop } from "./desktop/Desktop";
import { Taskbar } from "./desktop/Taskbar";
import { prefersReducedMotion } from "./media";
import { PhoneShell } from "./phone/PhoneShell";
import { initialWindowsForPath } from "./routes";
import { SettingsProvider, useSettings } from "./settings";
import { readSetting, STORAGE_KEYS, writeSetting } from "./storage";
import { useUrlSync } from "./useUrlSync";
import { useWindowManager, WindowManagerProvider } from "./WindowManagerProvider";
import styles from "./OS.module.css";

/** Plays open/close sounds as windows come and go (silent unless sound is on). */
function useWindowSounds() {
  const { state } = useWindowManager();
  const { play } = useSettings();
  const count = state.windows.length;
  const previous = useRef(count);
  useEffect(() => {
    // More windows than last time means one opened; fewer means one closed.
    if (count > previous.current) play("open");
    else if (count < previous.current) play("close");
    // Remember this count for the next change.
    previous.current = count;
  }, [count, play]);
}

/** Picks the desktop or phone shell and runs boot, shutdown and URL sync. */
function Shell({ isHome }: { isHome: boolean }) {
  const wm = useWindowManager();
  const { wallpaper, play } = useSettings();
  const { back, home } = useUrlSync();
  const [phase, setPhase] = useState<"desktop" | "boot" | "shutdown">("desktop");
  // Welcome opens only after the very first boot, not after a joke reboot.
  const showWelcomeAfterBoot = useRef(false);
  useWindowSounds();

  // First visit to "/" boots, then opens Welcome. Deep links and returning visitors skip both.
  useEffect(() => {
    if (!isHome || readSetting(STORAGE_KEYS.visited, false)) return;
    writeSetting(STORAGE_KEYS.visited, true);
    if (prefersReducedMotion()) {
      wm.open({ appId: "welcome" });
      return;
    }
    showWelcomeAfterBoot.current = true;
    setPhase("boot");
    // Mount-only: isHome is fixed for the life of the page and wm.open is stable.
  }, []);

  /** Boot finished or skipped. */
  const finishBoot = useCallback(() => {
    // Show the desktop and play the startup jingle.
    setPhase("desktop");
    play("startup");
    // Only the first-ever boot opens Welcome, and only once.
    if (showWelcomeAfterBoot.current) {
      showWelcomeAfterBoot.current = false;
      wm.open({ appId: "welcome" });
    }
  }, [play, wm]);

  /** Shutdown joke finished: clear the desktop and boot again. */
  const finishShutdown = useCallback(() => {
    // Close every window so the reboot starts from an empty desktop.
    wm.closeAll();
    setPhase("boot");
  }, [wm]);

  return (
    <div className={styles.root} data-wallpaper={wallpaper}>
      <a className={styles.skipLink} href="/plain">Skip to plain text version</a>
      {wm.isPhone ? (
        <PhoneShell onBack={back} onHome={home} />
      ) : (
        <>
          <Desktop />
          <Taskbar onShutDown={() => setPhase("shutdown")} />
        </>
      )}
      {phase !== "desktop" && (
        <BootScreen mode={phase} short={wm.isPhone} onDone={phase === "boot" ? finishBoot : finishShutdown} />
      )}
    </div>
  );
}

/**
 * JackOS. Mounted once per page; the URL it loads on decides which windows
 * start open. Later URL changes come from the window manager, not the router.
 */
export function OS() {
  const pathname = usePathname();
  // Read the URL once: replaceState updates pathname, but must not reset windows.
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
