import Link from "next/link";
import { EMAIL } from "@/lib/folio";
import Mark from "./Mark";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/atelier", label: "Atelier" },
  { href: "/habihan", label: "About" },
  { href: "/commission", label: "Commission" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-ivory-2)",
        borderTop: "1px solid var(--color-line-2)",
      }}
    >
      <div
        className="wrap"
        style={{ paddingBlock: "clamp(56px, 6vw, 88px)" }}
      >
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <Mark size={104} className="mb-8" />
            <p className="nav__mark">
              <span>Habihan</span>
            </p>
            <p className="t-body mt-4" style={{ color: "var(--color-ink-11)" }}>
              The fashion image house. Manila, works worldwide.
            </p>
            <p className="t-mono mt-4" style={{ color: "var(--color-ink-11)" }}>
              habihan · the loom
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col" style={{ gap: 10 }}>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="lnk">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <a href={`mailto:${EMAIL}`} className="lnk">
              {EMAIL}
            </a>
            <p className="t-body mt-4" style={{ color: "var(--color-ink-11)" }}>
              Replies within two working days.
            </p>
          </div>

          <div>
            <p className="t-mono" style={{ color: "var(--color-ink-12)" }}>
              Colophon
            </p>
            <p className="t-body mt-3" style={{ fontSize: "0.9375rem" }}>
              Every image on this site was made by the house: art-directed by
              people and produced with generative AI, then graded by hand before
              anything leaves. The house models are synthetic. No stock, no rented sets.
            </p>
            <p className="t-mono mt-6" style={{ color: "var(--color-ink-11)" }}>
              © 2026 Habihan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
