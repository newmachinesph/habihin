import Image from "next/image";
import { BLUR, plate } from "@/lib/folio";

type Props = {
  seed: string;
  w: number;
  h: number;
  sizes?: string;
  className?: string;
  boxClassName?: string;
  /** A nominal label only. A placeholder never carries a factual claim. */
  label?: string;
  note?: string;
  /** Box aspect, when the slot's shape differs from the file's — e.g. a row of
   *  plates that must share one baseline. Defaults to the file's own ratio. */
  ratio?: string;
  /** Gradient overlay — only when type sits on the image. */
  veil?: boolean;
  /** The 1px ink mount rule, 8px below the plate. */
  mount?: boolean;
  priority?: boolean;
  style?: React.CSSProperties;
};

/**
 * The locked media box. Explicit width/height, object-fit cover, ivory ground,
 * blur-up, square corners. Every image on the site renders through this.
 */
export default function Plate({
  seed,
  w,
  h,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className = "",
  boxClassName = "",
  label,
  note,
  ratio,
  veil = false,
  mount = false,
  priority = false,
  style,
}: Props) {
  return (
    <figure className={`${mount ? "mount" : ""} ${className}`} style={style}>
      <div
        className={`plate ${boxClassName}`}
        style={{ aspectRatio: ratio ?? `${w} / ${h}` }}
      >
        <Image
          className="plate__img"
          src={plate(seed, w, h)}
          alt=""
          role="presentation"
          width={w}
          height={h}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={BLUR}
          priority={priority}
        />
        {veil ? <span className="plate__veil" /> : null}
      </div>
      {label ? (
        <figcaption className="cap">
          <span>{label}</span>
          {note ? <span>{note}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
