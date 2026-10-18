"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Mark from "./Mark";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/atelier", label: "Atelier" },
  { href: "/habihan", label: "About" },
  { href: "/commission", label: "Commission" },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState(pathname);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Navigating closes the sheet. Adjusting during render rather than in an
  // effect avoids the cascading re-render an effect would cause.
  if (path !== pathname) {
    setPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="nav">
        <Link href="/" className="nav__mark">
          <Mark size={24} />
          <span>Habihan</span>
        </Link>

        <nav className="nav__links" aria-label="Main">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav__link ${l.href === "/commission" ? "nav__link--act" : ""}`}
              aria-current={current(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </header>

      {open ? (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between">
            <span className="nav__mark">
              <Mark size={24} />
              <span>Habihan</span>
            </span>
            <button
              type="button"
              ref={closeRef}
              className="nav__toggle"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
          <nav
            className="mt-10 flex flex-col"
            aria-label="Main"
            style={{ gap: 4 }}
          >
            {LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                className="sheet__link"
                style={{ ["--i" as string]: i }}
                aria-current={current(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="t-mono mt-auto" style={{ color: "var(--color-ink-11)" }}>
            Manila, works worldwide
          </p>
        </div>
      ) : null}
    </>
  );
}
