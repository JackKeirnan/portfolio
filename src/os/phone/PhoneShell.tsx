"use client";

import { AppContent } from "../appComponents";
import { APPS, windowTitle } from "../apps";
import { IconButton } from "../IconButton";
import { Clock, SoundToggle } from "../Tray";
import { WindowErrorBoundary } from "../WindowErrorBoundary";
import { stackOrder } from "../windowManager";
import { useWindowManager } from "../WindowManagerProvider";
import styles from "./PhoneShell.module.css";

/** Phone-OS mode: icon grid home screen; apps open full-screen as a stack. */
export function PhoneShell({ onBack, onHome }: { onBack: () => void; onHome: () => void }) {
  const wm = useWindowManager();
  const stack = stackOrder(wm.state);
  const top = stack.at(-1) ?? null;

  return (
    <div className={styles.phone}>
      <header className={`${styles.statusBar} os-raised`}>
        <span>JackOS</span>
        <Clock />
      </header>

      <main className={styles.screen}>
        <nav aria-label="Apps" className={styles.grid} hidden={top !== null}>
          {APPS.filter((app) => app.inStartMenu).map((app) => (
            <IconButton
              key={app.id}
              variant="desktop"
              label={app.title}
              icon={app.icon}
              openOnSingleClick
              onOpen={() => wm.open({ appId: app.id })}
            />
          ))}
        </nav>

        {/* Lower screens stay mounted (hidden) so going back keeps their state. */}
        {stack.map((win) => {
          const title = windowTitle(win.appId, win.params);
          const titleId = `phone-title-${win.id}`;
          return (
            <section key={win.id} role="dialog" aria-labelledby={titleId} className={styles.app} hidden={win.id !== top?.id}>
              <div className={styles.appTitle}>
                <button type="button" className={`os-raised ${styles.back}`} aria-label="Back" onClick={onBack}>&lt;</button>
                <span id={titleId}>{title}</span>
              </div>
              <div className={styles.appBody}>
                <div className={`os-sunken ${styles.panel}`}>
                  <WindowErrorBoundary title={title} onClose={() => wm.close(win.id)}>
                    <AppContent appId={win.appId} params={win.params} />
                  </WindowErrorBoundary>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <footer className={`${styles.bottomBar} os-raised`}>
        <button type="button" className={`os-raised ${styles.home}`} onClick={onHome}>Home</button>
        <SoundToggle />
      </footer>
    </div>
  );
}
