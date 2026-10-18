# Habihan

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

Six-page marketing site for Habihan, a fashion image house in Manila: brands send
the garments and the house returns campaign photography, film and lookbooks.
Home, Services, Work (twelve statically generated folio studies), Atelier, About
and a Commission brief form. Next.js 16 (App Router), React 19, Tailwind v4,
TypeScript, Lenis. Every image on the site is house-generated through a Codex
image pipeline that lives in `scripts/`.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev              # http://localhost:3000
npm run lint             # ESLint (eslint-config-next)
npm run build && npm start
npm run audit            # acceptance checks + screenshots (server on :3210)
```

`npm run audit` drives Playwright against a server already running on
`http://localhost:3210` (e.g. `npm run build && npx next start -p 3210`) and
needs a browser installed once with `npx playwright install chromium`.
Screenshots land in `audit-shots/` (gitignored).

| Variable             | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `COMMISSION_WEBHOOK` | Endpoint that receives the commission brief as a JSON POST. Optional; see "Before launch". |

## The rules the design runs on

Break these and the site stops being itself:

- **Bronze is permission.** `--color-bronze-*` appears only on things you can
  act on: links, buttons, the active index item, focus rings. Bronze on
  something un-clickable is a defect.
- **No cards, no shadows, no rounded corners.** Grouping is hairlines
  (`--color-line`) and whitespace. The only radius on the site is `2px` on form
  inputs.
- **Sienna appears exactly once**: the commission submit button, on hover.
- **Every image goes through `components/Plate.tsx`** — locked box, explicit
  width/height, ivory ground, blur-up, square corners, mount rule. Pass `ratio`
  when a row of plates must share one baseline, or the grid bottoms go ragged.
- **Reveals fail open.** `.reveal` is `opacity: 1` by default; the animation is
  CSS-only behind `prefers-reduced-motion` and `@supports` guards. A JS failure
  cannot strand content.
- **The hero pin is desktop-only.** Under 1024px the hero stacks as ordinary
  flow so the claim and both actions sit in the first viewport at 390.

## The plate pipeline

All 171 images in `public/plates/` are house-generated through the Codex bridge
and committed as graded webp. Nothing on the site is stock or placeholder.

```bash
npm run plates:generate                     # codex bridge over the manifest, 5 at a time
npm run plates:process                      # house grade + webp, then sync lib/generated.ts
npm run plates:qa                           # per-plate flags: FLAT / DARK / PALE / CHROMA / ORIENT
node scripts/contact-sheet.mjs              # tile them all for a studio-style review
node scripts/fix-orientation.mjs --apply    # delete wrong-shaped plates so they regenerate
```

- `scripts/manifest.mjs` holds the art direction for every seed — subject,
  lighting, framing — plus the shared house style block.
- `scripts/shapes.mjs` is the canonical orientation per seed. **Prompts must
  carry an explicit aspect rule.** Left to itself the generator picks its own
  ratio from the subject, and a full-length terno generated portrait then
  dropped into a 21:9 slot is cropped to a band across the model's waist. 20 of
  the first 48 plates came out wrong before this existed.
- Raw PNGs go to `plates-raw/` (gitignored) so the grade can be redone without
  regenerating.
- Two runner quirks: without `--sandbox workspace-write` the image generates but
  the write is denied (recover it from `~/.codex/generated_images/`), and the
  generator picks its own resolution regardless of what you ask for — read the
  real dimensions off the file.

The house mark in components/Mark.tsx was designed through the bridge
(public/brand/mark-a.png is the source) and then authored as SVG so it scales
and inherits currentColor. Never generate: real people's likenesses, real branded garments, charts,
or anything carrying legible text, and never a third-party logo.

## Before launch

1. **Confirm the three figures in the Home capacity row**
   (`components/MetricsRow.tsx`): 10 working days, 300+ plates, 6 markets. They
   are published service standards, not measured statistics, and they have to be
   true before they ship.
2. **Wire the commission form.** Set `COMMISSION_WEBHOOK` to an endpoint that
   accepts a JSON POST. Until it is set the form validates and then returns the
   error state directing the sender to email; it never tells anyone their brief
   arrived when nothing was sent. See `app/actions.ts`.
3. **Client quotes and client logos** ship only when real and permissioned. The
   testimonial slot is deliberately absent rather than styled-and-empty.
4. **The studio plates are generated, not documentary.** The Habihan page says so
   in a caption. Photograph the real room before dropping that line.

## Structure

```
app/            layout + six routes; work/[folio] is SSG per study;
                /maison permanently redirects to /habihan
app/actions.ts  commission form server action (posts to COMMISSION_WEBHOOK)
components/     Plate, FolioMark, FolioRail, Nav, Footer, HeroPlate, Mark,
                ServiceIndex, WorkGrid, CommissionForm, PhaseRow, MetricsRow,
                Reveal, LenisProvider
lib/folio.ts    house data: disciplines, phases, standards, twelve studies
lib/generated.ts  which seeds have a committed plate (written by sync-plates)
lib/metadata.ts site name, canonical URL, per-page Open Graph metadata
public/plates/  the committed house plates (webp)
public/brand/   source PNGs for the house mark
scripts/        manifest, shapes, generate, postprocess, sync-plates, qa-plates,
                fix-orientation, contact-sheet, figure-sheets, audit
app/globals.css tokens + the folio system + the hero scrub channels
```

The hero's scrub channels (`--m`, `--swap`, `--rule`, `--cap`, `--settle`,
`--copy`) each default in CSS to their **final** value, so the composed frame is
what renders with no JavaScript and under reduced motion. `HeroPlate.tsx` only
ever drives them backwards toward the start, and only at 1024px and above.

## License

[MIT](LICENSE) © 2026 Habihan. The MIT license covers the code; the Habihan
name and house mark identify the project.
