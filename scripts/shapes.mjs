/**
 * Canonical orientation per seed. Mirrors the shapes declared in lib/folio.ts
 * and in the page components.
 *
 * This exists because the generator picks its own aspect from the subject
 * unless told otherwise, and a full-length figure generated portrait then
 * dropped into a 21:9 slot gets cropped to a band across the model's waist.
 */

export const P = "portrait";
export const L = "landscape";
export const S = "square";

const STUDY_COVERS = {
  "study-01": L,
  "study-02": P,
  "study-03": P,
  "study-04": P,
  "study-05": S,
  "study-06": L,
  "study-07": P,
  "study-08": P,
  "study-09": L,
  "study-10": P,
  "study-11": P,
  "study-12": S,
};

/** Per-study interior shapes, in shot order. Mirrors lib/folio.ts. */
const STUDY_INTERIORS = {
  "study-01": [L, P, P, S, P, P, L, S],
  "study-02": [L, P, P, S, P, S, L, P],
  "study-03": [P, P, S, S, L, S, S, L],
  "study-04": [L, P, S, P, L, S, P, P],
  "study-05": [S, P, L, S, S, P, L, S],
  "study-06": [P, P, P, P, P, P, L, L],
  "study-07": [P, S, L, S, P, S, L, S],
  "study-08": [P, P, P, P, L, S, L, P],
  "study-09": [L, S, P, L, S, P, S, L],
  "study-10": [L, S, P, L, S, L, S, P],
  "study-11": [P, S, S, P, S, P, S, P],
  "study-12": [P, P, S, S, L, S, L, P],
};

const PAGE = {
  hero: L,
  "home-calendar-a": P,
  "home-calendar-b": P,
  "home-atelier": P,
  "home-house": P,
  "home-close": L,
  "services-hero": L,
  "services-scope": L,
  "atelier-hero": P,
  "atelier-std-a": P,
  "atelier-std-b": P,
  "atelier-std-c": P,
  "atelier-grade": L,
  "atelier-grade-b": L,
  "maison-founding": P,
  "maison-standard-a": L,
  "maison-standard-b": L,
  "maison-close": L,
  "commission-a": P,
  "commission-b": L,
  "commission-c": P,
  "commission-d": P,
  "svc-01-a": L,
  "svc-01-b": L,
  "svc-02-a": P,
  "svc-02-b": P,
  "svc-02-c": P,
  "svc-03-a": L,
  "svc-03-b": L,
  "svc-04-a": L,
  "svc-04-b": L,
  "svc-05-a": S,
  "svc-05-b": S,
  "svc-06-a": P,
  "svc-06-b": P,
};

export const SHAPES = new Map(Object.entries({ ...PAGE, ...STUDY_COVERS }));

for (let i = 1; i <= 6; i++) SHAPES.set(`row-0${i}`, P);
for (let i = 1; i <= 8; i++) SHAPES.set(`strip-0${i}`, P);
for (let i = 1; i <= 8; i++) SHAPES.set(`maison-studio-${i}`, P);
for (let i = 1; i <= 6; i++) SHAPES.set(`phase-0${i}`, P);

for (const [cover, list] of Object.entries(STUDY_INTERIORS)) {
  list.forEach((shape, i) => SHAPES.set(`${cover}-p${i + 1}`, shape));
}

/** The instruction the generator actually needs. */
export const ASPECT_RULE = {
  portrait:
    "Output a TALL VERTICAL PORTRAIT image, 2:3 aspect ratio, clearly taller than it is wide.",
  landscape:
    "Output a WIDE HORIZONTAL LANDSCAPE image, 3:2 aspect ratio, clearly wider than it is tall.",
  square: "Output a SQUARE image, 1:1 aspect ratio.",
};

export const shapeOf = (seed) => SHAPES.get(seed) ?? "portrait";
