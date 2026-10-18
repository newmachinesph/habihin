/**
 * Quality gate for generated plates. Every plate is checked, not sampled.
 *
 *   FLAT      near-uniform frame — a failed or empty generation
 *   DARK/PALE — exposure outside the house range
 *   CHROMA    — off-palette, too much colour for a muted house grade
 *   ORIENT    — file orientation disagrees with the slot it renders in,
 *               which is how a full-length figure loses its head to a crop
 *   MISSING   — a slot with no plate, still falling back to a placeholder
 *
 *   node scripts/qa-plates.mjs [--json]
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { SHAPES, shapeOf } from "./shapes.mjs";

const DIR = path.resolve("public/plates");
const files = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".webp"))
  .sort();

const rows = [];

for (const f of files) {
  const seed = f.replace(/\.webp$/, "");
  const img = sharp(path.join(DIR, f));
  const [meta, stats] = await Promise.all([img.metadata(), img.stats()]);
  const [r, g, b] = stats.channels;
  const mean = (r.mean + g.mean + b.mean) / 3;
  const spread = (r.stdev + g.stdev + b.stdev) / 3;
  const chroma =
    Math.max(r.mean, g.mean, b.mean) - Math.min(r.mean, g.mean, b.mean);
  const got =
    meta.width === meta.height
      ? "square"
      : meta.width > meta.height
        ? "landscape"
        : "portrait";
  const want = shapeOf(seed);
  const ratio =
    Math.max(meta.width, meta.height) / Math.min(meta.width, meta.height);

  const flags = [];
  if (spread < 9) flags.push("FLAT");
  if (mean < 42) flags.push("DARK");
  if (mean > 232) flags.push("PALE");
  if (chroma > 46) flags.push("CHROMA");
  if (got !== want && !(want === "square" && ratio <= 1.15))
    flags.push(`ORIENT(want ${want}, got ${got})`);

  rows.push({
    seed,
    size: `${meta.width}x${meta.height}`,
    kb: Math.round(fs.statSync(path.join(DIR, f)).size / 1024),
    mean: Math.round(mean),
    spread: Math.round(spread),
    chroma: Math.round(chroma),
    flags,
  });
}

const bad = rows.filter((r) => r.flags.length);
const missing = [...SHAPES.keys()].filter((s) => !files.includes(`${s}.webp`));

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ rows, bad, missing }, null, 1));
} else {
  console.log(`checked ${rows.length} plates · ${bad.length} flagged\n`);
  for (const r of bad) {
    console.log(
      `  ${r.seed.padEnd(22)} ${r.size.padEnd(10)} mean=${String(r.mean).padStart(3)} spread=${String(r.spread).padStart(3)} chroma=${String(r.chroma).padStart(3)}  ${r.flags.join(" ")}`,
    );
  }
  const kb = rows.map((r) => r.kb);
  const total = kb.reduce((a, c) => a + c, 0);
  console.log(
    `\nweight: total ${(total / 1024).toFixed(1)}MB · avg ${Math.round(total / kb.length)}KB · largest ${Math.max(...kb)}KB`,
  );
  console.log(
    `coverage: ${files.length} generated · ${missing.length} slots on placeholder${missing.length ? ": " + missing.slice(0, 12).join(", ") : ""}`,
  );
}
