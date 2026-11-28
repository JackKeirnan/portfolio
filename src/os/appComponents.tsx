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
import { Welcome } from "@/apps/welcome/Welcome";
import type { AppId, AppParams, AppProps } from "./apps";

// kept out of apps.ts so pure unit tests can still import the registry
const COMPONENTS: Record<AppId, ComponentType<AppProps>> = {
  welcome: Welcome,
  about: About,
  projects: Projects,
  projectViewer: ProjectViewer,
  cv: Cv,
  contact: Contact,
  display: DisplaySettings,
  credits: Credits,
  notFound: NotFound,
};

/** renders the app a window belongs to */
export function AppContent({ appId, params }: { appId: AppId; params?: AppParams }) {
  const App = COMPONENTS[appId];
  return <App params={params} />;
}
