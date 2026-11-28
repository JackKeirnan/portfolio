import { expect, test, type Page } from "@playwright/test";

/** Marks the visitor as returning, so the boot screen and Welcome stay out of the way. */
async function skipFirstVisit(page: Page) {
  await page.addInitScript(() => window.localStorage.setItem("jackos.visited", "true"));
}

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("deep link opens the matching project window", async ({ page }) => {
    // Load a project URL directly.
    await page.goto("/work/atelier-lavender");
    // The matching window and tab title appear.
    await expect(page.getByRole("dialog", { name: "Atelier Lavender" })).toBeVisible();
    await expect(page).toHaveTitle(/Atelier Lavender/);
  });

  test("unknown project returns 404 with File not found", async ({ page }) => {
    // Request a slug that does not exist.
    const response = await page.goto("/work/not-a-project");
    // The server answers 404 and the desktop shows the themed dialog.
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("dialog", { name: "File not found" })).toBeVisible();
  });

  test("double-clicking a desktop icon opens its window and updates the URL", async ({ page }) => {
    // Returning visitor lands on the bare desktop.
    await skipFirstVisit(page);
    await page.goto("/");
    // Double-click the icon.
    await page.getByRole("navigation", { name: "Desktop" }).getByRole("button", { name: "My Projects" }).dblclick();
    // The window opens and the address bar follows.
    await expect(page.getByRole("dialog", { name: "My Projects" })).toBeVisible();
    await expect(page).toHaveURL(/\/work$/);
  });

  test("a click with no mouse detail opens a folder icon", async ({ page }) => {
    // Open the project list directly.
    await skipFirstVisit(page);
    await page.goto("/work");
    // Click the project icon the way a screen reader does.
    // element.click() has detail 0, like a screen reader's synthesised click.
    await page
      .getByRole("dialog", { name: "My Projects" })
      .getByRole("button", { name: "Atelier Lavender" })
      .evaluate((el) => (el as HTMLElement).click());
    // The project opens even though no mouse or key event happened.
    await expect(page.getByRole("dialog", { name: "Atelier Lavender" })).toBeVisible();
  });

  test("dragging a window keeps its title bar on screen", async ({ page }) => {
    // Open About and find its title bar.
    await page.goto("/about");
    const dialog = page.getByRole("dialog", { name: "About Me" });
    const bar = dialog.locator("[data-titlebar]");
    const start = (await bar.boundingBox())!;
    // Drag the bar almost off the right edge of the screen.
    await page.mouse.move(start.x + 40, start.y + 10);
    await page.mouse.down();
    await page.mouse.move(1270, 300, { steps: 5 });
    await page.mouse.up();
    // The window stops with its last 80px still on screen.
    const after = (await dialog.boundingBox())!;
    expect(after.x).toBe(1280 - 80);
  });

  test("first visit boots, can be skipped, and does not boot again", async ({ page }) => {
    // A first visit shows the boot screen.
    await page.goto("/");
    const boot = page.getByTestId("boot-screen");
    await expect(boot).toBeVisible();
    // Any key skips it, and Welcome opens.
    await page.keyboard.press("Enter");
    await expect(boot).toHaveCount(0);
    await expect(page.getByRole("dialog", { name: "Welcome" })).toBeVisible();

    // Reload as a returning visitor.
    await page.reload();
    await expect(page.getByRole("navigation", { name: "Desktop" })).toBeVisible();
    // The clock and the boot decision are set in the same effect flush,
    // so a filled clock proves boot was already decided.
    await expect(page.locator("footer time")).not.toBeEmpty();
    await expect(boot).toHaveCount(0);
  });

  test("shared links get a social preview image", async ({ page, request }) => {
    // The home page advertises a large preview card and its image.
    await page.goto("/");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const imageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
    // The image itself is served as a PNG.
    const image = await request.get(new URL(imageUrl!).pathname + new URL(imageUrl!).search);
    expect(image.headers()["content-type"]).toBe("image/png");
  });

  test("a shared project link previews as that project", async ({ page }) => {
    // Project pages set their own card text and keep the site-wide image.
    await page.goto("/work/stain-game");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Stain Game | Jack Keirnan");
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", "Stain Game | Jack Keirnan");
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  });

  test("plain view lists the CV", async ({ page }) => {
    // Open the plain text page.
    await page.goto("/plain");
    // Name and section headings are present.
    await expect(page.getByRole("heading", { level: 1, name: "Jack Keirnan" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
  });
});

test.describe("tablet", () => {
  test.use({ viewport: { width: 1024, height: 768 }, hasTouch: true });

  test("a single tap opens a desktop icon", async ({ page }) => {
    // Desktop layout on a touch screen, where double-tap can't be relied on.
    await skipFirstVisit(page);
    await page.goto("/");
    // One tap on the icon opens its window.
    await page.getByRole("navigation", { name: "Desktop" }).getByRole("button", { name: "My Projects" }).tap();
    await expect(page.getByRole("dialog", { name: "My Projects" })).toBeVisible();
  });
});

test.describe("keyboard", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("Esc in the terminal input keeps the window open", async ({ page }) => {
    // Open the Terminal and type into it.
    await skipFirstVisit(page);
    await page.goto("/");
    await page.getByRole("navigation", { name: "Desktop" }).getByRole("button", { name: "Terminal" }).dblclick();
    const terminal = page.getByRole("dialog", { name: "Terminal" });
    await terminal.getByLabel("jack@jackos ~ $").fill("whoami");
    // Esc while typing leaves the window open; Esc on the window itself closes it.
    await page.keyboard.press("Escape");
    await expect(terminal).toBeVisible();
    await terminal.focus();
    await page.keyboard.press("Escape");
    await expect(terminal).toHaveCount(0);
  });
});

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("back steps through opened apps one at a time", async ({ page }) => {
    // Start on the phone home screen as a returning visitor.
    await skipFirstVisit(page);
    await page.goto("/");
    const home = page.getByRole("navigation", { name: "Apps" });
    // Open My Projects, then one project inside it.
    await home.getByRole("button", { name: "My Projects" }).click();
    await page.getByRole("dialog", { name: "My Projects" }).getByRole("button", { name: "Atelier Lavender" }).click();
    await expect(page.getByRole("dialog", { name: "Atelier Lavender" })).toBeVisible();

    // Browser back returns to the project list, not the home screen.
    await page.goBack();
    await expect(page.getByRole("dialog", { name: "My Projects" })).toBeVisible();
    await expect(page).toHaveURL(/\/work$/);

    // The on-screen Back button then returns home.
    await page.getByRole("button", { name: "Back" }).click();
    await expect(home).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });
});
