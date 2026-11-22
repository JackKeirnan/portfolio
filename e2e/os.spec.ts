import { expect, test, type Page } from "@playwright/test";

/** Marks the visitor as returning, so the boot screen and Welcome stay out of the way. */
async function skipFirstVisit(page: Page) {
  await page.addInitScript(() => window.localStorage.setItem("jackos.visited", "true"));
}

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("deep link opens the matching project window", async ({ page }) => {
    await page.goto("/work/atelier-lavender");
    await expect(page.getByRole("dialog", { name: "Atelier Lavender" })).toBeVisible();
    await expect(page).toHaveTitle(/Atelier Lavender/);
  });

  test("unknown project returns 404 with File not found", async ({ page }) => {
    const response = await page.goto("/work/not-a-project");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("dialog", { name: "File not found" })).toBeVisible();
  });

  test("double-clicking a desktop icon opens its window and updates the URL", async ({ page }) => {
    await skipFirstVisit(page);
    await page.goto("/");
    await page.getByRole("navigation", { name: "Desktop" }).getByRole("button", { name: "My Projects" }).dblclick();
    await expect(page.getByRole("dialog", { name: "My Projects" })).toBeVisible();
    await expect(page).toHaveURL(/\/work$/);
  });

  test("a click with no mouse detail opens a folder icon", async ({ page }) => {
    await skipFirstVisit(page);
    await page.goto("/work");
    // element.click() has detail 0, like a screen reader's synthesised click.
    await page
      .getByRole("dialog", { name: "My Projects" })
      .getByRole("button", { name: "Atelier Lavender" })
      .evaluate((el) => (el as HTMLElement).click());
    await expect(page.getByRole("dialog", { name: "Atelier Lavender" })).toBeVisible();
  });

  test("dragging a window keeps its title bar on screen", async ({ page }) => {
    await page.goto("/about");
    const dialog = page.getByRole("dialog", { name: "About Me" });
    const bar = dialog.locator("[data-titlebar]");
    const start = (await bar.boundingBox())!;
    await page.mouse.move(start.x + 40, start.y + 10);
    await page.mouse.down();
    await page.mouse.move(1270, 300, { steps: 5 });
    await page.mouse.up();
    const after = (await dialog.boundingBox())!;
    expect(after.x).toBe(1280 - 80);
  });

  test("first visit boots, can be skipped, and does not boot again", async ({ page }) => {
    await page.goto("/");
    const boot = page.getByTestId("boot-screen");
    await expect(boot).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(boot).toHaveCount(0);
    await expect(page.getByRole("dialog", { name: "Welcome" })).toBeVisible();

    await page.reload();
    await expect(page.getByRole("navigation", { name: "Desktop" })).toBeVisible();
    await page.waitForTimeout(500);
    await expect(boot).toHaveCount(0);
  });

  test("plain view lists the CV", async ({ page }) => {
    await page.goto("/plain");
    await expect(page.getByRole("heading", { level: 1, name: "Jack Keirnan" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
  });
});

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("back steps through opened apps one at a time", async ({ page }) => {
    await skipFirstVisit(page);
    await page.goto("/");
    const home = page.getByRole("navigation", { name: "Apps" });
    await home.getByRole("button", { name: "My Projects" }).click();
    await page.getByRole("dialog", { name: "My Projects" }).getByRole("button", { name: "Atelier Lavender" }).click();
    await expect(page.getByRole("dialog", { name: "Atelier Lavender" })).toBeVisible();

    await page.goBack();
    await expect(page.getByRole("dialog", { name: "My Projects" })).toBeVisible();
    await expect(page).toHaveURL(/\/work$/);

    await page.getByRole("button", { name: "Back" }).click();
    await expect(home).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });
});
