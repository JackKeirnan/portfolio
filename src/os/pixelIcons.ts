/**
 * Every icon JackOS shows, mapped to its PNG in public/icons.
 * Art from tstamborski's pixelart-icons (CC0); credited in About JackOS.
 */
export const PIXEL_ICONS = {
  welcome: "/icons/welcome.png",
  about: "/icons/about.png",
  folder: "/icons/folder.png",
  document: "/icons/document.png",
  terminal: "/icons/terminal.png",
  contact: "/icons/contact.png",
  display: "/icons/display.png",
  error: "/icons/error.png",
  gamepad: "/icons/gamepad.png",
} as const;

/** Names callers use, so swapping art never touches components. */
export type PixelIconName = keyof typeof PIXEL_ICONS;
