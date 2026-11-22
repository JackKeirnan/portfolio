import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { developer, projects } from "./portfolio";

// Guards the content file that every JackOS app reads from.
describe("portfolio data", () => {
  it("gives every enabled project a unique kebab-case slug", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("points every enabled project at an image in public/", () => {
    for (const project of projects) {
      expect(existsSync(path.join(process.cwd(), "public", project.image)), project.image).toBe(true);
    }
  });

  it("labels every skill group", () => {
    for (const group of developer.skills.groups) expect(group.label.length).toBeGreaterThan(0);
  });

  it("has whoami text for the terminal", () => {
    expect(developer.terminal.whoami.length).toBeGreaterThan(0);
  });

  it("points cvPdf at a file in public/ when it is set", () => {
    if (developer.cvPdf) {
      expect(existsSync(path.join(process.cwd(), "public", developer.cvPdf))).toBe(true);
    }
  });
});
