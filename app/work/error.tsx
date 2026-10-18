"use client";

import { EMAIL } from "@/lib/folio";

/** Real error surface: shown if the folio route throws while rendering. */
export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="sect">
      <div className="wrap">
        <h1 className="t-h2">The folio didn&rsquo;t load.</h1>
        <p className="t-body mt-6">
          Refresh, or write to{" "}
          <a href={`mailto:${EMAIL}`} className="lnk">
            {EMAIL}
          </a>
          .
        </p>
        <button type="button" className="btn mt-10" onClick={reset}>
          Try again
        </button>
      </div>
    </section>
  );
}
