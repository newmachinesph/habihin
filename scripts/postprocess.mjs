/**
 * Grades every generated plate to one house look and converts it to webp.
 *
 * "One grade per collection" is a standard the site publishes about itself, so
 * the site has to obey it. The grade is deliberately light — the generator is
 * already prompted with the palette, and a heavy pass turns bone into mud.
 *
 * Raw PNGs move to plates-raw/ (gitignored) so a re-grade never needs a
 * re-generation.
 *
 *   node scripts/postprocess.mjs
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve("public/plates");
const RAW = path.resolve("plates-raw");
const MAX = 1600;

fs.mkdirSync(RAW, { recursive: true });

const pngs = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".png"))
  .sort();

if (pngs.length === 0) {
  console.log("nothing to process");
  process.exit(0);
}

let ok = 0;
const failed = [];

for (const file of pngs) {
  const seed = file.replace(/\.png$/, "");
  const src = path.join(DIR, file);
  const out = path.join(DIR, `${seed}.webp`);
  try {
    const img = sharp(src);
    const meta = await img.metadata();
    const long = Math.max(meta.width, meta.height);

    await img
      .resize(
        long > MAX
          ? {
              width: meta.width >= meta.height ? MAX : undefined,
              height: meta.height > meta.width ? MAX : undefined,
              fit: "inside",
              withoutEnlargement: true,
            }
          : undefined,
      )
      .modulate({ saturation: 0.92 })
      .linear(1.03, -4)
      .webp({ quality: 82, effort: 5 })
      .toFile(out);

    fs.renameSync(src, path.join(RAW, file));
    ok++;
  } catch (e) {
    failed.push(`${seed}: ${String(e).slice(0, 120)}`);
  }
}

const sizes = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".webp"))
  .map((f) => fs.statSync(path.join(DIR, f)).size);

console.log(
  `graded ${ok} · failed ${failed.length} · webp total ${(sizes.reduce((a, b) => a + b, 0) / 1e6).toFixed(1)}MB · avg ${Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length / 1024)}KB`,
);
if (failed.length) console.log(failed.join("\n"));
