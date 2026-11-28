import { getProjectBySlug } from "@/data/portfolio";
import type { AppId, OpenRequest } from "./apps";

const SECTION_ROUTES: Record<string, AppId> = {
  "/about": "about",
  "/work": "projects",
  "/contact": "contact",
};

// Matches /work/<slug>; the slug is decoded separately because it may be malformed.
const PROJECT_ROUTE = /^\/work\/([^/]+)$/;

/** Decodes a URL segment; malformed escapes (e.g. "%E0%A4%A") return null. */
function safeDecode(segment: string): string | null {
  try {
    return decodeURIComponent(segment);
  } catch {
    return null;
  }
}

/** Windows to open when a visitor lands on a URL. Unknown paths show File not found. */
export function initialWindowsForPath(pathname: string): OpenRequest[] {
  // Treat "/about/" like "/about".
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  // Home opens no windows; the desktop is the landing view.
  if (path === "/" || path === "") return [];

  const sectionApp = SECTION_ROUTES[path];
  if (sectionApp) return [{ appId: sectionApp }];

  // Only enabled projects resolve; disabled ones 404 like the old site.
  const match = PROJECT_ROUTE.exec(path);
  const slug = match ? safeDecode(match[1]) : null;
  if (slug && getProjectBySlug(slug)) return [{ appId: "projectViewer", params: { slug } }];

  // Anything else shows File not found, remembering the URL so refocusing it restores that URL.
  return [{ appId: "notFound", params: { path: pathname } }];
}

/** URL that represents a window, so copying the address bar shares it. Null keeps the current URL. */
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
      // The URL it was opened for; null (keep current) when opened from inside the app.
      return request.params?.path ?? null;
    default:
      return "/";
  }
}
