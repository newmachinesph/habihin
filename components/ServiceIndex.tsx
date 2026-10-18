"use client";

import { useEffect, useState, type ReactNode } from "react";

type Item = { slug: string; n: string; name: string };

/**
 * Sticky index + scrolling detail. The rail sticks; nothing transforms and
 * nothing is scrubbed. The active item is read from an IntersectionObserver
 * on the right-hand blocks. Without JS the anchors still work.
 */
export default function ServiceIndex({
  items,
  children,
}: {
  items: Item[];
  children: ReactNode;
}) {
  const [active, setActive] = useState(items[0]?.slug ?? "");

  useEffect(() => {
    const blocks = Array.from(
      document.querySelectorAll<HTMLElement>("[data-sindex]"),
    );
    if (blocks.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const v = (e.target as HTMLElement).dataset.sindex;
            if (v) setActive(v);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sindex">
      <nav className="sindex__rail" aria-label="Disciplines">
        <ul>
          {items.map((it) => (
            <li key={it.slug}>
              <a
                href={`#${it.slug}`}
                className="sindex__item t-mono"
                data-active={active === it.slug}
              >
                <span>{it.n}</span>
                <span>{it.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div>{children}</div>
    </div>
  );
}
