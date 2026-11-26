import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { developer, projects, projectScreenshots } from "./portfolio";

// Guards the content file that every JackOS app reads from.
describe("portfolio data", () => {
  it("gives every enabled project a unique kebab-case slug", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("points every enabled project's screenshots at images in public/", () => {
    for (const project of projects) {
      for (const image of projectScreenshots(project)) {
        expect(existsSync(path.join(process.cwd(), "public", image)), image).toBe(true);
      }
    }
  });

  it("lists the main image first, then any gallery shots", () => {
    const atelier = projects.find((project) => project.slug === "atelier-lavender")!;
    expect(projectScreenshots(atelier)).toEqual([
      "/Images/AtelierOne.png",
      "/Images/AtelierTwo.png",
      "/Images/AtelierThree.png",
    ]);
    const portfolio = projects.find((project) => project.slug === "portfolio-website")!;
    expect(projectScreenshots(portfolio)).toEqual(["/Images/Portfolio.png"]);
  });

  it("links the dissertation game's public repo", () => {
    const games = projects.find((project) => project.slug === "video-game-projects")!;
    expect(games.repoUrl).toBe("https://github.com/JackKeirnan/Hospital-Game-FYP");
  });

  it("uses https for every project link", () => {
    for (const project of projects) {
      for (const url of [project.liveUrl, project.repoUrl]) if (url) expect(url).toMatch(/^https:\/\//);
    }
  });

  it("lists Stain Game as a Game Dev project made with Liyah", () => {
    const stain = projects.find((project) => project.slug === "stain-game");
    expect(stain?.category).toBe("Game Dev");
    expect(stain?.collaborator).toEqual({ name: "Liyah", href: "https://liyahalikhan.art/" });
  });

  it("uses https for every collaborator link", () => {
    for (const project of projects) {
      if (project.collaborator?.href) expect(project.collaborator.href).toMatch(/^https:\/\//);
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

  it("lists credits, each with a label, detail and an https link when linked", () => {
    expect(developer.credits.length).toBeGreaterThan(0);
    for (const credit of developer.credits) {
      expect(credit.label.length).toBeGreaterThan(0);
      expect(credit.detail.length).toBeGreaterThan(0);
      if (credit.href) expect(credit.href).toMatch(/^https:\/\//);
    }
  });
});
