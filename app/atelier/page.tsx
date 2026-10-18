import type { Metadata } from "next";
import Link from "next/link";
import FolioMark from "@/components/FolioMark";
import PhaseRow from "@/components/PhaseRow";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { PHASES, STANDARDS } from "@/lib/folio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "The atelier",
  description:
    "Six phases from courier to delivery. Ten working days, door to door.",
  path: "/atelier",
});

const STANDARD_PLATES = ["atelier-std-a", "atelier-std-b", "atelier-std-c"];

export default function AtelierPage() {
  return (
    <>
      <section className="sect sect--tight">
        <FolioMark label="The atelier" />
        <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <h1 className="t-h1">How the house works.</h1>
            <p className="t-lede mt-8">
              Six phases from courier to delivery. You&rsquo;ll know which phase
              your collection is in every day it&rsquo;s in the building, and
              your samples go home in the same week they arrive.
            </p>
          </Reveal>
          <Reveal i={1}>
            <Plate
              seed="atelier-hero"
              w={1200}
              h={1500}
              sizes="(min-width: 1024px) 42vw, 92vw"
              priority
              mount
              label="The workroom"
            />
          </Reveal>
        </div>
      </section>

      <section className="sect">
        <FolioMark label="The phases" />
        <div className="wrap">
          {PHASES.map((p, i) => (
            <PhaseRow
              key={p.n}
              n={p.n}
              name={p.name}
              body={p.body}
              days={p.days}
              seed={`phase-${p.n}`}
              i={i}
            />
          ))}
        </div>
      </section>

      <section className="sect" style={{ background: "var(--color-ivory-2)" }}>
        <FolioMark label="Door to door" />
        <div className="wrap">
          <Reveal>
            <h2 className="t-h2">Ten working days, door to door.</h2>
            <Link href="/commission" className="btn mt-10">
              Start with the brief
            </Link>
          </Reveal>

          <p className="t-body mt-10" style={{ maxWidth: "62ch" }}>
            The house works the way a studio works, with one difference we
            state plainly rather than bury: the plates are produced with
            generative AI under human art direction, and every one is graded and
            signed off by a person before it leaves. The direction, the casting,
            the light and the final call are ours. The machinery is ours to run.
          </p>

          <ul
            className="t-mono mt-16 grid gap-4 md:grid-cols-2"
            style={{
              color: "var(--color-ink-11)",
              borderTop: "1px solid var(--color-line-2)",
              paddingTop: 24,
            }}
          >
            {STANDARDS.map((s) => (
              <li key={s.short}>{s.short}</li>
            ))}
          </ul>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {STANDARD_PLATES.map((seed, i) => (
              <Reveal key={seed} i={i}>
                <Plate
                  seed={seed}
                  w={1200}
                  h={1500}
                  sizes="(min-width: 768px) 30vw, 90vw"
                  ratio="4 / 5"
                  mount
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sect sect--tight">
        <FolioMark label="The grade" />
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="t-quote">
              A collection is graded once. Every plate, every film, every
              storefront crop leaves under the same light, so nothing you
              publish looks borrowed from another shoot.
            </p>
          </Reveal>
          <div className="grid gap-8">
            <Reveal i={1}>
              <Plate
                seed="atelier-grade"
                w={1600}
                h={1100}
                sizes="(min-width: 1024px) 44vw, 92vw"
                mount
                label="The grade wall"
              />
            </Reveal>
            <Reveal i={2}>
              <Plate
                seed="atelier-grade-b"
                w={1600}
                h={1100}
                sizes="(min-width: 1024px) 44vw, 92vw"
                mount
                label="Plate beside plate"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
