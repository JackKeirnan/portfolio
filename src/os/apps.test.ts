import { describe, expect, it } from "vitest";
import { APPS, getAppMeta, windowTitle } from "./apps";

describe("app registry", () => {
  it("has unique app ids", () => {
    const ids = APPS.map((app) => app.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keys project windows by slug", () => {
    expect(getAppMeta("projectViewer").instanceKey).toBe("slug");
  });

  it("titles project windows with the project name", () => {
    expect(windowTitle("projectViewer", { slug: "atelier-lavender" })).toBe("Atelier Lavender");
    expect(windowTitle("projectViewer", { slug: "nope" })).toBe("Project");
    expect(windowTitle("about")).toBe("About Me");
  });
});
