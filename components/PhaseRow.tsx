import Plate from "./Plate";
import Reveal from "./Reveal";

type Props = {
  n: string;
  name: string;
  body: string;
  days: string;
  seed: string;
  i: number;
};

export default function PhaseRow({ n, name, body, days, seed, i }: Props) {
  return (
    <Reveal
      i={i % 5}
      as="article"
      className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:gap-12"
      style={{
        borderTop: "1px solid var(--color-line)",
        paddingBlock: "clamp(32px, 4vw, 56px)",
        alignItems: "start",
      }}
    >
      <p className="t-mono" style={{ color: "var(--color-ink-11)" }}>
        Phase&nbsp;{n}
      </p>

      <div>
        <h2 className="t-h3">{name}</h2>
        <p className="t-body mt-4">{body}</p>
        <p className="t-mono mt-6" style={{ color: "var(--color-ink-11)" }}>
          {days}
        </p>
      </div>

      <Plate
        seed={seed}
        w={1200}
        h={1500}
        sizes="(min-width: 1024px) 260px, 40vw"
        boxClassName="w-[140px] lg:w-[260px]"
        mount
      />
    </Reveal>
  );
}
