"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BLUR, plate } from "@/lib/folio";

const H1_LINES = ["Campaigns", "without the shoot."];
const H1_TEXT = "Campaigns without the shoot.";

const at = (p: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)));

/**
 * The signature mechanic — "the plate settles".
 *
 * Every scrub channel defaults to its FINAL value in CSS, so the composed
 * final frame is what renders with no JavaScript and under reduced motion.
 * This component only ever drives those channels backwards toward the start.
 */
export default function HeroPlate() {
  const track = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The pin is a desktop mechanic. Under 1024px the hero stacks as flow, so
    // the claim, the lede and both actions sit in the first viewport at 390.
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const trackEl = track.current;
    const stageEl = stage.current;
    if (!trackEl || !stageEl) return;

    root.dataset.scrub = "on";
    let frame = 0;

    const paint = () => {
      frame = 0;
      const span = trackEl.offsetHeight - window.innerHeight;
      const p =
        span <= 0
          ? 1
          : Math.min(
              1,
              Math.max(0, -trackEl.getBoundingClientRect().top / span),
            );

      stageEl.style.setProperty("--m", String(at(p, 0.1, 0.34)));
      stageEl.style.setProperty("--swap", String(at(p, 0.18, 0.3)));
      stageEl.style.setProperty("--rule", String(at(p, 0.34, 0.52)));
      stageEl.style.setProperty("--cap", String(at(p, 0.52, 0.62)));
      stageEl.style.setProperty("--settle", String(at(p, 0.62, 0.66)));
      stageEl.style.setProperty("--copy", String(at(p, 0.66, 0.88)));
      stageEl.style.setProperty("--release", String(at(p, 0.88, 1)));

      // The nav holds its transparent state only while the plate is still
      // full-bleed behind it. Once the plate insets, the nav sits on ivory
      // ground and ivory-on-ivory would fail contrast outright.
      root.dataset.hero = p < 0.3 ? "active" : "past";
      root.dataset.settled = p >= 0.62 ? "true" : "false";
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      delete root.dataset.scrub;
      delete root.dataset.hero;
      delete root.dataset.settled;
    };
  }, []);

  return (
    <section className="hero" ref={track}>
      <div className="hero__stage" ref={stage}>
        <span className="hero__rule" aria-hidden="true" />

        <div className="hero__frame">
          <Image
            className="hero__img"
            src={plate("hero", 1536, 1024)}
            alt=""
            role="presentation"
            width={1536}
            height={1024}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR}
            priority
            fetchPriority="high"
          />
          <span className="hero__veil" />
        </div>

        <span className="hero__mount" aria-hidden="true" />

        <div className="hero__h1--ivory t-h1" aria-hidden="true">
          {H1_LINES.map((line, i) => (
            <span className="line" key={line} style={{ ["--i" as string]: i }}>
              <span>{line}</span>
            </span>
          ))}
        </div>

        <div className="hero__copy">
          <p className="hero__eyebrow t-mono mb-6">
            The fashion image house · MNL
          </p>

          <h1 className="t-h1 hero__h1--ink" aria-label={H1_TEXT}>
            <span aria-hidden="true">
              {H1_LINES.map((line, i) => (
                <span
                  className="line"
                  key={line}
                  style={{ ["--i" as string]: i }}
                >
                  <span>{line}</span>
                </span>
              ))}
            </span>
          </h1>

          <p className="hero__lede t-lede mt-8">
            Habihan is a fashion image house in Manila. Send the garments;
            the atelier returns campaign photography, film, and lookbooks in ten
            working days. No set to build, no call sheet, no freight bill, no reshoot for the next market.
          </p>

          <div className="hero__cta mt-10 flex flex-wrap" style={{ gap: 16 }}>
            <Link href="/commission" className="btn">
              Commission the house
            </Link>
            <Link href="/work" className="btn btn--ghost">
              Open the folio
            </Link>
          </div>
        </div>

        <p className="hero__cap t-mono">Opening</p>
      </div>
    </section>
  );
}
