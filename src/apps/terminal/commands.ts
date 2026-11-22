import { APP_ALIASES, getAppMeta, type OpenRequest } from "@/os/apps";

/** Content the terminal can print, passed in so the parser stays pure and testable. */
export type TerminalContext = {
  projects: { slug: string; title: string }[];
  whoami: string[];
  contact: { label: string; href: string }[];
};

/** Output lines plus an optional side effect for the Terminal component to apply. */
export type TerminalResult = {
  lines: string[];
  action?: { type: "open"; request: OpenRequest } | { type: "clear" };
};

const HELP_LINES = [
  "Available commands:",
  "  help            Show this list",
  "  whoami          Who is Jack?",
  "  ls projects     List my projects",
  "  open <name>     Open an app or project (try: open about, open cv)",
  "  contact         Show contact details",
  "  credits         Open About JackOS",
  "  clear           Clear the screen",
];

/**
 * Handles `open <name>`: an app alias first, then a project slug.
 * Never throws; unknown names return an explanation line.
 */
function openCommand(target: string | undefined, context: TerminalContext): TerminalResult {
  // No target given, so explain the usage.
  if (!target) return { lines: ["Usage: open <name>. Try 'open about' or 'ls projects'."] };

  // Own-property check so names like "constructor" or "__proto__" are not treated as aliases.
  const appId = Object.hasOwn(APP_ALIASES, target) ? APP_ALIASES[target] : undefined;
  if (appId) {
    return { lines: [`Opening ${getAppMeta(appId).title}...`], action: { type: "open", request: { appId } } };
  }

  // Not an app alias, so try a project slug.
  const project = context.projects.find((p) => p.slug === target);
  if (project) {
    return {
      lines: [`Opening ${project.title}...`],
      action: { type: "open", request: { appId: "projectViewer", params: { slug: project.slug } } },
    };
  }

  // Neither an app nor a project matched.
  return { lines: [`open: no app or project called '${target}'. Try 'ls projects'.`] };
}

/**
 * Parses and runs one line of terminal input. Never throws.
 * Returns printed lines plus an optional action for the Terminal component.
 */
export function runCommand(input: string, context: TerminalContext): TerminalResult {
  // Case and extra spaces do not matter.
  const words = input.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return { lines: [] };
  const [command, ...args] = words;

  switch (command) {
    case "help":
      return { lines: HELP_LINES };
    case "whoami":
      return { lines: context.whoami };
    case "ls":
      // Bare `ls` and `ls projects` both list projects.
      if (args.length === 0 || args[0] === "projects") {
        return { lines: context.projects.map((p) => `  ${p.slug.padEnd(30)} ${p.title}`) };
      }
      return { lines: [`ls: nothing called '${args[0]}'. Try 'ls projects'.`] };
    case "open":
      return openCommand(args[0], context);
    case "contact":
      // Strip the mailto: prefix so the address reads as plain text.
      return { lines: context.contact.map((c) => `  ${c.label.padEnd(10)} ${c.href.replace(/^mailto:/, "")}`) };
    case "credits":
      // Same as `open credits`, so the window opens from one short word.
      return openCommand("credits", context);
    case "clear":
      return { lines: [], action: { type: "clear" } };
    default:
      return { lines: [`'${command}' is not recognised. Type 'help' for a list of commands.`] };
  }
}
