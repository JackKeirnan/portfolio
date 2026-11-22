"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { developer, projects } from "@/data/portfolio";
import { useWindowManager } from "@/os/WindowManagerProvider";
import { runCommand, type TerminalContext } from "./commands";
import styles from "../apps.module.css";

const PROMPT = "jack@jackos ~ $";
const BANNER = ["JackOS Terminal", "Type 'help' to see what I can do.", ""];
// Tappable shortcuts on phones, where typing is awkward.
const QUICK_COMMANDS = ["help", "whoami", "ls projects", "contact", "clear"];

const CONTEXT: TerminalContext = {
  projects: projects.map(({ slug, title }) => ({ slug, title })),
  whoami: developer.terminal.whoami,
  contact: developer.contact.links.map(({ label, href }) => ({ label, href })),
};

/** A small fake shell; `open` drives the real window manager. */
export function Terminal() {
  const wm = useWindowManager();
  const [lines, setLines] = useState<string[]>(BANNER);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Keep the newest output in view.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  /** Echoes a command, prints its output, then applies any action. */
  function run(command: string) {
    const result = runCommand(command, CONTEXT);
    if (result.action?.type === "clear") {
      setLines([]);
      return;
    }
    setLines((previous) => [...previous, `${PROMPT} ${command}`, ...result.lines]);
    if (result.action?.type === "open") wm.open(result.action.request);
  }

  /** Runs the typed command and clears the field. */
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    run(input);
    setInput("");
  }

  return (
    // Clicking anywhere in the terminal focuses the input, like a real console.
    <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
      <pre className={styles.terminalOutput} aria-live="polite">{lines.join("\n")}</pre>
      <form className={styles.prompt} onSubmit={onSubmit}>
        <label htmlFor="terminal-input">{PROMPT}</label>
        <input
          id="terminal-input"
          ref={inputRef}
          className={styles.terminalInput}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </form>
      {wm.isPhone && (
        <div className={styles.commandBar}>
          {QUICK_COMMANDS.map((command) => (
            <button key={command} type="button" className="os-raised os-button" onClick={() => run(command)}>{command}</button>
          ))}
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
