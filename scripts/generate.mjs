/**
 * Drives the Codex bridge over the plate manifest.
 *
 * - Priority-ordered: home first, study interiors last, so an interrupted run
 *   still leaves every main page fully plated.
 * - Skips seeds that already have a PNG or a WEBP.
 * - One retry per seed, then it is logged as dropped. Nothing is silently skipped.
 * - Appends one JSON line per attempt to scripts/generate.log.jsonl.
 *
 *   node scripts/generate.mjs [concurrency] [limit]
 */

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { buildManifest, promptFor } from "./manifest.mjs";

const CONCURRENCY = Number(process.argv[2] || 4);
const LIMIT = Number(process.argv[3] || 0);
const OUT = path.resolve("public/plates");
const LOG = path.resolve("scripts/generate.log.jsonl");

fs.mkdirSync(OUT, { recursive: true });

const has = (seed) =>
  fs.existsSync(path.join(OUT, `${seed}.png`)) ||
  fs.existsSync(path.join(OUT, `${seed}.webp`));

const all = buildManifest();
const pending = all.filter((e) => !has(e.seed));
let queue = LIMIT > 0 ? pending.slice(0, LIMIT) : pending;

/** Run a second instance with --reverse to work the queue from the far end.
 *  Lock files keep the two from generating the same seed twice. */
if (process.argv.includes("--reverse")) queue = queue.slice().reverse();

const lockPath = (seed) => path.join(OUT, `.${seed}.lock`);

function claim(seed) {
  try {
    fs.writeFileSync(lockPath(seed), String(process.pid), { flag: "wx" });
    return true;
  } catch {
    return false; // another worker holds it
  }
}

const release = (seed) => {
  try {
    fs.unlinkSync(lockPath(seed));
  } catch {}
};

const log = (row) =>
  fs.appendFileSync(LOG, JSON.stringify({ t: new Date().toISOString(), ...row }) + "\n");

console.log(
  `manifest ${all.length} · already present ${all.length - pending.length} · queued ${queue.length} · concurrency ${CONCURRENCY}`,
);

function runOne(entry) {
  return new Promise((resolve) => {
    // The prompt goes in over stdin ("-"), so no shell escaping can mangle it.
    const args = ["exec", "--skip-git-repo-check", "--sandbox", "workspace-write", "-"];
    const child = spawn("codex", args, {
      cwd: process.cwd(),
      shell: true,
      windowsHide: true,
    });
    let err = "";
    child.stderr.on("data", (d) => (err += d.toString().slice(0, 400)));
    child.stdout.on("data", () => {});
    child.stdin.write(promptFor(entry));
    child.stdin.end();
    const timer = setTimeout(() => child.kill(), 5 * 60 * 1000);
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ ok: has(entry.seed), code, err: err.slice(-300) });
    });
    child.on("error", (e) => {
      clearTimeout(timer);
      resolve({ ok: false, code: -1, err: String(e).slice(0, 300) });
    });
  });
}

let done = 0;
let failed = 0;
const dropped = [];

async function worker(id) {
  while (queue.length) {
    const entry = queue.shift();
    if (!entry) return;
    if (has(entry.seed) || !claim(entry.seed)) continue;
    let res = await runOne(entry);
    if (!res.ok) res = await runOne(entry); // one retry, then report
    release(entry.seed);
    done++;
    if (res.ok) {
      log({ seed: entry.seed, tier: entry.tier, ok: true });
    } else {
      failed++;
      dropped.push(entry.seed);
      log({ seed: entry.seed, tier: entry.tier, ok: false, err: res.err });
    }
    console.log(
      `[${done}/${done + queue.length}] w${id} ${res.ok ? "ok  " : "FAIL"} ${entry.seed} (${entry.tier})`,
    );
  }
}

await Promise.all(
  Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1)),
);

console.log(`\ndone. generated ${done - failed}, dropped ${failed}`);
if (dropped.length) console.log("dropped seeds:", dropped.join(", "));
