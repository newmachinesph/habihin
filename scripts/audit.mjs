import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:3210";
const OUT = process.argv[2] || "./shots2";
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  ["home", "/"],
  ["services", "/services"],
  ["work", "/work"],
  ["folio", "/work/terno-at-noon"],
  ["atelier", "/atelier"],
  ["habihan", "/habihan"],
  ["commission", "/commission"],
];

// WCAG relative luminance + contrast
const lum = ([r, g, b]) => {
  const f = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const out = {};
const browser = await chromium.launch();

// ---- static palette contrast -------------------------------------------------
out.contrast = {
  "ink12 on ivory1": +ratio([0x29, 0x24, 0x1d], [0xf7, 0xf2, 0xe9]).toFixed(2),
  "bronze10 link on ivory1": +ratio(
    [0x7a, 0x5e, 0x1f],
    [0xf7, 0xf2, 0xe9],
  ).toFixed(2),
  "ink11 on ivory1": +ratio([0x5d, 0x56, 0x4a], [0xf7, 0xf2, 0xe9]).toFixed(2),
  "ink12 on ivory2": +ratio([0x29, 0x24, 0x1d], [0xef, 0xe8, 0xda]).toFixed(2),
  "ivory1 on slab": +ratio([0xf7, 0xf2, 0xe9], [0x1a, 0x16, 0x11]).toFixed(2),
  "ivory1 btn text on bronze9": +ratio(
    [0xf7, 0xf2, 0xe9],
    [0x94, 0x74, 0x2b],
  ).toFixed(2),
  "ivory1 btn text on sienna": +ratio(
    [0xf7, 0xf2, 0xe9],
    [0x8a, 0x4b, 0x2e],
  ).toFixed(2),
};

// ---- page audit --------------------------------------------------------------
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  let total = 0;
  out.pages = {};

  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    // force every lazy image to load before counting
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 1200));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    await page.waitForLoadState("networkidle");

    // Every image the page actually requested must come back 2xx. Checking
    // naturalWidth alone missed a 404 hero once: the element reported complete.
    const badResponses = [];
    const seenUrls = new Set();
    for (const img of await page.$$eval("img", (els) =>
      els.map((e) => e.currentSrc || e.src).filter(Boolean),
    )) {
      if (seenUrls.has(img)) continue;
      seenUrls.add(img);
      try {
        const res = await page.request.get(img);
        if (!res.ok()) badResponses.push(`${res.status()} ${img.slice(-60)}`);
      } catch {
        badResponses.push(`ERR ${img.slice(-60)}`);
      }
    }

    const r = await page.evaluate(() => {
      const imgs = [...document.images];
      const levels = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) =>
        Number(h.tagName[1]),
      );
      const skips = [];
      for (let i = 1; i < levels.length; i++)
        if (levels[i] - levels[i - 1] > 1)
          skips.push(`${levels[i - 1]}→${levels[i]}`);

      const BRONZE = ["rgb(122, 94, 31)", "rgb(148, 116, 43)"];
      const rogue = [...document.querySelectorAll("*")]
        .filter((el) => {
          if (!el.firstChild || el.firstChild.nodeType !== 3) return false;
          if (!el.textContent.trim()) return false;
          if (!BRONZE.includes(getComputedStyle(el).color)) return false;
          return !el.closest("a,button,label,summary,[role=button]");
        })
        .map((el) => `${el.tagName}.${el.className}`);

      // WCAG 2.2 AA 2.5.8 = 24x24 CSS px. Links flowing inside a text block
      // are covered by the inline exception, so they are reported separately.
      const isInline = (el) =>
        getComputedStyle(el).display === "inline" &&
        el.closest("p,li,figcaption,dd,label");
      const small = [...document.querySelectorAll("a,button")]
        .filter((el) => {
          const b = el.getBoundingClientRect();
          return b.width > 0 && (b.height < 24 || b.width < 24);
        })
        .map(
          (el) =>
            `${el.tagName}.${el.className || "-"}${isInline(el) ? " [inline-exempt]" : " [FAIL]"}`,
        );

      return {
        images: imgs.length,
        broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
        noDim: imgs.filter(
          (i) => !i.getAttribute("width") || !i.getAttribute("height"),
        ).length,
        nonEmptyAlt: imgs.filter((i) => (i.alt || "").trim() !== "").length,
        reveals: document.querySelectorAll(".reveal").length,
        h1: document.querySelectorAll("h1").length,
        skips,
        rogueBronze: rogue,
        smallTargets: small,
        radii: [
          ...new Set(
            [...document.querySelectorAll("*")].map(
              (e) => getComputedStyle(e).borderRadius,
            ),
          ),
        ].filter((v) => v !== "0px"),
        shadows: [...document.querySelectorAll("*")].filter(
          (e) => getComputedStyle(e).boxShadow !== "none",
        ).length,
        words: (document.querySelector("main")?.innerText || "").trim().split(
          /\s+/,
        ).length,
        navToggle: getComputedStyle(document.querySelector(".nav__toggle"))
          .display,
      };
    });
    total += r.images;
    out.pages[name] = { ...r, badResponses };
  }
  out.totalImages = total;
  await ctx.close();
}

// ---- hero choreography, settled properly ------------------------------------
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const span = await page.evaluate(
    () => document.querySelector(".hero").offsetHeight - window.innerHeight,
  );
  out.hero = [];
  for (const b of [0, 0.2, 0.42, 0.56, 0.64, 0.78, 1]) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(span * b));
    await page.waitForTimeout(1800);
    out.hero.push(
      await page.evaluate((beat) => {
        const s = getComputedStyle(document.querySelector(".hero__stage"));
        const g = (k) => +Number(s.getPropertyValue(k)).toFixed(2);
        return {
          beat,
          m: g("--m"),
          swap: g("--swap"),
          rule: g("--rule"),
          cap: g("--cap"),
          settle: g("--settle"),
          copy: g("--copy"),
          nav: document.documentElement.dataset.hero,
          settled: document.documentElement.dataset.settled,
        };
      }, b),
    );
    await page.screenshot({ path: `${OUT}/hero-${b}.png` });
  }

  // real contrast of ivory type over the actual plate, with the veil composited
  out.heroContrast = await page.evaluate(() => {
    const img = document.querySelector(".hero__img");
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const cx = c.getContext("2d");
    cx.drawImage(img, 0, 0);
    const band = (y0, y1) => {
      const d = cx.getImageData(
        0,
        Math.floor(c.height * y0),
        c.width,
        Math.max(1, Math.floor(c.height * (y1 - y0))),
      ).data;
      let max = [0, 0, 0];
      let maxL = -1;
      for (let i = 0; i < d.length; i += 4 * 37) {
        const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
        if (l > maxL) {
          maxL = l;
          max = [d[i], d[i + 1], d[i + 2]];
        }
      }
      return max;
    };
    return { navBand: band(0, 0.08), h1Band: band(0.4, 0.62) };
  });
  await ctx.close();
}

{
  const veil = (px, a) => px.map((v) => Math.round(v * (1 - a) + 26 * a));
  const ivory = [0xf7, 0xf2, 0xe9];
  out.heroContrast.navRatio = +ratio(
    ivory,
    veil(out.heroContrast.navBand, 0.68),
  ).toFixed(2);
  out.heroContrast.h1Ratio = +ratio(
    ivory,
    veil(out.heroContrast.h1Band, 0.57),
  ).toFixed(2);
}

// ---- mobile ------------------------------------------------------------------
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${OUT}/${name}-390.png` });
  }
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  out.mobileFirstViewport = await page.evaluate(() => {
    const inView = (el) => {
      const b = el.getBoundingClientRect();
      return b.top < window.innerHeight && b.bottom > 0 && b.width > 0;
    };
    return {
      h1: inView(document.querySelector("h1")),
      cta: inView(document.querySelector(".hero__cta a")),
      nav: inView(document.querySelector(".nav__mark")),
      scrub: document.documentElement.dataset.scrub ?? "(unset)",
      overflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    };
  });
  await page.screenshot({ path: `${OUT}/home-390-top.png` });
  await ctx.close();
}

// ---- reduced motion + no JS --------------------------------------------------
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  out.reducedMotion = await page.evaluate(() => ({
    scrub: document.documentElement.dataset.scrub ?? "(unset)",
    lenisClass: document.documentElement.className.includes("lenis"),
    heroFitsViewport:
      document.querySelector(".hero").offsetHeight <= window.innerHeight,
    h1: getComputedStyle(document.querySelector("h1")).opacity,
    cta: getComputedStyle(document.querySelector(".hero__cta")).opacity,
    mount: getComputedStyle(document.querySelector(".hero__mount")).opacity,
  }));
  await page.screenshot({ path: `${OUT}/home-reduced.png` });
  await ctx.close();
}

{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.screenshot({ path: `${OUT}/home-nojs.png` });
  // scroll down with JS off using mouse wheel, then screenshot
  await page.mouse.wheel(0, 2600);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/home-nojs-scrolled.png` });
  await ctx.close();
}

await browser.close();
console.log(JSON.stringify(out, null, 1));
