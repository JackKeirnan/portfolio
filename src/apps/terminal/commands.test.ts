import { describe, expect, it } from "vitest";
import { runCommand, type TerminalContext } from "./commands";

const context: TerminalContext = {
  projects: [
    { slug: "atelier-lavender", title: "Atelier Lavender" },
    { slug: "pixel-card-game", title: "Pixel Card Game" },
  ],
  whoami: ["jack keirnan - software developer"],
  contact: [
    { label: "Email", href: "mailto:someone@example.com" },
    { label: "GitHub", href: "https://github.com/example" },
  ],
};

describe("terminal commands", () => {
  it("does nothing for blank input", () => {
    expect(runCommand("   ", context)).toEqual({ lines: [] });
  });

  it("lists commands for help", () => {
    const { lines } = runCommand("help", context);
    for (const command of ["help", "whoami", "ls projects", "open", "contact", "clear"]) {
      expect(lines.join("\n")).toContain(command);
    }
  });

  it("prints whoami text", () => {
    expect(runCommand("whoami", context).lines).toEqual(context.whoami);
  });

  it("lists projects for 'ls projects' and bare 'ls'", () => {
    for (const input of ["ls projects", "ls"]) {
      const { lines } = runCommand(input, context);
      expect(lines).toHaveLength(2);
      expect(lines[0]).toContain("atelier-lavender");
    }
  });

  it("explains an unknown ls target", () => {
    expect(runCommand("ls photos", context).lines[0]).toContain("ls projects");
  });

  it("opens apps regardless of case and spacing", () => {
    expect(runCommand("  OPEN   About ", context).action).toEqual({ type: "open", request: { appId: "about" } });
    expect(runCommand("open settings", context).action).toEqual({ type: "open", request: { appId: "display" } });
  });

  it("opens projects by slug", () => {
    expect(runCommand("open atelier-lavender", context).action).toEqual({
      type: "open",
      request: { appId: "projectViewer", params: { slug: "atelier-lavender" } },
    });
  });

  it("explains open with no target or an unknown target", () => {
    expect(runCommand("open", context).lines[0]).toContain("Usage");
    const unknown = runCommand("open banana", context);
    expect(unknown.action).toBeUndefined();
    expect(unknown.lines[0]).toContain("banana");
  });

  it("treats built-in object names as unknown targets", () => {
    for (const target of ["constructor", "__proto__", "toString"]) {
      const result = runCommand(`open ${target}`, context);
      expect(result.action).toBeUndefined();
      expect(result.lines[0]).toContain(target.toLowerCase());
    }
  });

  it("prints contact details without the mailto prefix", () => {
    const { lines } = runCommand("contact", context);
    expect(lines.join("\n")).toContain("someone@example.com");
    expect(lines.join("\n")).not.toContain("mailto:");
  });

  it("clears the screen", () => {
    expect(runCommand("clear", context)).toEqual({ lines: [], action: { type: "clear" } });
  });

  it("explains unknown commands", () => {
    expect(runCommand("rm -rf /", context).lines[0]).toBe("'rm' is not recognised. Type 'help' for a list of commands.");
  });
});
