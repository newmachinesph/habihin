"use client";

import Link from "next/link";
import { useState } from "react";
import type { Study, Tag } from "@/lib/folio";
import Plate from "./Plate";
import Reveal from "./Reveal";

const FILTERS: { key: "all" | Tag; label: string }[] = [
  { key: "all", label: "All" },
  { key: "product", label: "Product" },
  { key: "campaign", label: "Campaign" },
  { key: "film", label: "Film" },
  { key: "lookbook", label: "Lookbook" },
];

export default function WorkGrid({ studies }: { studies: Study[] }) {
  const [filter, setFilter] = useState<"all" | Tag>("all");

  const shown =
    filter === "all" ? studies : studies.filter((s) => s.tags.includes(filter));

  return (
    <>
      <div
        className="flex flex-wrap"
        style={{
          gap: 8,
          borderTop: "1px solid var(--color-line)",
          borderBottom: "1px solid var(--color-line)",
          marginBottom: "clamp(32px, 4vw, 56px)",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className="tbtn"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div style={{ paddingBlock: 64 }}>
          <p className="t-h3">Nothing under this discipline yet.</p>
          <p className="t-body mt-4">
            The folio grows every season. See all plates instead.
          </p>
          <button
            type="button"
            className="tbtn mt-4"
            style={{ paddingInline: 0, color: "var(--color-bronze-10)" }}
            onClick={() => setFilter("all")}
          >
            All plates
          </button>
        </div>
      ) : (
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {shown.map((s, i) => (
            <Reveal key={s.slug} i={i % 5}>
              <Link href={`/work/${s.slug}`} className="plate-link block">
                <Plate
                  seed={s.cover.seed}
                  w={s.cover.w}
                  h={s.cover.h}
                  sizes="(min-width: 768px) 45vw, 92vw"
                  mount
                />
                <p
                  className="t-mono mt-5"
                  style={{ color: "var(--color-ink-11)" }}
                >
                  House study Nº&nbsp;{s.no}
                </p>
                <h2 className="t-h3 mt-2">
                  <span className="row__name">{s.title}</span>
                </h2>
                <p className="cap" style={{ marginTop: 10 }}>
                  <span>
                    {s.scope} · {s.plateCount} plates
                  </span>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
