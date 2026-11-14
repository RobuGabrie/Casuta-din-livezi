import { site } from "@/content/site";

export const fields = ["name", "phone", "date", "time", "guests", "notes"] as const;
export type FieldName = (typeof fields)[number];

export type TableRequest = {
  name: string;
  phone: string;
  /** "2026-11-21" */
  date: string;
  /** "13:00" */
  time: string;
  /** 1 to site.tableMaxGuests, or "more" for larger groups. */
  guests: number | "more";
  notes: string;
};

const NOTES_MAX = 500;

/** Today's date in Romania as "YYYY-MM-DD", whatever the server's time zone. */
export function todayInRomania(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bucharest" }).format(now);
}

function addDays(isoDate: string, days: number) {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Checks a submitted table request. Returns the cleaned request, or the fields that
 * need fixing. The same rules the form shows: a name, a callable phone number, a date
 * in the next `site.tableDaysAhead` days, a listed time and a guest count.
 */
export function validateTableRequest(
  form: FormData,
  now = new Date(),
): { ok: true; request: TableRequest } | { ok: false; errors: Partial<Record<FieldName, true>> } {
  const text = (key: string) => String(form.get(key) ?? "").trim();
  const errors: Partial<Record<FieldName, true>> = {};

  const name = text("name").replace(/\s+/g, " ");
  if (name.length < 2 || name.length > 80) errors.name = true;

  const phone = text("phone");
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15 || /[^\d\s+().-]/.test(phone)) errors.phone = true;

  const date = text("date");
  const today = todayInRomania(now);
  const last = addDays(today, site.tableDaysAhead - 1);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < today || date > last) errors.date = true;

  const time = text("time");
  if (!(site.tableTimes as readonly string[]).includes(time)) errors.time = true;

  const guestsRaw = text("guests");
  const guestsNumber = Number(guestsRaw);
  const guests =
    guestsRaw === "more"
      ? ("more" as const)
      : Number.isInteger(guestsNumber) && guestsNumber >= 1 && guestsNumber <= site.tableMaxGuests
        ? guestsNumber
        : null;
  if (guests === null) errors.guests = true;

  const notes = text("notes");
  if (notes.length > NOTES_MAX) errors.notes = true;

  if (Object.keys(errors).length > 0 || guests === null) return { ok: false, errors };
  return { ok: true, request: { name, phone, date, time, guests, notes } };
}
