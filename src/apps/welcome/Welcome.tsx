"use client";

import { developer } from "@/data/portfolio";
import type { AppId } from "@/os/apps";
import { useWindowManager } from "@/os/WindowManagerProvider";
import styles from "../apps.module.css";

// fast path for recruiters - the four things most visitors want
const QUICK_LINKS: { appId: AppId; label: string }[] = [
  { appId: "about", label: "About Me" },
  { appId: "projects", label: "My Projects" },
  { appId: "cv", label: "CV" },
  { appId: "contact", label: "Contact" },
];

/** first-visit window - short intro + one-click links to the key sections */
export function Welcome() {
  const wm = useWindowManager();
  const firstName = developer.name.split(" ")[0];

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>{developer.intro.heading} I&apos;m {firstName}.</h1>
      <p className={styles.paragraph}>{developer.intro.paragraphs[0]}</p>
      <div className={styles.buttons}>
        {QUICK_LINKS.map((link) => (
          <button key={link.appId} type="button" className="os-raised os-button" onClick={() => wm.open({ appId: link.appId })}>
            {link.label}
          </button>
        ))}
      </div>
      <p className={styles.hint}>
        {wm.isPhone
          ? "Tip: tap an icon on the home screen to open it."
          : "Tip: double-click desktop icons to open them, or use the JackOS menu."}{" "}
        Prefer plain text? <a href="/plain">Plain view</a>.
      </p>
    </div>
  );
}
