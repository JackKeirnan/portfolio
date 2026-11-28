// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { readSetting, writeSetting } from "./storage";

describe("settings storage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("round-trips a value", () => {
    writeSetting("jackos.test", { wallpaper: "plum" });
    expect(readSetting("jackos.test", null)).toEqual({ wallpaper: "plum" });
  });

  it("returns the fallback when nothing is saved", () => {
    expect(readSetting("jackos.missing", "aurora")).toBe("aurora");
  });

  it("returns the fallback when the saved value is not JSON", () => {
    window.localStorage.setItem("jackos.bad", "{oops");
    expect(readSetting("jackos.bad", false)).toBe(false);
  });

  it("survives a storage that throws on read and write", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    expect(() => writeSetting("jackos.sound", true)).not.toThrow();
    expect(readSetting("jackos.sound", false)).toBe(false);
  });
});
