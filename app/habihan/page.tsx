import type { Metadata } from "next";
import Link from "next/link";
import FolioMark from "@/components/FolioMark";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { STANDARDS } from "@/lib/folio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About Habihan",
  description:
    "Habihan is a fashion image house in Manila. How it started and the standards it holds.",
  path: "/habihan",
});

/** Roles, not invented people. Initials on colour fields until the real
 *  principals supply their own names and portraits. */
const PRINCIPALS = [
  {
    initials: "CD",
    role: "Creative direction",
    body: "Owns the direction board and signs off every grade before a plate leaves the studio.",
  },
  {
    initials: "PR",
    role: "Production",
    body: "Runs the fitting and the plate list your collection is built from.",
  },
  {
    initials: "CS",
    role: "Client services",
    body: "The person who answers within two working days, and the one who tells you which phase you're in.",
  },
];

const STUDIO = [
  { seed: "maison-studio-1", label: "The fitting room" },
  { seed: "maison-studio-2", label: "The grade wall" },
  { seed: "maison-studio-3", label: "The flat-lay table" },
  { seed: "maison-studio-4", label: "The sample rail" },
  { seed: "maison-studio-5", label: "The light bay" },
  { seed: "maison-studio-6", label: "The archive" },
  { seed: "maison-studio-7", label: "The courier desk" },
  { seed: "maison-studio-8", label: "The steam room" },
];

export default function HabihanPage() {
  return (
    <>
      <section className="sect sect--tight">
        <FolioMark label="About Habihan" />
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <h1 className="t-h1">Habihan.</h1>
            <p className="t-body mt-10">
              Habihan began with a frustration: collections we admired were
              reaching market behind photography that undersold them. Not
              because the studios here are bad, but because the calendar never
              allowed a second attempt. A campaign got one shoot, and everything
              afterwards was a crop of that shoot.
            </p>
            <p className="t-body mt-6">
              The cost lands hardest on the cloth. Piña out of Aklan takes a
              weaver months and photographs like cheap synthetic if you light it
              flat. Inabel from Ilocos loses its indigo to an over-eager white
              balance. A terno&rsquo;s butterfly sleeve is a piece of
              engineering, and it only reads if somebody shoots it moving. None
              of that is a retouching problem. It is a problem of who is in the
              room.
            </p>
            <p className="t-body mt-6">
              So we built Habihan the other way around. The garment comes in
              once, and everything a collection needs to sell is developed from
              that single fitting: the campaign, the film, the lookbook, the
              storefront suite, the market versions. Ten working days, one
              address.
            </p>
            <p className="t-body mt-6">
              We are in Manila, two streets from where the samples get sewn. The
              work goes everywhere.
            </p>
          </Reveal>

          <Reveal i={1}>
            <Plate
              seed="maison-founding"
              w={1200}
              h={1600}
              sizes="(min-width: 1024px) 42vw, 92vw"
              priority
              mount
              label="Habihan"
            />
          </Reveal>
        </div>
      </section>

      <section className="sect">
        <FolioMark label="The principals" />
        <div className="wrap grid gap-10 md:grid-cols-3">
          {PRINCIPALS.map((p, i) => (
            <Reveal key={p.initials} i={i}>
              <div
                className="flex items-center justify-center"
                style={{
                  background: "var(--color-ivory-2)",
                  border: "1px solid var(--color-line)",
                  aspectRatio: "4 / 5",
                }}
              >
                <span
                  className="font-[family-name:var(--font-display)]"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    fontVariationSettings: '"opsz" 120, "wght" 320',
                    letterSpacing: "0.02em",
                    color: "var(--color-ink-11)",
                  }}
                >
                  {p.initials}
                </span>
              </div>
              <p className="t-mono mt-5" style={{ color: "var(--color-ink-11)" }}>
                {p.role}
              </p>
              <p className="t-body mt-3">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sect" style={{ background: "var(--color-ivory-2)" }}>
        <FolioMark label="The standards" />
        <div className="wrap">
          <div className="grid gap-y-10 md:grid-cols-2 md:gap-x-16">
            {STANDARDS.map((s, i) => (
              <Reveal
                key={s.short}
                i={i}
                style={{
                  borderTop: "1px solid var(--color-line-2)",
                  paddingTop: 20,
                }}
              >
                <p className="t-mono" style={{ color: "var(--color-ink-11)" }}>
                  {s.short}
                </p>
                <p className="t-body mt-3">{s.long}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <Reveal>
              <Plate
                seed="maison-standard-a"
                w={1600}
                h={1100}
                sizes="(min-width: 768px) 45vw, 92vw"
                mount
              />
            </Reveal>
            <Reveal i={1}>
              <Plate
                seed="maison-standard-b"
                w={1600}
                h={1100}
                sizes="(min-width: 768px) 45vw, 92vw"
                mount
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sect">
        <FolioMark label="The studio" />
        <div className="wrap grid gap-8 grid-cols-2 lg:grid-cols-3">
          {STUDIO.map((s, i) => (
            <Reveal key={s.seed} i={i % 5}>
              <Plate
                seed={s.seed}
                w={1200}
                h={1500}
                sizes="(min-width: 1024px) 30vw, 45vw"
                ratio="4 / 5"
                mount
                label={s.label}
              />
            </Reveal>
          ))}
        </div>
        <p
          className="wrap t-mono mt-10"
          style={{ color: "var(--color-ink-11)" }}
        >
          Studio plates stand in until the room itself is photographed.
        </p>
      </section>

      <section className="slab on-slab">
        <div className="slab__plate" aria-hidden="true">
          <Plate seed="maison-close" w={2560} h={1097} sizes="100vw" />
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

