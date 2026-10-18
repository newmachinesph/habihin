import type { Metadata } from "next";
import Link from "next/link";
import FolioMark from "@/components/FolioMark";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import ServiceIndex from "@/components/ServiceIndex";
import { DISCIPLINES } from "@/lib/folio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Commissioned per collection or retained per season. Six disciplines, all starting from the same fitting.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="sect sect--tight">
        <FolioMark label="Services" />
        <div className="wrap">
          <Reveal>
            <h1 className="t-h1">What the house produces.</h1>
            <p className="t-lede mt-8">
              Commissioned per collection or retained per season. Every
              discipline starts from the same fitting in Manila, so adding one
              never means another shoot.
            </p>
          </Reveal>
        </div>
        <div className="wrap mt-16">
          <Reveal i={1}>
            <Plate
              seed="services-hero"
              w={2560}
              h={1097}
              sizes="100vw"
              priority
              mount
              label="The fitting room"
            />
          </Reveal>
        </div>
      </section>

      <section className="sect">
        <FolioMark label="The disciplines" />
        <div className="wrap">
          <ServiceIndex
            items={DISCIPLINES.map((d) => ({
              slug: d.slug,
              n: d.n,
              name: d.name,
            }))}
          >
            {DISCIPLINES.map((d) => (
              <article
                key={d.slug}
                id={d.slug}
                data-sindex={d.slug}
                style={{
                  borderTop: "1px solid var(--color-line-2)",
                  paddingBlock: "clamp(40px, 5vw, 72px)",
                  scrollMarginTop: 96,
                }}
              >
                <p className="t-mono" style={{ color: "var(--color-ink-11)" }}>
                  {d.n}
                </p>
                <h2 className="t-h2 mt-4">{d.name}</h2>
                <p className="t-quote mt-6">{d.claim}</p>
                <p className="t-body mt-6">{d.mechanism}</p>

                <ul
                  className="t-mono mt-8 flex flex-wrap"
                  style={{ gap: "8px 20px", color: "var(--color-ink-11)" }}
                >
                  {d.deliverables.map((del) => (
                    <li key={del}>{del}</li>
                  ))}
                </ul>

                <div
                  className="plate-set mt-10"
                  style={{ ["--cols" as string]: d.plates.length }}
                >
                  {d.plates.map((p, j) => (
                    <Reveal key={p.seed} i={j}>
                      <Plate
                        seed={p.seed}
                        w={p.w}
                        h={p.h}
                        sizes="(min-width: 1024px) 24vw, 45vw"
                        mount
                      />
                    </Reveal>
                  ))}
                </div>
              </article>
            ))}
          </ServiceIndex>
        </div>
      </section>

      <section className="sect sect--tight">
        <FolioMark label="Scoping" />
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <p className="t-quote">
              Commissions are scoped to the collection. Bring the range plan;
              the proposal comes back priced.
            </p>
            <Link href="/commission" className="btn mt-10">
              Commission the house
            </Link>
          </Reveal>
          <Reveal i={1}>
            <Plate
              seed="services-scope"
              w={1600}
              h={1100}
              sizes="(min-width: 1024px) 44vw, 92vw"
              mount
              label="The range plan"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
