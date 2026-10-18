import type { Metadata } from "next";
import CommissionForm from "@/components/CommissionForm";
import FolioMark from "@/components/FolioMark";
import Plate from "@/components/Plate";
import Reveal from "@/components/Reveal";
import { EMAIL } from "@/lib/folio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Commission the house",
  description:
    "Two working days to a reply, five to a scoped proposal. Send the range plan.",
  path: "/commission",
});

const NEXT = [
  { n: "01", t: "Reply", d: "Within two working days, from a person, not a queue." },
  { n: "02", t: "Proposal", d: "Within five working days: scope and price, against a plate list." },
  { n: "03", t: "Fitting", d: "Courier the garments; the calendar starts when they land." },
];

const SEND = [
  {
    t: "The range plan",
    d: "A line sheet, a spreadsheet, or a photograph of the rail. Piece count and colourways are what set the plate list.",
  },
  {
    t: "When samples exist",
    d: "The fitting is booked against sample availability, not against our calendar. Tell us the week they land and we work backwards.",
  },
  {
    t: "Where the images have to work",
    d: "Campaign, wholesale, your own storefront, the marketplaces you sell on. Each one changes the crop list, and adding a channel later costs more than declaring it now.",
  },
  {
    t: "The date that cannot move",
    d: "A market week, a trade show, a drop. If there is one, name it; if there is not, say so and we will scope for quality instead of speed.",
  },
];

export default function CommissionPage() {
  return (
    <>
    <section className="sect sect--tight">
      <FolioMark label="Commission" />
      <div className="wrap">
        <Reveal>
          <h1 className="t-h1">Commission the house.</h1>
          <p className="t-lede mt-8">
            Two working days to a reply, five to a scoped proposal. The more of
            the range plan you can share, the sharper the first proposal.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <CommissionForm />
          </div>

          <aside>
            <div className="lg:sticky" style={{ top: 96 }}>
              <ol
                className="t-mono grid gap-6"
                style={{
                  color: "var(--color-ink-11)",
                  borderTop: "1px solid var(--color-line-2)",
                  paddingTop: 24,
                }}
              >
                {NEXT.map((s) => (
                  <li key={s.n}>
                    <p style={{ color: "var(--color-ink-12)" }}>
                      {s.n}&nbsp;&nbsp;{s.t}
                    </p>
                    <p
                      className="mt-2"
                      style={{
                        textTransform: "none",
                        letterSpacing: 0,
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9375rem",
                      }}
                    >
                      {s.d}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="t-body mt-10">
                Or write to{" "}
                <a href={`mailto:${EMAIL}`} className="lnk">
                  {EMAIL}
                </a>
                .
              </p>

              <Reveal className="mt-12">
                <Plate
                  seed="commission-a"
                  w={1200}
                  h={1500}
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  mount
                  label="The fitting"
                />
              </Reveal>
              <Reveal i={1} className="mt-10">
                <Plate
                  seed="commission-b"
                  w={1600}
                  h={1100}
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  mount
                  label="The archive"
                />
              </Reveal>
            </div>
          </aside>
        </div>
      </div>
      </section>

      <section className="sect" style={{ background: "var(--color-ivory-2)" }}>
        <FolioMark label="What to send" />
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="t-h2">What makes the first proposal sharp.</h2>
            <p className="t-body mt-8">
              None of this has to be finished. A rough range plan scoped in
              January beats a polished one that arrives after the fabric is cut.
            </p>
            <dl className="mt-10">
              {SEND.map((s, i) => (
                <div
                  key={s.t}
                  style={{
                    borderTop: "1px solid var(--color-line-2)",
                    paddingBlock: 18,
                  }}
                >
                  <dt
                    className="t-mono"
                    style={{ color: "var(--color-ink-11)" }}
                  >
                    {String(i + 1).padStart(2, "0")}&nbsp;&nbsp;{s.t}
                  </dt>
                  <dd className="t-body mt-2">{s.d}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2">
            {["commission-c", "commission-d"].map((seed, i) => (
              <Reveal key={seed} i={i}>
                <Plate
                  seed={seed}
                  w={1024}
                  h={1536}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  ratio="4 / 5"
                  mount
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
