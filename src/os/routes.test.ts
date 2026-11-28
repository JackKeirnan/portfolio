import { describe, expect, it } from "vitest";
import { projects } from "@/data/portfolio";
import { initialWindowsForPath, pathForWindow } from "./routes";

describe("routes", () => {
  it("opens nothing on the home page", () => {
    expect(initialWindowsForPath("/")).toEqual([]);
  });

  it("maps section routes to their apps, ignoring a trailing slash", () => {
    expect(initialWindowsForPath("/about")).toEqual([{ appId: "about" }]);
    expect(initialWindowsForPath("/work/")).toEqual([{ appId: "projects" }]);
    expect(initialWindowsForPath("/contact")).toEqual([{ appId: "contact" }]);
  });

  it("round-trips every enabled project", () => {
    for (const project of projects) {
      const request = { appId: "projectViewer" as const, params: { slug: project.slug } };
      expect(initialWindowsForPath(pathForWindow(request)!)).toEqual([request]);
    }
  });

  it("shows File not found for unknown, disabled and malformed paths", () => {
    expect(initialWindowsForPath("/work/not-a-project")).toEqual([{ appId: "notFound", params: { path: "/work/not-a-project" } }]);
    expect(initialWindowsForPath("/work/fattoria-cercatoia")).toEqual([{ appId: "notFound", params: { path: "/work/fattoria-cercatoia" } }]);
    expect(initialWindowsForPath("/work/%E0%A4%A")).toEqual([{ appId: "notFound", params: { path: "/work/%E0%A4%A" } }]);
    expect(initialWindowsForPath("/nowhere")).toEqual([{ appId: "notFound", params: { path: "/nowhere" } }]);
  });

  it("gives app windows without a route the home path, and leaves 404s alone", () => {
    expect(pathForWindow({ appId: "display" })).toBe("/");
    expect(pathForWindow(null)).toBe("/");
    expect(pathForWindow({ appId: "notFound" })).toBeNull();
    // a 404 window remembers the URL it was opened for, so refocusing it puts that URL back
    expect(pathForWindow({ appId: "notFound", params: { path: "/work/typo" } })).toBe("/work/typo");
  });
});
