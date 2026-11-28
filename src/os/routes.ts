import { getProjectBySlug } from "@/data/portfolio";
import type { AppId, OpenRequest } from "./apps";

const SECTION_ROUTES: Record<string, AppId> = {
  "/about": "about",
  "/work": "projects",
  "/contact": "contact",
};

// matches /work/<slug>, slug gets decoded separately since it might be malformed
const PROJECT_ROUTE = /^\/work\/([^/]+)$/;

/** decode a URL segment, malformed escapes (e.g. "%E0%A4%A") return null */
function safeDecode(segment: string): string | null {
  try {
    return decodeURIComponent(segment);
  } catch {
    return null;
  }
}

/** windows to open when someone lands on a URL, unknown paths show File not found */
export function initialWindowsForPath(pathname: string): OpenRequest[] {
  // treat "/about/" like "/about"
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  // home opens no windows, the desktop is the landing view
  if (path === "/" || path === "") return [];

  const sectionApp = SECTION_ROUTES[path];
  if (sectionApp) return [{ appId: sectionApp }];

  // only enabled projects resolve, disabled ones 404 like the old site
  const match = PROJECT_ROUTE.exec(path);
  const slug = match ? safeDecode(match[1]) : null;
  if (slug && getProjectBySlug(slug)) return [{ appId: "projectViewer", params: { slug } }];

  // anything else is File not found, remembering the URL so refocusing puts it back
  return [{ appId: "notFound", params: { path: pathname } }];
}

/** URL for a window so copying the address bar shares it. null keeps the current URL */
export function pathForWindow(request: OpenRequest | null): string | null {
  if (!request) return "/";
  switch (request.appId) {
    case "about":
      return "/about";
    case "projects":
      return "/work";
    case "contact":
      return "/contact";
    case "projectViewer":
      return request.params?.slug ? `/work/${encodeURIComponent(request.params.slug)}` : "/work";
    case "notFound":
      // the URL it was opened for, null (keep current) if opened from inside the app
      return request.params?.path ?? null;
    default:
      return "/";
  }
}
