/** Colours a pixel-grid character stands for; "." is transparent. */
export const PIXEL_PALETTE: Record<string, string> = {
  k: "#1a1a24",
  w: "#ffffff",
  c: "#e8e2d4",
  n: "#0f4596",
  t: "#2fa8b8",
  g: "#187a3c",
  y: "#f2c14e",
  r: "#d23a1c",
  s: "#f0c8a0",
  b: "#6b4a2e",
  d: "#10141c",
};

/** Every icon JackOS draws. All art is original, 12x12 pixels. */
export const PIXEL_ICONS = {
  welcome: [
    "...kkkkkk...",
    "..knnnnnnk..",
    ".knnnwwnnnk.",
    ".knnnwwnnnk.",
    ".knnnnnnnnk.",
    ".knnnwwnnnk.",
    ".knnnwwnnnk.",
    ".knnnwwnnnk.",
    "..knnwwnnk..",
    "...kkkkkk...",
    "............",
    "............",
  ],
  about: [
    "....kkkk....",
    "...kbbbbk...",
    "...kssssk...",
    "...kssssk...",
    "....kssk....",
    "..kkkkkkkk..",
    ".kttttttttk.",
    ".kttttttttk.",
    ".kttttttttk.",
    ".kttttttttk.",
    ".kkkkkkkkkk.",
    "............",
  ],
  folder: [
    "............",
    ".kkkk.......",
    "kyyyyk......",
    "kyyyykkkkkk.",
    "kyyyyyyyyyyk",
    "kkkkkkkkkkkk",
    "kyyyyyyyyyyk",
    "kyyyyyyyyyyk",
    "kyyyyyyyyyyk",
    "kyyyyyyyyyyk",
    "kkkkkkkkkkkk",
    "............",
  ],
  document: [
    ".kkkkkkk....",
    ".kwwwwwkk...",
    ".kwwwwwkwk..",
    ".kwwwwwkkkk.",
    ".kwnnnnnnwk.",
    ".kwwwwwwwwk.",
    ".kwnnnnnnwk.",
    ".kwwwwwwwwk.",
    ".kwnnnnwwwk.",
    ".kwwwwwwwwk.",
    ".kkkkkkkkkk.",
    "............",
  ],
  terminal: [
    "kkkkkkkkkkkk",
    "knnnnnnnnnnk",
    "kkkkkkkkkkkk",
    "kddddddddddk",
    "kdgddddddddk",
    "kddgdddddddk",
    "kdgddddddddk",
    "kddddggggddk",
    "kddddddddddk",
    "kkkkkkkkkkkk",
    "............",
    "............",
  ],
  contact: [
    "............",
    "............",
    "kkkkkkkkkkkk",
    "kwkwwwwwwkwk",
    "kwwkwwwwkwwk",
    "kwwwkwwkwwwk",
    "kwwwwkkwwwwk",
    "kwwwwwwwwwwk",
    "kwwwwwwwwwwk",
    "kkkkkkkkkkkk",
    "............",
    "............",
  ],
  display: [
    "kkkkkkkkkkkk",
    "kcnnnnnnnnck",
    "kcnttnnnnnck",
    "kcntttnnnnck",
    "kcttttttttck",
    "kcttttttttck",
    "kccccccccgck",
    "kkkkkkkkkkkk",
    "....kcck....",
    "..kkkkkkkk..",
    "..kcccccck..",
    "..kkkkkkkk..",
  ],
  error: [
    "...kkkkkk...",
    "..krrrrrrk..",
    ".krwrrrrwrk.",
    ".krrwrrwrrk.",
    ".krrrwwrrrk.",
    ".krrrwwrrrk.",
    ".krrwrrwrrk.",
    ".krwrrrrwrk.",
    "..krrrrrrk..",
    "...kkkkkk...",
    "............",
    "............",
  ],
} satisfies Record<string, string[]>;

/** Name of any icon in PIXEL_ICONS; derived so the list cannot drift. */
export type PixelIconName = keyof typeof PIXEL_ICONS;

/** One horizontal run of same-coloured pixels. */
export type PixelRect = { x: number; y: number; width: number; fill: string };

/** Turns a pixel grid into as few SVG rects as possible (one per run). */
export function toRects(grid: string[]): PixelRect[] {
  // Collects the rects for every row, top to bottom.
  const rects: PixelRect[] = [];
  grid.forEach((row, y) => {
    // Walks the row left to right, jumping over each run.
    let x = 0;
    while (x < row.length) {
      const cell = row[x];
      // Measure how far this colour repeats along the row.
      let end = x + 1;
      while (end < row.length && row[end] === cell) end++;
      // Transparent runs produce no rect.
      if (cell !== ".") rects.push({ x, y, width: end - x, fill: PIXEL_PALETTE[cell] });
      x = end;
    }
  });
  return rects;
}
