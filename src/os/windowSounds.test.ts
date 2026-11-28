import { describe, expect, it } from "vitest";
import { EMPTY_STATE, wmReducer, type Viewport, type WMState } from "./windowManager";
import { windowSoundFor } from "./windowSounds";

const viewport: Viewport = { width: 1280, height: 764 };

/** opens an app on top of a state, for building before/after pairs */
const open = (state: WMState, appId: "about" | "contact" | "notFound") =>
  wmReducer(state, { type: "open", request: { appId }, viewport });

describe("window sounds", () => {
  it("plays open when a window appears", () => {
    expect(windowSoundFor(EMPTY_STATE, open(EMPTY_STATE, "about"))).toBe("open");
  });

  it("plays error when the new window is File not found", () => {
    expect(windowSoundFor(EMPTY_STATE, open(EMPTY_STATE, "notFound"))).toBe("error");
  });

  it("plays close when a window goes away", () => {
    const before = open(EMPTY_STATE, "about");
    expect(windowSoundFor(before, wmReducer(before, { type: "close", id: "about" }))).toBe("close");
  });

  it("plays minimize, then open when restored", () => {
    const before = open(EMPTY_STATE, "about");
    const minimised = wmReducer(before, { type: "minimize", id: "about" });
    expect(windowSoundFor(before, minimised)).toBe("minimize");
    expect(windowSoundFor(minimised, wmReducer(minimised, { type: "focus", id: "about" }))).toBe("open");
  });

  it("plays maximize when a window is maximised or restored", () => {
    const before = open(EMPTY_STATE, "about");
    const maximised = wmReducer(before, { type: "toggleMaximize", id: "about" });
    expect(windowSoundFor(before, maximised)).toBe("maximize");
    expect(windowSoundFor(maximised, wmReducer(maximised, { type: "toggleMaximize", id: "about" }))).toBe("maximize");
  });

  it("stays silent for moves and focus changes", () => {
    const before = open(open(EMPTY_STATE, "about"), "contact");
    expect(windowSoundFor(before, wmReducer(before, { type: "focus", id: "about" }))).toBeNull();
    expect(windowSoundFor(before, wmReducer(before, { type: "move", id: "about", x: 300, y: 200, viewport }))).toBeNull();
    expect(windowSoundFor(before, before)).toBeNull();
  });
});
