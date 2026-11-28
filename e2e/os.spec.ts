import { expect, test, type Page } from "@playwright/test";

/** mark the visitor as returning so the boot screen and Welcome stay out of the way */
async function skipFirstVisit(page: Page) {
  await page.addInitScript(() => window.localStorage.setItem("jackos.visited", "true"));
}

test.describe("desktop", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("deep link opens the matching project window", async ({ page }) => {
    // load a project URL directly
    await page.goto("/work/atelier-lavender");
    // matching window and tab title show up
    await expect(page.getByRole("dialog", { name: "Atelier Lavender" })).toBeVisible();
    await expect(page).toHaveTitle(/Atelier Lavender/);
  });

  test("unknown project returns 404 with File not found", async ({ page }) => {
    // ask for a slug that doesn't exist
    const response = await page.goto("/work/not-a-project");
    // server gives a 404 and the desktop shows the themed dialog
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("dialog", { name: "File not found" })).toBeVisible();
  });

  test("double-clicking a desktop icon opens its window and updates the URL", async ({ page }) => {
    // returning visitor lands on the bare desktop
    await skipFirstVisit(page);
    await page.goto("/");
    // double-click the icon
    await page.getByRole("navigation", { name: "Desktop" }).getByRole("button", { name: "My Projects" }).dblclick();
    // window opens and the address bar follows
    await expect(page.getByRole("dialog", { name: "My Projects" })).toBeVisible();
    await expect(page).toHaveURL(/\/work$/);
  });

  test("a click with no mouse detail opens a folder icon", async ({ page }) => {
    // open the project list directly
    await skipFirstVisit(page);
    await page.goto("/work");
    // click the project icon like a screen reader would
    // element.click() has detail 0, same as a screen reader's synthesised click
    await page
      .getByRole("dialog", { name: "My Projects" })
      .getByRole("button", { name: "Atelier Lavender" })
      .evaluate((el) => (el as HTMLElement).click());
    // project opens even with no mouse or key event
    await expect(page.getByRole("dialog", { name: "Atelier Lavender" })).toBeVisible();
  });

  test("dragging a window keeps its title bar on screen", async ({ page }) => {
    // open About and grab its title bar
    await page.goto("/about");
    const dialog = page.getByRole("dialog", { name: "About Me" });
    // wait for the zoom-open animation to finish so the window is at its real size and place
    await page.waitForFunction(() => document.getAnimations().every((animation) => animation.playState !== "running"));
    const bar = dialog.locator("[data-titlebar]");
    const start = (await bar.boundingBox())!;
    // drag the bar almost off the right edge of the screen
    await page.mouse.move(start.x + 40, start.y + 10);
    await page.mouse.down();
    await page.mouse.move(1270, 300, { steps: 5 });
    await page.mouse.up();
    // window stops with its last 80px still on screen
    const after = (await dialog.boundingBox())!;
    expect(after.x).toBe(1280 - 80);
  });

  test("first visit boots, can be skipped, and does not boot again", async ({ page }) => {
    // first visit shows the boot screen
    await page.goto("/");
    const boot = page.getByTestId("boot-screen");
    await expect(boot).toBeVisible();
    // any key skips it, then Welcome opens
    await page.keyboard.press("Enter");
    await expect(boot).toHaveCount(0);
    await expect(page.getByRole("dialog", { name: "Welcome" })).toBeVisible();

    // reload as a returning visitor
    await page.reload();
    await expect(page.getByRole("navigation", { name: "Desktop" })).toBeVisible();
    // clock and boot decision get set in the same effect flush,
    // so a filled clock means boot was already decided
    await expect(page.locator("footer time")).not.toBeEmpty();
    await expect(boot).toHaveCount(0);
  });

  test("shared links get a social preview image", async ({ page, request }) => {
    // home page advertises a large preview card and its image
    await page.goto("/");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    const imageUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
    // image itself is served as a PNG
    const image = await request.get(new URL(imageUrl!).pathname + new URL(imageUrl!).search);
    expect(image.headers()["content-type"]).toBe("image/png");
  });

  test("a shared project link previews as that project", async ({ page }) => {
    // project pages set their own card text but keep the site-wide image
    await page.goto("/work/stain-game");
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Stain Game | Jack Keirnan");
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", "Stain Game | Jack Keirnan");
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  });

  test("plain view lists the CV", async ({ page }) => {
    // open the plain text page
    await page.goto("/plain");
    // name and section headings are there
    await expect(page.getByRole("heading", { level: 1, name: "Jack Keirnan" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
  });
});

test.describe("retro extras", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("right-clicking the wallpaper opens the desktop menu", async ({ page }) => {
    await skipFirstVisit(page);
    await page.goto("/");
    await page.mouse.click(700, 400, { button: "right" });
    const menu = page.getByRole("menu", { name: "Desktop menu" });
    await expect(menu).toBeVisible();
    // its Display Settings item opens that window and closes the menu
    await menu.getByRole("menuitem", { name: "Display Settings..." }).click();
    await expect(page.getByRole("dialog", { name: "Display Settings" })).toBeVisible();
    await expect(menu).toHaveCount(0);
  });

  test("a left-click anywhere else closes the desktop menu", async ({ page }) => {
    await skipFirstVisit(page);
    await page.goto("/");
    const menu = page.getByRole("menu", { name: "Desktop menu" });
    // wallpaper click
    await page.mouse.click(700, 400, { button: "right" });
    await expect(menu).toBeVisible();
    await page.mouse.click(400, 600);
    await expect(menu).toHaveCount(0);
    // taskbar click
    await page.mouse.click(700, 400, { button: "right" });
    await expect(menu).toBeVisible();
    await page.getByRole("button", { name: /♪/ }).click();
    await expect(menu).toHaveCount(0);
  });

  test("dragging on the wallpaper selects the icons it covers", async ({ page }) => {
    await skipFirstVisit(page);
    await page.goto("/");
    const icons = page.getByRole("navigation", { name: "Desktop" }).getByRole("button");
    const first = (await icons.nth(0).boundingBox())!;
    const second = (await icons.nth(1).boundingBox())!;
    // start right of the icon column and sweep left across the first two icons
    await page.mouse.move(first.x + first.width + 40, first.y + 5);
    await page.mouse.down();
    await page.mouse.move(first.x + 10, second.y + second.height - 5, { steps: 5 });
    await page.mouse.up();
    await expect(page.locator("[data-selected]")).toHaveCount(2);
  });

  test("the screensaver starts after a minute idle and any key wakes the screen", async ({ page }) => {
    await page.clock.install();
    await skipFirstVisit(page);
    await page.goto("/");
    await expect(page.getByRole("navigation", { name: "Desktop" })).toBeVisible();
    await page.clock.fastForward(61_000);
    const saver = page.getByTestId("screensaver");
    await expect(saver).toBeVisible();
    await page.keyboard.press("Shift");
    await expect(saver).toHaveCount(0);
  });

  test("first boot shows the BIOS memory line and a tip", async ({ page }) => {
    await page.goto("/");
    const boot = page.getByTestId("boot-screen");
    await expect(boot.getByText(/JackOS BIOS v1\.0 - Memory test/)).toBeVisible();
    await expect(boot.getByText(/^Tip: /)).toBeVisible();
  });
});

test.describe("tablet", () => {
  test.use({ viewport: { width: 1024, height: 768 }, hasTouch: true });

  test("a single tap opens a desktop icon", async ({ page }) => {
    // desktop layout on a touch screen, can't rely on double-tap here
    await skipFirstVisit(page);
    await page.goto("/");
    // one tap on the icon opens its window
    await page.getByRole("navigation", { name: "Desktop" }).getByRole("button", { name: "My Projects" }).tap();
    await expect(page.getByRole("dialog", { name: "My Projects" })).toBeVisible();
  });
});

test.describe("keyboard", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("Esc in the terminal input keeps the window open", async ({ page }) => {
    // open the Terminal and type in it
    await skipFirstVisit(page);
    await page.goto("/");
    await page.getByRole("navigation", { name: "Desktop" }).getByRole("button", { name: "Terminal" }).dblclick();
    const terminal = page.getByRole("dialog", { name: "Terminal" });
    await terminal.getByLabel("jack@jackos ~ $").fill("whoami");
    // Esc while typing leaves the window open, Esc on the window itself closes it
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
    // start on the phone home screen as a returning visitor
    await skipFirstVisit(page);
    await page.goto("/");
    const home = page.getByRole("navigation", { name: "Apps" });
    // open My Projects, then a project inside it
    await home.getByRole("button", { name: "My Projects" }).click();
    await page.getByRole("dialog", { name: "My Projects" }).getByRole("button", { name: "Atelier Lavender" }).click();
    await expect(page.getByRole("dialog", { name: "Atelier Lavender" })).toBeVisible();

    // browser back goes to the project list, not the home screen
    await page.goBack();
    await expect(page.getByRole("dialog", { name: "My Projects" })).toBeVisible();
    await expect(page).toHaveURL(/\/work$/);

    // then the on-screen Back button goes home
    await page.getByRole("button", { name: "Back" }).click();
    await expect(home).toBeVisible();
    await expect(page).toHaveURL(/\/$/);
  });
});
