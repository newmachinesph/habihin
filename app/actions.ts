"use server";

export type BriefState = {
  status: "idle" | "ok" | "error";
  message?: string;
  ref?: string;
  stamp?: string;
  errors?: Record<string, string>;
};

const REQUIRED: [string, string][] = [
  ["name", "We need a name to address the reply to."],
  ["brand", "Which house is this for?"],
  ["email", "That email won't reach you. Check the domain."],
];

/**
 * Validates the brief and hands it to whatever the house has configured.
 * With no delivery target configured it returns the error state rather than
 * telling the sender their brief arrived. Never claim a send that did not happen.
 */
export async function sendBrief(
  _prev: BriefState,
  formData: FormData,
): Promise<BriefState> {
  const value = (k: string) => String(formData.get(k) ?? "").trim();
  const errors: Record<string, string> = {};

  for (const [field, message] of REQUIRED) {
    if (!value(field)) errors[field] = message;
  }

  const email = value("email");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "That email won't reach you. Check the domain.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const target = process.env.COMMISSION_WEBHOOK;
  const failed: BriefState = {
    status: "error",
    message:
      "That didn't send. Write to studio@habihan.ph and the same reply clock applies.",
  };

  if (!target) return failed;

  try {
    const res = await fetch(target, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: value("name"),
        brand: value("brand"),
        email,
        disciplines: formData.getAll("disciplines").map(String),
        markets: value("markets"),
        timeline: value("timeline"),
        range: value("range"),
        notes: value("notes"),
      }),
    });
    if (!res.ok) return failed;
  } catch {
    return failed;
  }

  const now = new Date();
  return {
    status: "ok",
    ref: now.getTime().toString(36).toUpperCase().slice(-6),
    stamp: now.toISOString().slice(0, 16).replace("T", " "),
  };
}
