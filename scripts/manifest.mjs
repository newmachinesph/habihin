/**
 * Art direction for every plate on the site, keyed by the seed used in
 * lib/folio.ts. Build-time only — never imported by the app.
 *
 * Direction (2027 editorial): cinematic and quiet, muted grading, soft key,
 * film texture, texture retained rather than retouched away. Rooted in
 * Philippine craft: the terno's butterfly sleeve, piña from Aklan, jusi,
 * inabel from Ilocos, t'nalak from South Cotabato, buri and abaca weave.
 */

import { ASPECT_RULE, shapeOf } from "./shapes.mjs";

const HOUSE =
  "Editorial fashion photograph, cinematic and quiet, shot on medium format with a fast prime. " +
  "Muted desaturated palette graded toward an ivory #F7F2E9 ground and deep warm-black #29241D shadows; " +
  "warm neutrals, bone, oatmeal, clay and faded indigo only — no bright saturated colour, no neon, no pure white. " +
  "Fine film grain, natural fabric and skin texture fully retained, nothing plastic or over-retouched. " +
  "Composed, unhurried, expensive restraint. " +
  "No text, no lettering, no logos, no watermarks, no brand marks, no signage, no captions, " +
  "no recognisable real person, no celebrity likeness. " +
  // Hands are where generated fashion imagery fails, and a six-fingered hand
  // on a campaign plate destroys the credibility everything else builds.
  "Keep hands out of frame wherever the shot allows. Where a hand must appear it has to be " +
  "anatomically correct: exactly five fingers, natural proportions, natural joints, nothing fused, " +
  "bent backwards or duplicated. Garment construction must be plausible: seams, sleeves and closures " +
  "join the way real tailoring joins.";

const KEY =
  "one large soft key from camera left through diffusion, deep soft falloff to the right, no hard specular";
const NOON = "hard high tropical noon sun, crisp shadow edges, bleached highlights held in check";
const WINDOW = "north-facing window light, overcast Manila afternoon, very soft and even";
const LOW = "low-key single source, most of the frame in shadow, exposure held at the edge of the histogram";

const F = (seed, subject, light = KEY, extra = "") => ({ seed, subject, light, extra });

/* ---------- Home ---------------------------------------------------------- */

const HOME = [
  F(
    "home-calendar-a",
    "A Filipina model in her late twenties, waist-up, wearing a modern terno with sculpted butterfly sleeves in bone-coloured piña blend, standing three-quarters to camera, calm and unsmiling, natural skin texture",
    KEY,
  ),
  F(
    "home-calendar-b",
    "A single garment rail in a quiet studio, six ivory and oatmeal garments on wooden hangers, shallow depth of field, the nearest sleeve in focus",
    WINDOW,
  ),
  F(
    "row-01",
    "A folded ivory linen shirt on a pale studio table photographed from above at a slight angle, crisp fold lines, weave clearly visible",
    KEY,
  ),
  F(
    "row-02",
    "A Filipina model in her late twenties, head and shoulders, wearing an oatmeal structured jacket, looking just past camera, editorial campaign portrait",
    KEY,
  ),
  F(
    "row-03",
    "A motion-blurred frame of a butterfly-sleeved terno mid-turn, the sleeve caught in movement, model's face soft and out of focus",
    KEY,
  ),
  F(
    "row-04",
    "An open bound lookbook on a pale table, thick uncoated paper, a garment photograph filling the right page, edge-on perspective",
    WINDOW,
  ),
  F(
    "row-05",
    "A single bone-coloured blouse on an invisible ghost mannequin against a seamless ivory background, centred, ecommerce packshot",
    KEY,
  ),
  F(
    "row-06",
    "The same oatmeal jacket photographed twice side by side in one frame on two different neutral grounds, a study in market variants",
    KEY,
  ),
  F(
    "home-atelier",
    "A studio workroom corner: a wide pale table, folded cloth, tailor's shears, a steamer, a roll of unbleached fabric, no people",
    WINDOW,
  ),
  F(
    "home-house",
    "An overhead flat-lay table in a studio: three folded garments in bone and clay, a tape measure, a linen swatch card, arranged with generous empty space",
    WINDOW,
  ),
  F(
    "home-close",
    "A dim studio interior at night. A single ivory terno on a dress form stands right of centre and is clearly visible, lit by one shaft of warm light; the surrounding room falls away into shadow. The garment must read clearly — do not render an almost entirely black frame",
    "one warm shaft of light falling on the garment from the right, the rest of the room in soft shadow, still legible",
  ),
];

const STRIP = [
  ["strip-01", "A full-length column gown in warm bone silk on a Filipina model, shot against a plain plaster wall"],
  ["strip-02", "A close crop of a shirt cuff and three shell buttons, thread and weave visible"],
  ["strip-03", "A Filipina model in a loose resort shirt and wide trousers, seen from behind, walking away"],
  ["strip-04", "An overhead flat lay of a folded barong in translucent piña over a dark under-layer"],
  ["strip-05", "A model in an oversized clay-coloured coat on a wet Manila street at dusk, reflections on stone"],
  ["strip-06", "A macro crop of handwoven indigo inabel cloth, the geometric weave filling the frame"],
  ["strip-07", "Two white shirts on ghost mannequins side by side, subtly different collars"],
  ["strip-08", "A macro crop of woven buri and abaca, the plait filling the frame at an angle"],
];

/* ---------- Services ------------------------------------------------------ */

const SERVICES = [
  F(
    "services-hero",
    "A wide fitting room: a Filipina model standing on a low platform in a half-pinned ivory terno, a dress form beside her, garment rail behind, seen from a distance",
    WINDOW,
  ),
  F("svc-01-a", "A bone linen shirt laid flat and lit for texture, photographed square-on from above, edge-to-edge weave detail", KEY),
  F("svc-01-b", "The same bone shirt on an invisible ghost mannequin against seamless ivory, three-quarter angle, ecommerce packshot", KEY),
  F("svc-02-a", "Campaign portrait of a Filipina house model in a clay-coloured terno, waist-up, direct to camera, unsmiling", KEY),
  F("svc-02-b", "The same house model in a bone jacket, three-quarter turn, editorial campaign frame", KEY),
  F("svc-02-c", "The same house model full-length in a long oatmeal coat against a plaster wall", KEY),
  F("svc-03-a", "A cinematic film still: a butterfly sleeve caught mid-movement, motion blur across the frame, model soft behind it", KEY),
  F("svc-03-b", "A cinematic film still of a model walking a bare studio floor toward camera, shallow focus, wide frame", KEY),
  F("svc-04-a", "An open lookbook spread on a pale surface, a full-bleed garment plate on the left page and a small block of unreadable body text on the right", WINDOW),
  F("svc-04-b", "A stack of three printed lookbooks on uncoated paper on a pale table, edges and spines visible, seen at a low angle", WINDOW),
  F("svc-05-a", "One bone blouse shown in five crops arranged as a neat grid on an ivory ground, ecommerce suite layout", KEY),
  F("svc-05-b", "A single clay-coloured bag centred on a seamless ivory ground, square marketplace packshot", KEY),
  F("svc-06-a", "A Filipina model in an ivory terno against a warm plaster wall, campaign frame for a Manila market", KEY),
  F("svc-06-b", "An East Asian model in the same ivory terno against a cool grey concrete wall, campaign frame for a Tokyo market", KEY),
  F("services-scope", "An overhead view of a range plan laid out on a table: fabric swatches, folded cloth samples and a stack of blank cards, no writing visible", WINDOW),
];

/* ---------- Atelier ------------------------------------------------------- */

const ATELIER = [
  F("atelier-hero", "A tall studio window with a dress form in front of it wearing a half-finished ivory terno, the room otherwise bare", WINDOW),
  F("phase-01", "A pale table with fabric swatches and folded cloth arranged in a loose grid, hands absent", WINDOW),
  F("phase-02", "A direction board on a studio wall: pinned fabric swatches, torn paper, and tonal photographic prints, all in warm neutrals, nothing legible", WINDOW),
  F("phase-03", "A garment being pinned onto a dress form, a hand adjusting the shoulder seam, close and shallow", WINDOW),
  F("phase-04", "A studio floor seen from above during production: a seamless sweep, a light stand, one garment on the ground, no people", KEY),
  F("phase-05", "Two nearly identical garment prints side by side on a pale surface, one slightly warmer, being compared", WINDOW),
  F("phase-06", "A stack of neatly folded finished garments in bone and clay wrapped in tissue, ready to ship", WINDOW),
  F("atelier-std-a", "A macro crop of piña cloth held against the light, the fibres translucent and clearly individual", WINDOW),
  F("atelier-std-b", "A Filipina house model's portrait in profile against a plain warm ground, campaign casting frame", KEY),
  F("atelier-std-c", "A dehumidified sample room: garments in breathable covers on a rail, a hygrometer on the wall, cool even light", WINDOW),
  F("atelier-grade", "A long studio wall covered edge to edge with dozens of tonal garment prints in a precise grid, seen straight on", WINDOW),
  F("atelier-grade-b", "A close view of two garment prints pinned side by side on that wall, subtly different in tone", WINDOW),
];

/* ---------- Maison -------------------------------------------------------- */

const MAISON = [
  F("maison-founding", "A wide, quiet studio interior: bare plaster walls, a long pale table, one dress form, tall windows, no people", WINDOW),
  F("maison-standard-a", "A macro crop of handwoven t'nalak abaca cloth, the ikat pattern filling the frame in faded clay and bone", WINDOW),
  F("maison-standard-b", "A garment log book open on a table beside folded cloth in a protective cover, no legible writing", WINDOW),
  ...[
    ["maison-studio-1", "A fitting room with a mirror, a low platform and a single dress form, empty"],
    ["maison-studio-2", "A wall of tonal garment prints pinned in a grid, the grade wall, seen at an angle"],
    ["maison-studio-3", "An overhead flat-lay table with folded cloth, shears and a tape measure arranged loosely"],
    ["maison-studio-4", "A long sample rail of garments in breathable covers in a cool bare room"],
    ["maison-studio-5", "A lighting bay: a large diffusion frame and a seamless paper sweep, no people, no garments"],
    ["maison-studio-6", "Archive shelving with flat boxes and rolled fabric, warm shadow, no labels legible"],
    ["maison-studio-7", "A courier desk with wrapped parcels in plain paper and a roll of tape, no writing visible"],
    ["maison-studio-8", "A steaming station: a garment steamer beside a hanging ivory dress, faint visible steam"],
  ].map(([seed, subject]) => F(seed, subject, WINDOW)),
  F("maison-close", "A dark, near-black studio at night, a single ivory garment on a form catching the only light", LOW),
];

const COMMISSION = [
  F("commission-a", "A fitting in progress: a garment on a dress form with pins along the shoulder, close and quiet", WINDOW),
  F("commission-b", "Archive shelving with flat grey boxes and rolled cloth, seen straight on", WINDOW),
  F("commission-c", "A rail of sample garments in breathable covers seen down its length, each with a small blank fabric tag, shallow focus falling away", WINDOW),
  F("commission-d", "Folded garments wrapped in tissue inside an open plain shipping box on a pale table, ready to courier, no writing anywhere", WINDOW),
];

/* ---------- Study covers and interiors ------------------------------------ */

const LOOKS = {
  "study-01": {
    look: "a twelve-piece resort capsule built on the terno's sculpted butterfly sleeve, in bone and pale clay piña blend, on a Filipina model",
    place: "an open-air terrace with white plaster walls under hard tropical noon",
    light: NOON,
  },
  "study-02": {
    look: "an outerwear range of long clay and charcoal coats, on a Filipina model",
    place: "the art deco arcade of Escolta in old Manila, wet stone after monsoon rain, dusk",
    light: "flat overcast rain light with wet-surface reflections, no sun",
  },
  "study-03": {
    look: "a shirting and barong programme, all white and bone, in translucent piña and jusi",
    place: "a seamless ivory studio sweep",
    light: KEY,
  },
  "study-04": {
    look: "an evening collection of column gowns and formal ternos in bone silk",
    place: "a long bare room with tall shuttered windows in Intramuros",
    light: LOW,
  },
  "study-05": {
    look: "an accessories range of woven buri and abaca bags and slippers in natural straw tones",
    place: "a pale studio table under hard noon light",
    light: NOON,
  },
  "study-06": {
    look: "one ivory terno look, re-cast for each market",
    place: "a plain wall, its tone changing per market",
    light: KEY,
  },
  "study-07": {
    look: "a hospitality uniform programme in oatmeal and stone, four fits",
    place: "a seamless ivory studio sweep",
    light: KEY,
  },
  "study-08": {
    look: "a vertical film capsule, a single bone dress with a moving sleeve",
    place: "a bare studio floor",
    light: KEY,
  },
  "study-09": {
    look: "a lookbook range in handwoven Ilocos inabel, natural indigo geometric weave",
    place: "a pale table and a plain wall",
    light: WINDOW,
  },
  "study-10": {
    look: "a method study of tonal garment prints",
    place: "the studio grade wall",
    light: WINDOW,
  },
  "study-11": {
    look: "a bridal capsule, white on white, piña over silk, on a Filipina model",
    place: "a dark room with one small window",
    light: LOW,
  },
  "study-12": {
    look: "a streetwear capsule in bone, clay and washed charcoal, oversized cuts",
    place: "a bare concrete wall in Manila",
    light: KEY,
  },
};

const SHOT_FRAMING = {
  Opening: "a wide establishing frame, subject small in a large space",
  "Butterfly sleeve": "a close crop on the sculpted butterfly sleeve at the shoulder",
  "Full length": "a full-length standing frame, head to feet",
  "The weave": "an extreme macro crop of the cloth, weave filling the frame",
  Turning: "the model caught mid-turn, slight motion blur in the fabric",
  Shoulder: "a tight crop of the shoulder line and neck",
  "Noon light": "a wide frame with hard overhead sun and crisp shadows",
  Hem: "a low close crop of the hem and the floor",
  Escolta: "a wide street frame with deco arcade columns receding",
  Collar: "a tight crop of the coat collar turned up",
  Walking: "the model walking toward camera, mid-stride, shallow focus",
  "Wet stone": "a close abstract crop of wet paving stone with a hem entering the frame",
  Arcade: "the model standing under an arcade, framed by columns",
  Cuff: "a macro crop of a cuff and its buttons",
  "The block": "a wide architectural frame of the street, garment small in it",
  Still: "a cinematic film still, waist-up, model looking off frame",
  Packshot: "a centred ecommerce packshot on a seamless ivory ground",
  "Ghost mannequin": "an invisible ghost mannequin packshot, three-quarter angle",
  "Piña weave": "an extreme macro of translucent piña fibre against light",
  Placket: "a tight crop of the shirt placket and buttonholes",
  Rack: "a long garment rail seen down its length, shallow focus",
  Jusi: "an extreme macro of jusi cloth, soft sheen",
  Set: "several garments arranged together in one wide frame",
  Entrance: "a wide frame, the model entering from the left of a long room",
  Train: "a low frame of a gown's train spread across the floor",
  Bodice: "a close crop of the bodice and its seams",
  Turn: "the model turning away, back three-quarters",
  "The long room": "a wide symmetrical frame of the whole room",
  Beadwork: "an extreme macro of hand beadwork and thread",
  Exit: "the model leaving frame right, seen from behind",
  "In hand": "the accessory held in two hands, close, arms only",
  "Flat lay": "an overhead flat lay of several pieces with generous empty space",
  Edge: "a raking macro crop of the woven edge",
  Stacked: "several pieces stacked in a low pile on a pale table",
  Carried: "the bag carried at the model's side, waist-down crop",
  Noon: "a wide frame in hard noon light with strong cast shadows",
  Handle: "a macro crop of the woven handle and its binding",
  Manila: "a Filipina model against a warm plaster wall",
  Tokyo: "a Japanese model against a cool grey concrete wall",
  Seoul: "a Korean model against a pale minimal wall",
  Bangkok: "a Thai model against a sun-bleached ochre wall",
  Jakarta: "an Indonesian model against a deep shaded wall",
  "Ho Chi Minh": "a Vietnamese model against a weathered mint-grey wall",
  "The set": "all six looks arranged together in one wide frame",
  "Side by side": "two versions of the same look side by side in one frame",
  Fit: "a full-length frame showing the cut of the uniform",
  Seam: "a macro crop of a reinforced seam",
  Label: "a macro crop of a blank woven label with no lettering",
  Ghost: "an invisible ghost mannequin packshot",
  Stack: "a stack of folded garments seen from the side",
  "Four fits": "four garments hung side by side in one wide frame",
  Detail: "a tight detail crop of construction",
  "00:03": "a film still, the sleeve beginning to lift",
  "00:07": "a film still, the sleeve at full extension, motion blur",
  "00:09": "a film still, the model turning away",
  "00:12": "a film still, the garment settling, stillness returning",
  Motion: "a long-exposure frame of fabric in movement",
  Frame: "a wide cinematic frame with the model at the far edge",
  Hold: "a still, held portrait, model looking directly at camera",
  Spread: "an open printed lookbook spread on a pale table",
  Indigo: "an extreme macro of natural indigo handwoven cloth",
  Cover: "a closed lookbook cover on uncoated paper, no lettering",
  Index: "an open book at a page of small unreadable text blocks",
  Loom: "a wooden handloom with warp threads under tension, no people",
  Colophon: "a close crop of the last page of a book, blank",
  Bound: "a stack of bound books at a low angle",
  "The wall": "a long wall of tonal prints in a precise grid, straight on",
  Pair: "two prints pinned side by side, subtly different in tone",
  Check: "a hand holding a print up against the wall for comparison",
  Proof: "a single print lying on a pale table",
  Sequence: "a row of prints in a long horizontal line",
  "Sign-off": "a stack of prints with the top one slightly askew",
  Archive: "flat archive boxes on a shelf",
  Veil: "a veil of translucent piña over the face, very low key",
  "Piña": "an extreme macro of piña over silk, backlit",
  Hands: "a close crop of hands holding fabric, low key",
  "Low key": "a full-length frame almost entirely in shadow, one edge lit",
  Sampaguita: "a small white sampaguita flower on pale cloth, macro",
  Drop: "a full-length frame of an oversized streetwear look",
  Back: "the look seen from directly behind",
  Crop: "a tight crop of the garment's hem and hardware",
  Street: "a wide frame against a bare concrete wall",
};

/** Shot labels per study. Must match lib/folio.ts. A seed that drifts simply
 *  never gets generated and falls back to a placeholder, so drift degrades
 *  rather than breaks. */
const STUDY_SHOTS = {
  "study-01": ["Opening", "Butterfly sleeve", "Full length", "The weave", "Turning", "Shoulder", "Noon light", "Hem"],
  "study-02": ["Escolta", "Collar", "Walking", "Wet stone", "Arcade", "Cuff", "The block", "Still"],
  "study-03": ["Packshot", "Ghost mannequin", "Piña weave", "Placket", "Rack", "Cuff", "Jusi", "Set"],
  "study-04": ["Entrance", "Train", "Bodice", "Turn", "The long room", "Beadwork", "Full length", "Exit"],
  "study-05": ["The weave", "In hand", "Flat lay", "Edge", "Stacked", "Carried", "Noon", "Handle"],
  "study-06": ["Manila", "Tokyo", "Seoul", "Bangkok", "Jakarta", "Ho Chi Minh", "The set", "Side by side"],
  "study-07": ["Fit", "Seam", "Rack", "Label", "Ghost", "Stack", "Four fits", "Detail"],
  "study-08": ["00:03", "00:07", "00:09", "00:12", "Motion", "Hem", "Frame", "Hold"],
  "study-09": ["Spread", "Indigo", "Cover", "Index", "Loom", "Full length", "Colophon", "Bound"],
  "study-10": ["The wall", "Pair", "Check", "Set", "Proof", "Sequence", "Sign-off", "Archive"],
  "study-11": ["Veil", "Piña", "Hands", "Low key", "Hem", "Full length", "Sampaguita", "Turning"],
  "study-12": ["Drop", "Back", "Stack", "Crop", "Street", "Detail", "Set", "Full length"],
};

/** Re-briefs for plates that failed close inspection. Each says why. */
const OVERRIDES = {
  // Generated two hands gathering fabric, fingers fused. Take the hands out.
  "study-11-p2":
    "an extreme macro of translucent piña cloth layered over silk, backlit so the individual fibres glow, filling the whole frame. Cloth only, no hands, no body, no person in frame",
  // Hand holding the clutch read as anatomically wrong at full size.
  "study-05-p2":
    "a woven buri clutch resting upright against a pale stone block, photographed close, with a second woven piece just behind it. No hands, no person in frame",
  // Came back an empty corridor with no garment in it at all.
  "study-04-p1":
    "a wide frame of a long shuttered room in Intramuros with a Filipina model in a bone silk column gown clearly visible, walking in from the left third of the frame, small in the architecture but unmistakably present",
};

const interior = (cover, label, i) => {
  const meta = LOOKS[cover];
  const seed = `${cover}-p${i + 1}`;
  return F(
    seed,
    OVERRIDES[seed] ??
      `${SHOT_FRAMING[label] ?? "an editorial frame"}, from ${meta.look}, in ${meta.place}`,
    meta.light,
  );
};

/** Priority order: the most-visible pages generate first, so an interrupted
 *  run still leaves every main page fully plated. */
export function buildManifest() {
  const covers = Object.entries(LOOKS).map(([seed, meta]) =>
    F(seed, `A campaign cover frame for ${meta.look}, in ${meta.place}`, meta.light),
  );

  const featuredInner = STUDY_SHOTS["study-01"]
    .slice(1, 4)
    .map((label, i) => interior("study-01", label, i + 1));

  const interiors = [];
  for (const [cover, labels] of Object.entries(STUDY_SHOTS)) {
    labels.forEach((label, i) => interiors.push(interior(cover, label, i)));
  }

  const tiers = [
    ["home", [...HOME, ...STRIP.map(([s, subj]) => F(s, subj)), covers[0]]],
    ["home-featured", featuredInner],
    ["services", SERVICES],
    ["covers", covers.slice(1)],
    ["atelier", ATELIER],
    ["maison", MAISON],
    ["commission", COMMISSION],
    ["interiors", interiors],
  ];

  const seen = new Set();
  const list = [];
  for (const [tier, entries] of tiers) {
    for (const e of entries) {
      if (!e || seen.has(e.seed)) continue;
      seen.add(e.seed);
      list.push({ ...e, tier });
    }
  }
  return list;
}

export function promptFor(entry) {
  return [
    `Generate an image and save it to ./public/plates/${entry.seed}.png.`,
    ASPECT_RULE[shapeOf(entry.seed)],
    `Subject: ${entry.subject}.`,
    `Lighting: ${entry.light}.`,
    HOUSE,
  ].join(" ");
}
