"use client";

import { Component, type ReactNode } from "react";
import styles from "@/apps/apps.module.css";
import { PixelIcon } from "./PixelIcon";

/** window title for the error, how to close the window, and the app to guard */
type Props = { title: string; onClose: () => void; children: ReactNode };
/** whether a child threw and the error view should show */
type State = { failed: boolean };

/**
 * stops one crashing app taking down the desktop - that window shows a
 * themed error instead and the rest of JackOS keeps running
 */
export class WindowErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  /** log the crash so it still shows up in the browser console */
  componentDidCatch(error: unknown) {
    console.error(error);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div role="alert" className={styles.alert}>
        <PixelIcon name="error" size={32} />
        <div>
          <p className={styles.paragraph}><strong>JackOS: this program has stopped working</strong></p>
          <p className={styles.paragraph}>{this.props.title} ran into a problem and had to stop.</p>
          <button type="button" className="os-raised os-button" onClick={this.props.onClose}>Close</button>
        </div>
      </div>
    );
  }
}
