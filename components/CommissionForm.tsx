"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendBrief, type BriefState } from "@/app/actions";
import { DISCIPLINES, EMAIL } from "@/lib/folio";

const INITIAL: BriefState = { status: "idle" };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn--send" disabled={pending}>
      {pending ? "Sending…" : "Send the brief"}
    </button>
  );
}

function Err({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="field__err" id={id}>
      {message}
    </p>
  );
}

export default function CommissionForm() {
  const [state, action] = useActionState(sendBrief, INITIAL);
  const errors = state.errors ?? {};

  if (state.status === "ok") {
    return (
      <div
        className="mount"
        style={{ borderTop: "1px solid var(--color-line-2)", paddingTop: 32 }}
        aria-live="polite"
      >
        <p className="t-h3">
          Received. The atelier replies within two working days.
        </p>
        <p className="t-mono mt-8" style={{ color: "var(--color-ink-11)" }}>
          Brief Nº {state.ref} · {state.stamp}
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate>
      <div className="field">
        <label className="field__label" htmlFor="name">
          Name
        </label>
        <input
          className="field__input"
          id="name"
          name="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-err" : undefined}
        />
        <Err id="name-err" message={errors.name} />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="brand">
          House / brand
        </label>
        <input
          className="field__input"
          id="brand"
          name="brand"
          autoComplete="organization"
          aria-invalid={Boolean(errors.brand)}
          aria-describedby={errors.brand ? "brand-err" : undefined}
        />
        <Err id="brand-err" message={errors.brand} />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="email">
          Email
        </label>
        <input
          className="field__input"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-err" : undefined}
        />
        <Err id="email-err" message={errors.email} />
      </div>

      <fieldset className="field">
        <legend className="field__label">Disciplines needed</legend>
        <div className="flex flex-wrap">
          {DISCIPLINES.map((d) => (
            <label className="check" key={d.slug}>
              <input type="checkbox" name="disciplines" value={d.slug} />
              {d.name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label className="field__label" htmlFor="markets">
          Market(s)
        </label>
        <input
          className="field__input"
          id="markets"
          name="markets"
          placeholder="Manila, Singapore, Tokyo"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="field">
          <label className="field__label" htmlFor="timeline">
            Timeline
          </label>
          <select className="field__input" id="timeline" name="timeline">
            <option>This month</option>
            <option>This quarter</option>
            <option>Next season</option>
            <option>Exploring</option>
          </select>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="range">
            Range size
          </label>
          <select className="field__input" id="range" name="range">
            <option>Under 20 SKUs</option>
            <option>20–80</option>
            <option>80–300</option>
            <option>300+</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="notes">
          Notes
        </label>
        <p className="field__hint" id="notes-hint">
          Links to the current collection help.
        </p>
        <textarea
          className="field__input"
          id="notes"
          name="notes"
          aria-describedby="notes-hint"
        />
      </div>

      <div className="flex flex-wrap items-center" style={{ gap: 20 }}>
        <Submit />
        <a href={`mailto:${EMAIL}`} className="lnk">
          or write to the studio
        </a>
      </div>

      <div aria-live="polite">
        {state.message ? (
          <p className="notice--err mt-6">{state.message}</p>
        ) : null}
      </div>
    </form>
  );
}
