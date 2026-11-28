import { getProjectBySlug } from "@/data/portfolio";
import type { PixelIconName } from "./pixelIcons";

/** every program JackOS can open */
export type AppId =
  | "welcome" | "about" | "projects" | "projectViewer" | "cv"
  | "contact" | "terminal" | "display" | "credits" | "notFound";

/** extra data a window needs, e.g. { slug } for a project */
export type AppParams = Record<string, string>;

/** request to open (or focus) an app window */
export type OpenRequest = { appId: AppId; params?: AppParams };

/** props every app component gets */
export type AppProps = { params?: AppParams };

/** static info about an app - the shells, Start menu and Terminal all read these */
export type AppMeta = {
  id: AppId;
  title: string;
  icon: PixelIconName;
  defaultSize: { w: number; h: number };
  // param that makes each instance unique (one window per project slug)
  instanceKey?: string;
  onDesktop: boolean;
  inStartMenu: boolean;
};

/** the registry, order here sets desktop and Start menu order */
export const APPS: readonly AppMeta[] = [
  { id: "welcome", title: "Welcome", icon: "welcome", defaultSize: { w: 440, h: 320 }, onDesktop: true, inStartMenu: true },
  { id: "about", title: "About Me", icon: "about", defaultSize: { w: 580, h: 500 }, onDesktop: true, inStartMenu: true },
  { id: "projects", title: "My Projects", icon: "folder", defaultSize: { w: 620, h: 420 }, onDesktop: true, inStartMenu: true },
  { id: "projectViewer", title: "Project", icon: "document", defaultSize: { w: 660, h: 540 }, instanceKey: "slug", onDesktop: false, inStartMenu: false },
  { id: "cv", title: "CV", icon: "document", defaultSize: { w: 580, h: 540 }, onDesktop: true, inStartMenu: true },
  { id: "contact", title: "Contact", icon: "contact", defaultSize: { w: 420, h: 320 }, onDesktop: true, inStartMenu: true },
  { id: "terminal", title: "Terminal", icon: "terminal", defaultSize: { w: 580, h: 360 }, onDesktop: true, inStartMenu: true },
  { id: "display", title: "Display Settings", icon: "display", defaultSize: { w: 380, h: 340 }, onDesktop: false, inStartMenu: true },
  { id: "credits", title: "About JackOS", icon: "welcome", defaultSize: { w: 440, h: 380 }, onDesktop: false, inStartMenu: true },
  { id: "notFound", title: "File not found", icon: "error", defaultSize: { w: 440, h: 240 }, onDesktop: false, inStartMenu: false },
];

/** names the Terminal's `open` command accepts for each app */
export const APP_ALIASES: Record<string, AppId> = {
  welcome: "welcome",
  readme: "welcome",
  about: "about",
  projects: "projects",
  work: "projects",
  cv: "cv",
  resume: "cv",
  contact: "contact",
  terminal: "terminal",
  display: "display",
  settings: "display",
  credits: "credits",
};

/** look up an app. AppId is a closed union so a miss is a programming error */
export function getAppMeta(appId: AppId): AppMeta {
  const meta = APPS.find((app) => app.id === appId);
  if (!meta) throw new Error(`Unknown app: ${appId}`);
  return meta;
}

/** title bar text, project windows show the project's name */
export function windowTitle(appId: AppId, params?: AppParams): string {
  // project windows look up their name, missing slug falls back to "Project"
  if (appId === "projectViewer") return getProjectBySlug(params?.slug ?? "")?.title ?? "Project";
  return getAppMeta(appId).title;
}
