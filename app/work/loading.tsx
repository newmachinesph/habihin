import FolioMark from "@/components/FolioMark";

/** Real loading surface: shown while the folio route resolves. */
export default function Loading() {
  return (
    <section className="sect sect--tight">
      <FolioMark label="The folio" />
      <div className="wrap">
        <p className="t-mono" style={{ color: "var(--color-ink-11)" }}>
          Opening the folio…
        </p>
        <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="skel" style={{ aspectRatio: "4 / 5" }} />
              <div
                className="skel mt-5"
                style={{ height: 12, width: "40%" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
