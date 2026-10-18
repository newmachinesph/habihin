/**
 * High-resolution contact sheets of the plates that contain people, plus a
 * second set cropped to the region where hands usually sit.
 *
 * Thumbnails at 260px verify composition and palette. They cannot show six
 * fingers, an impossible seam, or a sleeve that joins the bodice twice — which
 * are exactly the failures generated fashion imagery has. This renders the
 * figure plates large enough to judge those.
 *
 *   node scripts/figure-sheets.mjs <outDir>
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/plates");
const OUT = path.resolve(process.argv[2] || "figure-sheets");
fs.mkdirSync(OUT, { recursive: true });

/** Seeds whose brief puts a person in frame. */
const FIGURE = (seed) =>
  /^(hero|home-calendar-a|row-02|row-03|strip-01|strip-03|strip-05)$/.test(seed) ||
  /^svc-0(2|3|6)/.test(seed) ||
  /^study-(01|02|04|06|08|11|12)$/.test(seed) ||
  /^study-(01|02|04|06|08|11|12)-p/.test(seed) ||
  /^(study-05-p2|study-05-p6|study-07-p1|study-09-p6|study-10-p3|atelier-std-b|phase-03)$/.test(seed);

const files = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".webp") && FIGURE(f.replace(/\.webp$/, "")))
  .sort();

const COLS = 4;
const ROWS = 3;
const CELL = 620;
const PAD = 8;
const PER = COLS * ROWS;
const W = COLS * (CELL + PAD) + PAD;
const H = ROWS * (CELL + PAD) + PAD;

let n = 0;
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
  const file = path.join(OUT, `figures-${++n}.jpg`);
  await sharp({
    create: { width: W, height: H, channels: 3, background: { r: 25, g: 22, b: 17 } },
  })
    .composite(tiles)
    .jpeg({ quality: 86 })
    .toFile(file);
  console.log(
    `${path.basename(file)}  ${batch.length}  ${batch.map((b) => b.replace(".webp", "")).join(", ")}`,
  );
}

console.log(`\n${files.length} figure plates across ${n} sheets`);
