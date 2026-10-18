/** A section label sitting on a full-bleed hairline. */
export default function FolioMark({
  label,
  id,
}: {
  label: string;
  id?: string;
}) {
  return (
    <div className="mark" id={id}>
      <p className="mark__inner t-mono">{label}</p>
    </div>
  );
}
