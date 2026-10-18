import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FolioMark from "@/components/FolioMark";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { nextStudy, STUDIES, studyBySlug } from "@/lib/folio";
import { createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return STUDIES.map((s) => ({ folio: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[folio]">): Promise<Metadata> {
  const { folio } = await params;
  const study = studyBySlug(folio);
  if (!study) return { title: "The folio" };
  return createPageMetadata({
    title: study.title.replace(/\.$/, ""),
    description: study.intro.slice(0, 155),
    path: `/work/${study.slug}`,
  });
}

export default async function FolioPage({
  params,
}: PageProps<"/work/[folio]">) {
  const { folio } = await params;
  const study = studyBySlug(folio);
  if (!study) notFound();

  const after = nextStudy(study.slug);

  return (
    <>
      <section className="sect sect--tight">
        <FolioMark label="House study" />
        <div className="wrap">
          <Reveal>
            <p className="t-mono" style={{ color: "var(--color-ink-11)" }}>
              House study Nº&nbsp;{study.no}
            </p>
            <h1 className="t-h1 mt-4">{study.title}</h1>
          </Reveal>
        </div>

        <div className="wrap mt-12">
          <Reveal i={1}>
            <Plate
              seed={study.cover.seed}
              w={2560}
              h={1097}
              sizes="100vw"
              priority
              mount
              label={study.scope}
            />
          </Reveal>
        </div>

        <div className="wrap mt-16 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal
            as="dl"
            className="t-mono grid gap-4"
            style={{
              color: "var(--color-ink-11)",
              borderTop: "1px solid var(--color-line-2)",
              paddingTop: 20,
            }}
          >
            <div>
              <dt>Scope</dt>
              <dd style={{ color: "var(--color-ink-12)" }}>{study.scope}</dd>
            </div>
            <div>
              <dt>Plates</dt>
              <dd style={{ color: "var(--color-ink-12)" }}>
                {study.plateCount}
              </dd>
            </div>
            <div>
              <dt>Disciplines</dt>
              <dd style={{ color: "var(--color-ink-12)" }}>
                {study.disciplines}
              </dd>
            </div>
            <div>
              <dt>Season</dt>
              <dd style={{ color: "var(--color-ink-12)" }}>{study.season}</dd>
            </div>
          </Reveal>

          <Reveal i={1}>
            <p className="t-body">{study.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="sect">
        <FolioMark label="The plates" />
        <div className="wrap grid gap-10 md:grid-cols-2">
          {study.plates.map((p, i) => (
            <Reveal
              key={p.seed}
              i={i % 5}
              className={i % 5 === 0 ? "md:col-span-2" : ""}
            >
              <Plate
                seed={p.seed}
                w={p.w}
                h={p.h}
                sizes={
                  i % 5 === 0
                    ? "100vw"
                    : "(min-width: 768px) 45vw, 92vw"
                }
                mount
                label={p.label}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--color-line-2)" }}>
        <Link
          href={`/work/${after.slug}`}
          className="wrap plate-link flex items-baseline justify-between"
          style={{ paddingBlock: "clamp(48px, 6vw, 88px)", gap: 24 }}
        >
          <span>
            <span className="t-mono" style={{ color: "var(--color-ink-11)" }}>
              Next folio
            </span>
            <span className="t-h2 block mt-3 row__name">{after.title}</span>
          </span>
          <span className="arrow t-h3" aria-hidden="true">
            →
          </span>
        </Link>
      </section>
    </>
  );
}
