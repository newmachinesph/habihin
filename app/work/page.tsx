import type { Metadata } from "next";
import FolioMark from "@/components/FolioMark";
import Reveal from "@/components/Reveal";
import WorkGrid from "@/components/WorkGrid";
import { STUDIES } from "@/lib/folio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "The folio",
  description:
    "House studies and commissioned campaigns. Every plate here left this studio.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <section className="sect sect--tight">
      <FolioMark label="The folio" />
      <div className="wrap">
        <Reveal>
          <h1 className="t-h1">The folio.</h1>
          <p className="t-lede mt-8">
            House studies and commissioned campaigns. Every plate here left this
            studio.
          </p>
        </Reveal>

        <div className="mt-16">
          <WorkGrid studies={STUDIES} />
        </div>
      </div>
    </section>
  );
}
