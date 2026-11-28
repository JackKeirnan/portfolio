import { APP_ALIASES, getAppMeta, type OpenRequest } from "@/os/apps";

/** stuff the terminal can print, passed in so the parser stays pure + testable */
export type TerminalContext = {
  projects: { slug: string; title: string }[];
  whoami: string[];
  contact: { label: string; href: string }[];
};

/** output lines + an optional side effect for the Terminal component to apply */
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
 * handles `open <name>` - app alias first, then a project slug
 * never throws, unknown names get an explanation line
 */
function openCommand(target: string | undefined, context: TerminalContext): TerminalResult {
  if (!target) return { lines: ["Usage: open <name>. Try 'open about' or 'ls projects'."] };

  // own-property check so names like "constructor" or "__proto__" don't count as aliases
  const appId = Object.hasOwn(APP_ALIASES, target) ? APP_ALIASES[target] : undefined;
  if (appId) {
    return { lines: [`Opening ${getAppMeta(appId).title}...`], action: { type: "open", request: { appId } } };
  }

  const project = context.projects.find((p) => p.slug === target);
  if (project) {
    return {
      lines: [`Opening ${project.title}...`],
      action: { type: "open", request: { appId: "projectViewer", params: { slug: project.slug } } },
    };
  }

  return { lines: [`open: no app or project called '${target}'. Try 'ls projects'.`] };
}

/**
 * parse + run one line of terminal input, never throws
 * gives back printed lines + an optional action for the Terminal component
 */
export function runCommand(input: string, context: TerminalContext): TerminalResult {
  const words = input.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return { lines: [] };
  const [command, ...args] = words;

  switch (command) {
    case "help":
      return { lines: HELP_LINES };
    case "whoami":
      return { lines: context.whoami };
    case "ls":
      // bare `ls` and `ls projects` both list projects
      if (args.length === 0 || args[0] === "projects") {
        return { lines: context.projects.map((p) => `  ${p.slug.padEnd(30)} ${p.title}`) };
      }
      return { lines: [`ls: nothing called '${args[0]}'. Try 'ls projects'.`] };
    case "open":
      return openCommand(args[0], context);
    case "contact":
      // strip the mailto: prefix so the address reads as plain text
      return { lines: context.contact.map((c) => `  ${c.label.padEnd(10)} ${c.href.replace(/^mailto:/, "")}`) };
    case "credits":
      // same as `open credits`, just one short word to open the window
      return openCommand("credits", context);
    case "clear":
      return { lines: [], action: { type: "clear" } };
    default:
      return { lines: [`'${command}' is not recognised. Type 'help' for a list of commands.`] };
  }
}
