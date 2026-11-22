import { describe, expect, it } from "vitest";
import {
  EMPTY_STATE, MIN_VISIBLE_WIDTH, MIN_WINDOW_SIZE, initialState, stackOrder,
  windowId, wmReducer, type Viewport, type WMState,
} from "./windowManager";

const viewport: Viewport = { width: 1280, height: 764 };
const open = (state: WMState, appId: Parameters<typeof windowId>[0]["appId"], params?: Record<string, string>) =>
  wmReducer(state, { type: "open", request: { appId, params }, viewport });
const win = (state: WMState, id: string) => state.windows.find((w) => w.id === id)!;

describe("window manager", () => {
  it("opens a focused window at the app's default size", () => {
    const state = open(EMPTY_STATE, "about");
    expect(state.focusedId).toBe("about");
    expect(win(state, "about")).toMatchObject({ w: 580, h: 500, minimized: false, maximized: false });
  });

  it("focuses instead of duplicating an app that is already open", () => {
    let state = open(EMPTY_STATE, "about");
    state = open(state, "contact");
    state = open(state, "about");
    expect(state.windows).toHaveLength(2);
    expect(state.focusedId).toBe("about");
    expect(win(state, "about").z).toBeGreaterThan(win(state, "contact").z);
  });

  it("opens one project window per slug", () => {
    let state = open(EMPTY_STATE, "projectViewer", { slug: "atelier-lavender" });
    state = open(state, "projectViewer", { slug: "severin-hair-studio" });
    state = open(state, "projectViewer", { slug: "atelier-lavender" });
    expect(state.windows.map((w) => w.id)).toEqual(["projectViewer:atelier-lavender", "projectViewer:severin-hair-studio"]);
  });

  it("cascades new windows", () => {
    let state = open(EMPTY_STATE, "contact");
    state = open(state, "terminal");
    expect(win(state, "terminal").x - win(state, "contact").x).toBe(24);
    expect(win(state, "terminal").y - win(state, "contact").y).toBe(24);
  });

  it("fits a new window inside a small viewport", () => {
    const small = { width: 800, height: 500 };
    const state = wmReducer(EMPTY_STATE, { type: "open", request: { appId: "projectViewer", params: { slug: "x" } }, viewport: small });
    const w = state.windows[0];
    expect(w.h).toBe(500);
    expect(w.x + w.w).toBeLessThanOrEqual(800);
    expect(w.y).toBe(0);
  });

  it("raises and restores a window on focus", () => {
    let state = open(EMPTY_STATE, "about");
    state = open(state, "contact");
    state = wmReducer(state, { type: "minimize", id: "about" });
    state = wmReducer(state, { type: "focus", id: "about" });
    expect(win(state, "about")).toMatchObject({ minimized: false });
    expect(state.focusedId).toBe("about");
  });

  it("moves focus to the top remaining window on close, and ignores unknown ids", () => {
    let state = open(EMPTY_STATE, "about");
    state = open(state, "contact");
    state = wmReducer(state, { type: "close", id: "contact" });
    expect(state.focusedId).toBe("about");
    expect(wmReducer(state, { type: "close", id: "nope" })).toBe(state);
  });

  it("moves focus off a minimised window, to nothing when none are left", () => {
    let state = open(EMPTY_STATE, "about");
    state = open(state, "contact");
    state = wmReducer(state, { type: "minimize", id: "contact" });
    expect(state.focusedId).toBe("about");
    state = wmReducer(state, { type: "minimize", id: "about" });
    expect(state.focusedId).toBeNull();
  });

  it("keeps a dragged window's title bar on screen", () => {
    let state = open(EMPTY_STATE, "contact");
    const { w } = win(state, "contact");
    state = wmReducer(state, { type: "move", id: "contact", x: 5000, y: -50, viewport });
    expect(win(state, "contact")).toMatchObject({ x: viewport.width - MIN_VISIBLE_WIDTH, y: 0 });
    state = wmReducer(state, { type: "move", id: "contact", x: -5000, y: 5000, viewport });
    expect(win(state, "contact").x).toBe(MIN_VISIBLE_WIDTH - w);
    expect(win(state, "contact").y).toBeLessThan(viewport.height);
  });

  it("clamps resizing between the minimum size and the viewport", () => {
    let state = open(EMPTY_STATE, "contact");
    state = wmReducer(state, { type: "resize", id: "contact", w: 10, h: 10, viewport });
    expect(win(state, "contact")).toMatchObject({ w: MIN_WINDOW_SIZE.w, h: MIN_WINDOW_SIZE.h });
    state = wmReducer(state, { type: "resize", id: "contact", w: 9999, h: 9999, viewport });
    expect(win(state, "contact")).toMatchObject({ w: viewport.width, h: viewport.height });
  });

  it("keeps the title bar reachable when a window is resized after being dragged off-screen", () => {
    let state = open(EMPTY_STATE, "contact");
    state = wmReducer(state, { type: "move", id: "contact", x: -5000, y: 16, viewport });
    expect(win(state, "contact").x).toBe(MIN_VISIBLE_WIDTH - 420);
    state = wmReducer(state, { type: "resize", id: "contact", w: 240, h: 200, viewport });
    expect(win(state, "contact").x + win(state, "contact").w).toBeGreaterThanOrEqual(MIN_VISIBLE_WIDTH);
  });

  it("pulls windows back on screen when the viewport shrinks", () => {
    let state = open(EMPTY_STATE, "projects");
    state = wmReducer(state, { type: "move", id: "projects", x: 1100, y: 700, viewport });
    const phone = { width: 390, height: 600 };
    state = wmReducer(state, { type: "fit", viewport: phone });
    const w = win(state, "projects");
    expect(w.w).toBeLessThanOrEqual(390);
    expect(w.x).toBeLessThanOrEqual(390 - MIN_VISIBLE_WIDTH);
    expect(w.y).toBeLessThan(600);
  });

  it("toggles maximise and focuses the window", () => {
    let state = open(EMPTY_STATE, "about");
    state = open(state, "contact");
    state = wmReducer(state, { type: "toggleMaximize", id: "about" });
    expect(win(state, "about").maximized).toBe(true);
    expect(state.focusedId).toBe("about");
  });

  it("truncates the stack to the lowest windows, for phone back", () => {
    let state = open(EMPTY_STATE, "projects");
    state = open(state, "projectViewer", { slug: "atelier-lavender" });
    state = open(state, "contact");
    state = wmReducer(state, { type: "truncate", keep: 1 });
    expect(stackOrder(state).map((w) => w.id)).toEqual(["projects"]);
    expect(state.focusedId).toBe("projects");
  });

  it("builds initial state from requests, focusing the last", () => {
    const state = initialState([{ appId: "projects" }, { appId: "about" }]);
    expect(stackOrder(state).map((w) => w.id)).toEqual(["projects", "about"]);
    expect(state.focusedId).toBe("about");
  });

  it("closes everything", () => {
    const state = wmReducer(open(EMPTY_STATE, "about"), { type: "closeAll" });
    expect(state).toEqual(EMPTY_STATE);
  });
});
