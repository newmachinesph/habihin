/**
 * Tiles every plate into contact sheets, the way a studio reviews a shoot.
 * Lets the whole set be looked at rather than sampled.
 *
 *   node scripts/contact-sheet.mjs [outDir]
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/plates");
const OUT = path.resolve(process.argv[2] || "contact-sheets");
const COLS = 8;
const ROWS = 6;
const CELL = 260;
const PAD = 6;
const PER = COLS * ROWS;

fs.mkdirSync(OUT, { recursive: true });

const files = fs
  .readdirSync(DIR)
  .filter((f) => /\.(webp|png)$/.test(f))
  .sort();

const W = COLS * (CELL + PAD) + PAD;
const H = ROWS * (CELL + PAD) + PAD;

let sheet = 0;
for (let i = 0; i < files.length; i += PER) {
  const batch = files.slice(i, i + PER);
  const tiles = await Promise.all(
    batch.map(async (f, j) => ({
      input: await sharp(path.join(DIR, f))
        .resize(CELL, CELL, { fit: "cover" })
        .toBuffer(),
      left: PAD + (j % COLS) * (CELL + PAD),
      top: PAD + Math.floor(j / COLS) * (CELL + PAD),
    })),
  );

  const file = path.join(OUT, `sheet-${++sheet}.jpg`);
  await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: { r: 0x29, g: 0x24, b: 0x1d },
    },
  })
    .composite(tiles)
    .jpeg({ quality: 78 })
    .toFile(file);

  console.log(
    `${path.basename(file)}  ${batch.length} plates  ${batch[0]} … ${batch[batch.length - 1]}`,
  );
}

console.log(`\n${files.length} plates across ${sheet} sheets in ${OUT}`);
