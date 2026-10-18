import type { ElementType, ReactNode, CSSProperties } from "react";

/**
 * Scroll reveal. CSS-only and fails open: opacity is 1 by default and the
 * animation only ever adds, behind a reduced-motion and @supports guard.
 * No JavaScript is involved, so a script failure cannot strand content.
 */
export default function Reveal({
  children,
  i = 0,
  as: Tag = "div" as ElementType,
  className = "",
  style,
}: {
  children: ReactNode;
  /** Stagger index, 0–4. Offsets the reveal range rather than delaying it. */
  i?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={{ ...style, "--i": i } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
