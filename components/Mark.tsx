/**
 * The house mark: warp and weft crossing into a woven square, which is what
 * habihan means. Designed via the Codex bridge (public/brand/mark-a.png as the
 * source), then authored as SVG so it scales to any size and inherits
 * currentColor — the nav turns ivory over the hero, where a fixed-colour raster
 * would disappear.
 */
const LINES = [24, 28, 32, 36, 40];

export default function Mark({
  size = 26,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      shapeRendering="crispEdges"
    >
      {LINES.map((x) => (
        <line key={`v${x}`} x1={x} y1="10" x2={x} y2="54" />
      ))}
      {LINES.map((y) => (
        <line key={`h${y}`} x1="10" y1={y} x2="54" y2={y} />
      ))}
    </svg>
  );
}
