"use client";

import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  "/": "Home",
  "/services": "Services",
  "/work": "The folio",
  "/atelier": "The atelier",
  "/habihan": "About Habihan",
  "/commission": "Commission",
};

/**
 * The fixed left rail: page label and city mark.
 * Decorative to a screen reader.
 */
export default function FolioRail() {
  const pathname = usePathname();
  const label =
    LABELS[pathname] ?? (pathname.startsWith("/work/") ? "The folio" : "Habihan");

  return (
    <aside className="rail t-mono" aria-hidden="true">
      <span className="rail__label">{label}</span>
      <span className="rail__foot">MNL</span>
    </aside>
  );
}
