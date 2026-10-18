/**
 * The folio: house data, plate helpers, and the copy that repeats across pages.
 * Art direction for every seed lives in scripts/manifest.mjs, keyed by the same
 * seed strings used here.
 */

/** Written by scripts/sync-plates.mjs after each generation run. */
import { GENERATED } from "./generated";

/** Flat ivory ground. Blurs to itself, so the blur-up reads as the plate filling. */
export const BLUR =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='10'%3E%3Crect width='8' height='10' fill='%23E3DAC8'/%3E%3C/svg%3E";

/** House plates, generated and committed. Falls back to a seeded placeholder
 *  for any slot not yet produced, so the layout is never missing an image. */
export function plate(seed: string, w: number, h: number): string {
  return GENERATED.has(seed)
    ? `/plates/${seed}.webp`
    : `https://picsum.photos/seed/habihan-${seed}/${w}/${h}`;
}

export const EMAIL = "studio@habihan.ph";

export type Discipline = {
  n: string;
  slug: string;
  name: string;
  line: string;
  claim: string;
  mechanism: string;
  deliverables: string[];
  plates: { seed: string; w: number; h: number }[];
};

export const DISCIPLINES: Discipline[] = [
  {
    n: "01",
    slug: "product-imagery",
    name: "Product imagery",
    line: "Every SKU, gallery-ready.",
    claim: "Every SKU, gallery-ready.",
    mechanism:
      "The garment is captured once at the fitting; the atelier develops packshots, ghost mannequins, flat lays, and detail crops for every colourway out of that single session. Piña and jusi are lit for the weave, not flattened against it.",
    deliverables: [
      "packshots",
      "ghost mannequin",
      "flat lay",
      "weave crops",
      "marketplace sets",
      "hero banners",
    ],
    plates: [
      { seed: "svc-01-a", w: 1536, h: 1024 },
      { seed: "svc-01-b", w: 1536, h: 1024 },
    ],
  },
  {
    n: "02",
    slug: "campaign-editorial",
    name: "Campaign & editorial",
    line: "House faces, held season to season.",
    claim: "House faces, held season to season.",
    mechanism:
      "Habihan keeps a stable of exclusive house models, cast Filipina and Southeast Asian first, held for your brand across the season and available without a call sheet.",
    deliverables: [
      "campaign plates",
      "editorial series",
      "seasonal cover",
      "social crops",
    ],
    plates: [
      { seed: "svc-02-a", w: 1024, h: 1536 },
      { seed: "svc-02-b", w: 1024, h: 1536 },
      { seed: "svc-02-c", w: 1024, h: 1536 },
    ],
  },
  {
    n: "03",
    slug: "fashion-film",
    name: "Fashion film",
    line: "Motion cut from the same cloth.",
    claim: "Motion cut from the same cloth.",
    mechanism:
      "Film is developed from the collection's own plates, so the campaign and the reel share one grade, one light, one face. Butterfly sleeves are shot moving, because that is the only way they read.",
    deliverables: [
      "15s and 30s campaign films",
      "vertical reels",
      "runway loops",
      "storefront ambient loops",
    ],
    plates: [
      { seed: "svc-03-a", w: 1536, h: 1024 },
      { seed: "svc-03-b", w: 1536, h: 1024 },
    ],
  },
  {
    n: "04",
    slug: "lookbooks",
    name: "Lookbooks & catalogues",
    line: "The collection, bound.",
    claim: "The collection, bound.",
    mechanism:
      "Sequence, spreads, and pricing pages are built by the same hands that made the plates. Print-ready PDF and a digital edition come out of one layout, so nothing is handed over half-finished.",
    deliverables: [
      "print PDF",
      "digital lookbook",
      "wholesale linesheet",
      "carousel edition",
    ],
    plates: [
      { seed: "svc-04-a", w: 1536, h: 1024 },
      { seed: "svc-04-b", w: 1536, h: 1024 },
    ],
  },
  {
    n: "05",
    slug: "ecommerce-suites",
    name: "Ecommerce suites",
    line: "One SKU, every storefront.",
    claim: "One SKU, every storefront.",
    mechanism:
      "Each product ships as a complete suite sized per channel (Shopify, Zalora, Shopee, Lazada, TikTok Shop), named to your PIM convention and delivered as one archive.",
    deliverables: [
      "PDP sets",
      "marketplace sets",
      "email crops",
      "size-guide plates",
    ],
    plates: [
      { seed: "svc-05-a", w: 1024, h: 1024 },
      { seed: "svc-05-b", w: 1024, h: 1024 },
    ],
  },
  {
    n: "06",
    slug: "market-adaptation",
    name: "Market adaptation",
    line: "One campaign, six markets.",
    claim: "One campaign, six markets.",
    mechanism:
      "The same campaign is re-cast, re-lit, and re-captioned for each market, Manila to Tokyo, without producing it a second time.",
    deliverables: [
      "per-market casting",
      "localized copy decks",
      "currency and format variants",
    ],
    plates: [
      { seed: "svc-06-a", w: 1024, h: 1536 },
      { seed: "svc-06-b", w: 1024, h: 1536 },
    ],
  },
];

export const PHASES = [
  {
    n: "01",
    name: "Brief",
    body: "You send the range plan and references; the house returns a scoped proposal and a plate list.",
    days: "2 days",
    gloss: "Range plan in",
  },
  {
    n: "02",
    name: "Art direction",
    body: "Palettes, casting direction, and light references arrive as a signed-off direction board before anything is produced.",
    days: "2 days",
    gloss: "Direction board signed",
  },
  {
    n: "03",
    name: "The fitting",
    body: "Garments are couriered to Manila and captured under the house standard. They are logged in by piece, kept in a dehumidified room, and back in your hands within the week.",
    days: "2 days in studio",
    gloss: "Garments in studio",
  },
  {
    n: "04",
    name: "Production",
    body: "The atelier develops the full plate list from the fitting. This is the workroom; its methods stay in the workroom.",
    days: "3 days",
    gloss: "The plate list is built",
  },
  {
    n: "05",
    name: "Retouch & grade",
    body: "Every plate is finished to one grade and checked against the direction board. Weave stays weave; we do not smooth piña into plastic.",
    days: "2 days",
    gloss: "One grade, checked",
  },
  {
    n: "06",
    name: "Delivery",
    body: "One archive, named and sized per channel, with the lookbook and films alongside. Revisions ride on the same standard.",
    days: "1 day",
    gloss: "One sorted archive",
  },
];

export const STANDARDS = [
  {
    short: "one grade per collection",
    long: "A collection is graded once. Every plate, every film, every storefront crop leaves under the same light, so nothing you publish looks borrowed from another shoot.",
  },
  {
    short: "the weave is never retouched out",
    long: "Piña, jusi, inabel, t'nalak: the texture is the product. We light the weave and we leave it. A barong smoothed into a flat white shape has been photographed badly.",
  },
  {
    short: "house models held exclusive",
    long: "A face cast to your brand is held for your brand within its category for the season. Nobody in your aisle gets the same one.",
  },
  {
    short: "garments insured and dehumidified",
    long: "Samples are insured from the moment they are signed for until they are couriered back, logged in and out by piece, and kept in a controlled room. Manila humidity has ruined more samples than any courier.",
  },
];

export type Tag = "product" | "campaign" | "film" | "lookbook";

export type Shot = {
  seed: string;
  w: number;
  h: number;
  label: string;
};

export type Study = {
  slug: string;
  no: string;
  title: string;
  scope: string;
  season: string;
  plateCount: number;
  disciplines: string;
  tags: Tag[];
  cover: { seed: string; w: number; h: number };
  intro: string;
  plates: Shot[];
};

const P = { w: 1024, h: 1536 } as const; // portrait
const L = { w: 1536, h: 1024 } as const; // landscape
const S = { w: 1024, h: 1024 } as const; // square

function shots(prefix: string, list: [string, keyof typeof SHAPES][]): Shot[] {
  return list.map(([label, shape], i) => ({
    seed: `${prefix}-p${i + 1}`,
    label,
    ...SHAPES[shape],
  }));
}

const SHAPES = { P, L, S };

export const STUDIES: Study[] = [
  {
    slug: "terno-at-noon",
    no: "01",
    title: "Terno, at noon.",
    scope: "Resort capsule",
    season: "Resort 2027",
    plateCount: 142,
    disciplines: "campaign, lookbook, storefront suite",
    tags: ["campaign", "lookbook"],
    cover: { seed: "study-01", ...L },
    intro:
      "A house study, not a client engagement. We took a twelve-piece resort capsule built on the terno's butterfly sleeve and produced everything a brand would need to launch it (campaign, lookbook, and a full storefront suite) to find out what ten working days actually buys.",
    plates: shots("study-01", [
      ["Opening", "L"],
      ["Butterfly sleeve", "P"],
      ["Full length", "P"],
      ["The weave", "S"],
      ["Turning", "P"],
      ["Shoulder", "P"],
      ["Noon light", "L"],
      ["Hem", "S"],
    ]),
  },
  {
    slug: "escolta-after-rain",
    no: "02",
    title: "Escolta, after the rain.",
    scope: "Outerwear range",
    season: "Habagat 2026",
    plateCount: 96,
    disciplines: "campaign, film",
    tags: ["campaign", "film"],
    cover: { seed: "study-02", ...P },
    intro:
      "Manila's rainy season is not a scheduling problem to be photographed around; it is the light this city actually has. A house study shot on Escolta's art deco block during habagat, asking whether a wet-street campaign holds its grade across a film cut and forty stills.",
    plates: shots("study-02", [
      ["Escolta", "L"],
      ["Collar", "P"],
      ["Walking", "P"],
      ["Wet stone", "S"],
      ["Arcade", "P"],
      ["Cuff", "S"],
      ["The block", "L"],
      ["Still", "P"],
    ]),
  },
  {
    slug: "ninety-whites",
    no: "03",
    title: "Ninety whites.",
    scope: "Barong and shirting programme",
    season: "Core",
    plateCount: 214,
    disciplines: "product, ecommerce suite",
    tags: ["product"],
    cover: { seed: "study-03", ...P },
    intro:
      "Ninety white shirts is the hardest product brief there is: nothing separates them but cut and cloth. Half of these are barongs in piña and jusi, where the whole value of the garment is a weave a careless retoucher would erase. The whole job is keeping ninety near-identical pieces apart.",
    plates: shots("study-03", [
      ["Packshot", "P"],
      ["Ghost mannequin", "P"],
      ["Piña weave", "S"],
      ["Placket", "S"],
      ["Rack", "L"],
      ["Cuff", "S"],
      ["Jusi", "S"],
      ["Set", "L"],
    ]),
  },
  {
    slug: "the-long-room",
    no: "04",
    title: "The long room.",
    scope: "Evening collection",
    season: "Holiday 2026",
    plateCount: 118,
    disciplines: "campaign, lookbook",
    tags: ["campaign", "lookbook"],
    cover: { seed: "study-04", ...P },
    intro:
      "Evening wear photographs badly in a hurry: the fabric does the work, and fabric needs time. We held one light across a twenty-piece collection of ternos and column gowns, shot in a single long room in Intramuros.",
    plates: shots("study-04", [
      ["Entrance", "L"],
      ["Train", "P"],
      ["Bodice", "S"],
      ["Turn", "P"],
      ["The long room", "L"],
      ["Beadwork", "S"],
      ["Full length", "P"],
      ["Exit", "P"],
    ]),
  },
  {
    slug: "banig-folded-twice",
    no: "05",
    title: "Banig, folded twice.",
    scope: "Accessories",
    season: "Tag-init 2027",
    plateCount: 74,
    disciplines: "product, campaign",
    tags: ["product", "campaign"],
    cover: { seed: "study-05", ...S },
    intro:
      "Woven buri and abaca under hard noon light. The question was whether an accessories range can carry a campaign on its own, with no garment behind it and nothing to hide a flat weave.",
    plates: shots("study-05", [
      ["The weave", "S"],
      ["In hand", "P"],
      ["Flat lay", "L"],
      ["Edge", "S"],
      ["Stacked", "S"],
      ["Carried", "P"],
      ["Noon", "L"],
      ["Handle", "S"],
    ]),
  },
  {
    slug: "six-markets",
    no: "06",
    title: "One look, six markets.",
    scope: "Market adaptation",
    season: "Spring 2027",
    plateCount: 186,
    disciplines: "campaign, market adaptation",
    tags: ["campaign"],
    cover: { seed: "study-06", ...L },
    intro:
      "The same six looks, re-cast and re-lit for Manila, Bangkok, Jakarta, Ho Chi Minh City, Tokyo, and Seoul. It tests how far one campaign travels before it has to be rebuilt from zero.",
    plates: shots("study-06", [
      ["Manila", "P"],
      ["Tokyo", "P"],
      ["Seoul", "P"],
      ["Bangkok", "P"],
      ["Jakarta", "P"],
      ["Ho Chi Minh", "P"],
      ["The set", "L"],
      ["Side by side", "L"],
    ]),
  },
  {
    slug: "the-uniform-index",
    no: "07",
    title: "The uniform index.",
    scope: "Uniform programme",
    season: "Core",
    plateCount: 130,
    disciplines: "product, ecommerce suite",
    tags: ["product"],
    cover: { seed: "study-07", ...P },
    intro:
      "Nobody photographs uniforms for pleasure. One hospitality programme, four fits, eleven sizes, and a naming convention that survives a PIM import without somebody cleaning a spreadsheet for a week afterwards.",
    plates: shots("study-07", [
      ["Fit", "P"],
      ["Seam", "S"],
      ["Rack", "L"],
      ["Label", "S"],
      ["Ghost", "P"],
      ["Stack", "S"],
      ["Four fits", "L"],
      ["Detail", "S"],
    ]),
  },
  {
    slug: "twelve-seconds",
    no: "08",
    title: "Twelve seconds, vertical.",
    scope: "Film capsule",
    season: "Spring 2027",
    plateCount: 48,
    disciplines: "film, social",
    tags: ["film"],
    cover: { seed: "study-08", ...P },
    intro:
      "Cut for the phone: twelve-second verticals developed from a single fitting, sharing their grade with the stills they were built beside. The sleeve moves or the garment does not sell.",
    plates: shots("study-08", [
      ["00:03", "P"],
      ["00:07", "P"],
      ["00:09", "P"],
      ["00:12", "P"],
      ["Motion", "L"],
      ["Hem", "S"],
      ["Frame", "L"],
      ["Hold", "P"],
    ]),
  },
  {
    slug: "bound-in-inabel",
    no: "09",
    title: "Bound in inabel.",
    scope: "Lookbook",
    season: "Amihan 2026",
    plateCount: 88,
    disciplines: "lookbook, print",
    tags: ["lookbook"],
    cover: { seed: "study-09", ...L },
    intro:
      "Sixty-four pages, print and digital, laid out from the same plates by the people who shot them. The cloth is Ilocos inabel in natural indigo, which reproduces badly unless somebody who saw it in the room signs off the proof.",
    plates: shots("study-09", [
      ["Spread", "L"],
      ["Indigo", "S"],
      ["Cover", "P"],
      ["Index", "L"],
      ["Loom", "S"],
      ["Full length", "P"],
      ["Colophon", "S"],
      ["Bound", "L"],
    ]),
  },
  {
    slug: "the-grade-wall",
    no: "10",
    title: "The grade wall.",
    scope: "Method study",
    season: "2026",
    plateCount: 60,
    disciplines: "product, campaign",
    tags: ["product", "campaign"],
    cover: { seed: "study-10", ...P },
    intro:
      "Every collection that passes through the studio ends up on the grade wall, plate beside plate, until the whole set reads as one. This house study is that wall, photographed.",
    plates: shots("study-10", [
      ["The wall", "L"],
      ["Pair", "S"],
      ["Check", "P"],
      ["Set", "L"],
      ["Proof", "S"],
      ["Sequence", "L"],
      ["Sign-off", "S"],
      ["Archive", "P"],
    ]),
  },
  {
    slug: "sampaguita",
    no: "11",
    title: "Sampaguita, low key.",
    scope: "Bridal capsule",
    season: "2027",
    plateCount: 102,
    disciplines: "campaign, lookbook, film",
    tags: ["campaign", "lookbook", "film"],
    cover: { seed: "study-11", ...P },
    intro:
      "White on white, under almost no light. A house study in the hardest exposure a bridal range asks for: piña over silk, at the edge of the histogram. Whether it survives being cropped to a storefront thumbnail.",
    plates: shots("study-11", [
      ["Veil", "P"],
      ["Piña", "S"],
      ["Hands", "S"],
      ["Low key", "P"],
      ["Hem", "S"],
      ["Full length", "P"],
      ["Sampaguita", "S"],
      ["Turning", "P"],
    ]),
  },
  {
    slug: "the-second-drop",
    no: "12",
    title: "The second drop.",
    scope: "Streetwear capsule",
    season: "Autumn 2026",
    plateCount: 156,
    disciplines: "product, campaign, film",
    tags: ["product", "campaign", "film"],
    cover: { seed: "study-12", ...S },
    intro:
      "On turnaround: a second drop produced entirely from the first drop's fitting, with no new garments in the studio and nobody called back to set. The brand shipped it eleven days after asking.",
    plates: shots("study-12", [
      ["Drop", "P"],
      ["Back", "P"],
      ["Stack", "S"],
      ["Crop", "S"],
      ["Street", "L"],
      ["Detail", "S"],
      ["Set", "L"],
      ["Full length", "P"],
    ]),
  },
];

export function studyBySlug(slug: string): Study | undefined {
  return STUDIES.find((s) => s.slug === slug);
}

export function nextStudy(slug: string): Study {
  const i = STUDIES.findIndex((s) => s.slug === slug);
  return STUDIES[(i + 1) % STUDIES.length];
}
