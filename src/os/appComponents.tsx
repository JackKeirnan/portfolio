"use client";

import type { ComponentType } from "react";
import { About } from "@/apps/about/About";
import { Contact } from "@/apps/contact/Contact";
import { Cv } from "@/apps/cv/Cv";
import { DisplaySettings } from "@/apps/display/DisplaySettings";
import { Credits } from "@/apps/credits/Credits";
import { NotFound } from "@/apps/notFound/NotFound";
import { ProjectViewer } from "@/apps/projectViewer/ProjectViewer";
import { Projects } from "@/apps/projects/Projects";
import { Terminal } from "@/apps/terminal/Terminal";
import { Welcome } from "@/apps/welcome/Welcome";
import type { AppId, AppParams, AppProps } from "./apps";

// Kept apart from apps.ts so the registry stays importable by pure unit tests.
const COMPONENTS: Record<AppId, ComponentType<AppProps>> = {
  welcome: Welcome,
  about: About,
  projects: Projects,
  projectViewer: ProjectViewer,
  cv: Cv,
  contact: Contact,
  terminal: Terminal,
  display: DisplaySettings,
  credits: Credits,
  notFound: NotFound,
};

/** Renders the app a window belongs to. */
export function AppContent({ appId, params }: { appId: AppId; params?: AppParams }) {
  const App = COMPONENTS[appId];
  return <App params={params} />;
}
