/**
 * Finds plates whose orientation disagrees with the slot they render in and
 * deletes them so the generator produces them again with the aspect rule.
 *
 * A landscape file in a portrait slot is not a cosmetic problem: object-fit
 * cover crops to the slot, so a full-length figure generated landscape and
 * dropped into a 2:3 box loses its head and its hem.
 *
 *   node scripts/fix-orientation.mjs          # report only
 *   node scripts/fix-orientation.mjs --apply  # delete the mismatches
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { shapeOf } from "./shapes.mjs";

const DIR = path.resolve("public/plates");
const APPLY = process.argv.includes("--apply");

const files = fs
  .readdirSync(DIR)
  .filter((f) => /\.(png|webp)$/.test(f))
  .sort();

const bad = [];

for (const f of files) {
  const seed = f.replace(/\.(png|webp)$/, "");
  const { width, height } = await sharp(path.join(DIR, f)).metadata();
  const got =
    width === height ? "square" : width > height ? "landscape" : "portrait";
  const want = shapeOf(seed);

  // A square slot tolerates anything near square; everything else must match.
  const ratio = Math.max(width, height) / Math.min(width, height);
  const okSquare = want === "square" && ratio <= 1.15;
  if (got !== want && !okSquare) {
    bad.push({ seed, f, want, got, size: `${width}x${height}` });
  }
}

console.log(`checked ${files.length} · mismatched ${bad.length}`);
for (const b of bad) {
  console.log(`  ${b.seed.padEnd(22)} want ${b.want.padEnd(9)} got ${b.got.padEnd(9)} ${b.size}`);
  if (APPLY) fs.unlinkSync(path.join(DIR, b.f));
}
if (bad.length && !APPLY) console.log("\nre-run with --apply to delete and regenerate");
if (APPLY) console.log(`\ndeleted ${bad.length}; run scripts/generate.mjs to refill`);
