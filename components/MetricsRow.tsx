import Reveal from "./Reveal";

const FIGURES = [
  { fig: "10", cap: "working days, garments to campaign" },
  { fig: "300+", cap: "plates delivered per collection" },
  { fig: "6", cap: "markets adapted per campaign" },
];

/** Published service standards, not client statistics. Hairlines, never boxes. */
export default function MetricsRow() {
  return (
    <div className="grid lg:grid-cols-3">
      {FIGURES.map((f, i) => (
        <Reveal
          key={f.fig}
          i={i}
          className="py-8 lg:py-0"
          style={{
            paddingInline: i === 0 ? 0 : undefined,
            borderTop: "1px solid var(--color-line)",
          }}
        >
          <p
            className="font-[family-name:var(--font-display)]"
            style={{
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              fontVariationSettings: '"opsz" 120, "wght" 320',
              letterSpacing: "-0.03em",
              lineHeight: 1,
              paddingTop: 24,
            }}
          >
            {f.fig}
          </p>
          <p className="t-mono mt-4" style={{ color: "var(--color-ink-11)" }}>
            {f.cap}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
