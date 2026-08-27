/**
 * Tiny pixel-art engine.
 *
 * Every sprite is an array of equal-width strings; each character maps to a
 * colour in PALETTE ("." = transparent). Rows are padded on render, so the
 * maps below can be edited by eye without counting columns.
 */

export const PALETTE: Record<string, string> = {
  O: "#8c1742", // outline
  "#": "#fffafd", // cat body
  w: "#f3dcec", // cat body shade
  E: "#3b1024", // eye
  "*": "#ffffff", // glint / sparkle
  "@": "#ff9ec7", // blush
  M: "#c62b63", // mouth
  T: "#63c6ff", // tear
  B: "#c08a68", // bear fur
  b: "#95634a", // bear fur shade
  W: "#fdf6ff", // panda fur
  H: "#ff2f70", // heart
  h: "#ff86ae", // heart highlight
  Y: "#ffd85e", // star
  c: "#fff3fb", // cloud
  C: "#f6c4e6", // cloud edge
};

/** Shared cat silhouette. Face rows (5-9) get swapped per mood. */
const CAT_BASE = [
  "................",
  "...OO......OO...",
  "..O##O....O##O..",
  "..O##########O..",
  ".O############O.",
  ".O############O.",
  ".O############O.",
  ".O############O.",
  ".O#@@######@@#O.",
  ".O#####MM#####O.",
  ".O############O.",
  ".O############O.",
  "..O##O####O##O..",
  "..O##########O..",
  "...OOOOOOOOOO...",
  "................",
];

type FaceRows = Record<number, string>;

function cat(face: FaceRows): string[] {
  return CAT_BASE.map((row, i) => face[i] ?? row);
}

/** Hopeful, a little nervous. */
export const CAT_SHY = cat({
  6: ".O##*E####*E##O.",
  7: ".O##EE####EE##O.",
});

/** Big pleading anime eyes. */
export const CAT_PLEAD = cat({
  5: ".O##EE####EE##O.",
  6: ".O#EEEE##EEEE#O.",
  7: ".O#E*EE##EE*E#O.",
  8: ".O#@EE####EE@#O.",
  9: ".O####MMMM####O.",
});

/** Wobbly mouth, tears forming. */
export const CAT_SAD = cat({
  6: ".O##EE####EE##O.",
  7: ".O##EE####EE##O.",
  8: ".O#@T######T@#O.",
  9: ".O####MMMM####O.",
});

/** Full waterworks. */
export const CAT_CRY = cat({
  6: ".O##EE####EE##O.",
  7: ".O##TT####TT##O.",
  8: ".O#@T######T@#O.",
  9: ".O###MMMMMM###O.",
  10: ".O###M####M###O.",
});

/** Eyes squeezed shut with joy. */
export const CAT_HAPPY = cat({
  6: ".O###E####E###O.",
  7: ".O##E#E##E#E##O.",
  9: ".O###MMMMMM###O.",
  10: ".O####MMMM####O.",
});

/** Paws together, scheming. */
export const CAT_HOPEFUL = cat({
  6: ".O##E*####*E##O.",
  7: ".O##EE####EE##O.",
  9: ".O#####MM#####O.",
  12: "..O#OO####OO#O..",
});

/** Bear + panda mid-hug, heart floating above. */
export const HUG = [
  ".......HH..HH.......",
  ".......HHHHHH.......",
  ".......HHHHHH.......",
  "........HHHH........",
  ".........HH.........",
  "..OO...OO..OO...OO..",
  ".OBBO.OBBOOWWO.OWWO.",
  ".OBBBBBBBOOWWWWWWWO.",
  ".OBEBBBEBOOWEWWWEWO.",
  ".OBEBBBEBOOWEWWWEWO.",
  ".OB@BBB@BOOW@WWW@WO.",
  ".OBBMMBBBOOWWWMMWWO.",
  ".OBBBBBBBOOWWWWWWWO.",
  "..OBBBBBBOOWWWWWWO..",
  "..OBBBBBWWBBWWWWWO..",
  "..ObBBBBBOOWWWWWwO..",
  "...OBBBBBOOWWWWWO...",
  "....OOOOO..OOOOO....",
];

/** Small filled heart, used for confetti and dividers. */
export const HEART = [
  ".HH.HH.",
  "HHHHHHH",
  "HHHHHHH",
  ".HHHHH.",
  "..HHH..",
  "...H...",
];

/** Sound toggle icons, so the HUD stays pixel art instead of system emoji. */
export const SPEAKER = [
  "...OO....",
  "..OOO..O.",
  "OOOOO.O.O",
  "OOOOO.O.O",
  "OOOOO.O.O",
  "..OOO..O.",
  "...OO....",
];

export const SPEAKER_MUTED = [
  "...OO....",
  "..OOO....",
  "OOOOO.O.O",
  "OOOOO..O.",
  "OOOOO.O.O",
  "..OOO....",
  "...OO....",
];

/** Chunky cloud used in the parallax sky. */
export const CLOUD = [
  "........CCCC........",
  "......CCccccCC......",
  "...CCCcccccccccCC...",
  ".CCcccccccccccccccC.",
  "CcccccccccccccccccCC",
  "CCCCCCCCCCCCCCCCCCCC",
];

/** Four-point sparkle. */
export const SPARKLE = [
  "...*...",
  "...*...",
  "..***..",
  "*******",
  "..***..",
  "...*...",
  "...*...",
];


export type PixelRect = { x: number; y: number; w: number; fill: string };

/** Flattens a sprite into horizontal runs so the SVG stays small. */
export function toRects(rows: string[]): {
  rects: PixelRect[];
  width: number;
  height: number;
} {
  const width = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const rects: PixelRect[] = [];

  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const char = row[x];
      const fill = PALETTE[char];
      if (!fill) {
        x += 1;
        continue;
      }
      let run = 1;
      while (x + run < row.length && row[x + run] === char) run += 1;
      rects.push({ x, y, w: run, fill });
      x += run;
    }
  });

  return { rects, width, height: rows.length };
}
