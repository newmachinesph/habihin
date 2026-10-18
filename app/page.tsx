import Link from "next/link";
import FolioMark from "@/components/FolioMark";
import HeroPlate from "@/components/HeroPlate";
import MetricsRow from "@/components/MetricsRow";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { DISCIPLINES, PHASES, STUDIES } from "@/lib/folio";

/** Drawn from the folio itself, so the strip is real work rather than a
 *  separate set shot for the homepage. */
const STRIP = [
  { seed: "strip-01", w: 1200, h: 1500, label: "Evening" },
  { seed: "strip-02", w: 1200, h: 1200, label: "Cuff" },
  { seed: "strip-03", w: 1200, h: 1500, label: "Resort" },
  { seed: "strip-04", w: 1200, h: 1200, label: "Flat lay" },
  { seed: "strip-05", w: 1200, h: 1500, label: "Street" },
  { seed: "strip-06", w: 1200, h: 1200, label: "Detail" },
  { seed: "strip-07", w: 1200, h: 1500, label: "Shirting" },
  { seed: "strip-08", w: 1200, h: 1200, label: "Weave" },
  { seed: "study-03-p3", w: 1024, h: 1024, label: "Piña" },
  { seed: "study-09-p2", w: 1024, h: 1024, label: "Indigo" },
  { seed: "study-06-p2", w: 1024, h: 1536, label: "Tokyo" },
  { seed: "study-12-p1", w: 1024, h: 1536, label: "Drop" },
];

export default function Home() {
  const featured = STUDIES[0];

  return (
    <>
      <HeroPlate />

      {/* The standard */}
      <section className="sect sect--tight after-hero">
        <FolioMark label="The standard" />
        <div className="wrap">
          <MetricsRow />
        </div>
      </section>

      {/* The calendar */}
      <section className="sect">
        <FolioMark label="The calendar" />
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="t-h2">The season won&rsquo;t wait for a second shoot.</h2>
            <p className="t-body mt-8">
              A collection is photographed once. Then it has to sell everywhere:
              the campaign, the lookbook, six storefronts, four markets, and
              whatever TikTok Shop wants this month. Most studios quote you
              weeks and a freight bill for each of those separately, which is
              how a range plan signed in June misses the season it was cut for.
            </p>
            <p className="t-body mt-6">
              The house produces all of it from the garments you courier to one
              address in Manila.
            </p>
            <Link href="/services" className="lnk mt-8 inline-flex">
              See the disciplines
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>

          {/* Overlapping diptych: the rear plate sits up-left, behind. */}
          <div className="relative pb-10">
            <Reveal i={1} className="w-[62%]">
              <Plate
                seed="home-calendar-a"
                w={1200}
                h={1500}
                sizes="(min-width: 1024px) 26vw, 62vw"
                mount
              />
            </Reveal>
            <Reveal
              i={2}
              className="absolute w-[52%]"
              style={{ right: 0, bottom: 0, zIndex: 2 }}
            >
              <Plate
                seed="home-calendar-b"
                w={1600}
                h={1100}
                sizes="(min-width: 1024px) 22vw, 52vw"
                mount
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="sect">
        <FolioMark label="Disciplines" />
        <div className="wrap">
          <Reveal>
            <h2 className="t-h2">Six disciplines, one atelier.</h2>
          </Reveal>

          <div style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
            {DISCIPLINES.map((d, i) => (
              <Reveal key={d.slug} i={i % 5}>
                <Link href={`/services#${d.slug}`} className="row plate-link">
                  <span className="t-mono" style={{ color: "var(--color-ink-11)" }}>
                    {d.n}
                  </span>
                  <span>
                    <span className="t-h3 row__name">{d.name}</span>
                    <span
                      className="t-body block mt-2"
                      style={{ color: "var(--color-ink-11)" }}
                    >
                      {d.line}
                    </span>
                  </span>
                  <span className="flex items-center" style={{ gap: 24 }}>
                    <Plate
                      seed={`row-${d.n}`}
                      w={640}
                      h={800}
                      sizes="160px"
                      boxClassName="row__thumb"
                    />
                    <span className="arrow t-mono" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="sect">
        <FolioMark label="Selected work" />
        <div className="wrap">
          <Reveal>
            <Link href={`/work/${featured.slug}`} className="plate-link block">
              <div className="relative">
                <Plate
                  seed={featured.cover.seed}
                  w={2560}
                  h={1097}
                  sizes="100vw"
                  veil
                  mount
                />
                <div
                  className="absolute"
                  style={{
                    left: "clamp(20px, 4vw, 56px)",
                    bottom: "clamp(28px, 4vw, 56px)",
                    color: "var(--color-ivory-1)",
                    maxWidth: "22ch",
                  }}
                >
                  <p className="t-mono">House study Nº&nbsp;{featured.no}</p>
                  <h3 className="t-h2 mt-3">{featured.title}</h3>
                </div>
              </div>
              <p className="cap">
                <span>
                  {featured.scope} · {featured.plateCount} plates ·{" "}
                  {featured.disciplines}
                </span>
                <span className="lnk">
                  Read the folio
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </p>
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-8 grid-cols-2 md:grid-cols-5">
            {featured.plates.slice(1, 6).map((p, i) => (
              <Reveal key={p.seed} i={i}>
                <Plate
                  seed={p.seed}
                  w={p.w}
                  h={p.h}
                  sizes="(min-width: 768px) 18vw, 45vw"
                  ratio="4 / 5"
                  mount
                  label={p.label}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The atelier */}
      <section className="sect" style={{ background: "var(--color-ivory-2)" }}>
        <FolioMark label="The atelier" />
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-20">
          <Reveal>
            <h2 className="t-h2">
              Six phases. No mystery you need to manage.
            </h2>

            <ol
              className="mt-12 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
              style={{ borderTop: "1px solid var(--color-line-2)" }}
            >
              {PHASES.map((p) => (
                <li key={p.n} style={{ paddingTop: 20, paddingRight: 24 }}>
                  <p className="t-mono" style={{ color: "var(--color-ink-11)" }}>
                    {p.n}&nbsp;&nbsp;{p.name}
                  </p>
                  <p className="t-body mt-2" style={{ fontSize: "0.9375rem" }}>
                    {p.gloss}
                  </p>
                </li>
              ))}
            </ol>

            <Link href="/atelier" className="lnk mt-12 inline-flex">
              See how the house works
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>

          <Reveal i={1}>
            <Plate
              seed="home-atelier"
              w={1200}
              h={1500}
              sizes="(min-width: 1024px) 280px, 60vw"
              boxClassName="w-[200px] lg:w-[280px]"
              mount
            />
          </Reveal>
        </div>
      </section>

      {/* Recent plates */}
      <section className="sect">
        <FolioMark label="Recent plates" />
        <div className="wrap grid gap-8 grid-cols-2 lg:grid-cols-4">
          {STRIP.map((p, i) => (
            <Reveal key={p.seed} i={i % 5}>
              <Link href="/work" className="plate-link block">
                <Plate
                  seed={p.seed}
                  w={p.w}
                  h={p.h}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  ratio="4 / 5"
                  mount
                />
                <p className="cap">
                  <span>{p.label}</span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The house */}
      <section className="sect" style={{ background: "var(--color-ivory-2)" }}>
        <FolioMark label="The house" />
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <p className="t-quote">
              Habihan began with a frustration. We kept watching Filipino
              collections we admired reach market behind photography that
              undersold them. Piña lit like polyester, a terno&rsquo;s sleeve
              flattened into a
              shape, a weave somebody&rsquo;s retoucher had smoothed away
              entirely. The fix was never another moodboard. It was rebuilding
              the studio around the garment, and it is why the folio on this
              site is our only brochure.
            </p>
            <p className="t-mono mt-10" style={{ color: "var(--color-ink-11)" }}>
              The principals, Habihan, 2026
            </p>
          </Reveal>

          <Reveal i={1}>
            <Plate
              seed="home-house"
              w={1200}
              h={1600}
              sizes="(min-width: 1024px) 34vw, 90vw"
              mount
              label="The flat-lay table"
            />
          </Reveal>
        </div>
      </section>

      {/* Commission */}
      <section className="slab on-slab">
        <div className="slab__plate" aria-hidden="true">
          <Plate seed="home-close" w={2560} h={1097} sizes="100vw" />
        </div>
        <div
          className="wrap relative"
          style={{ paddingBlock: "clamp(96px, 11vw, 160px)" }}
        >
          <p className="t-mono">Commission</p>
          <h2 className="t-h2 mt-6">Bring the next collection.</h2>
          <p className="t-lede mt-6">
            Reply within two working days, a scoped proposal within five.
          </p>
          <Link href="/commission" className="btn btn--slab mt-10">
            Commission the house
          </Link>
        </div>
      </section>
    </>
  );
}
