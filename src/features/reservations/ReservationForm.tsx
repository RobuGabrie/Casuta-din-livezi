"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { Lines } from "@/components/ui/Lines";
import { getDictionary, type Locale } from "@/content/i18n";
import { site } from "@/content/site";

const guestCounts = Array.from({ length: site.tableMaxGuests }, (_, i) => i + 1);
const noSubscription = () => () => {};

/** The next `count` days from today, as { value: "2026-11-21", label: "sâmbătă, 21 noiembrie" }. */
function upcomingDays(count: number, locale: string) {
  const format = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long" });
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const value = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
    return { value, label: format.format(day) };
  });
}

/**
 * Table request form, Figma "Formular cerere masă" (docs/design/specs/masa-la-noi.md).
 * Milestone 5: layout only. Milestone 7 adds sending, validation and the four states.
 */
export function ReservationForm({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).form;
  // Dates depend on today, so they are listed only in the browser (the page itself is
  // built ahead of time and served for days).
  const inBrowser = useSyncExternalStore(
    noSubscription,
    () => true,
    () => false,
  );
  const days = useMemo(() => (inBrowser ? upcomingDays(site.tableDaysAhead, t.locale) : []), [inBrowser, t.locale]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid gap-6 lg:grid-cols-2" noValidate>
      <Field id="rezervare-nume" label={t.name}>
        <TextInput id="rezervare-nume" name="name" autoComplete="name" placeholder={t.namePlaceholder} required />
      </Field>
      <Field id="rezervare-telefon" label={t.phone}>
        <TextInput
          id="rezervare-telefon"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={t.phonePlaceholder}
          required
        />
      </Field>
      <Field id="rezervare-data" label={t.date}>
        <Select id="rezervare-data" name="date" defaultValue="" required>
          <option value="" disabled>
            {t.datePlaceholder}
          </option>
          {days.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="rezervare-ora" label={t.time} hint={t.timeHint}>
        <Select id="rezervare-ora" name="time" defaultValue="" required aria-describedby="rezervare-ora-hint">
          <option value="" disabled>
            {t.timePlaceholder}
          </option>
          {site.tableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="rezervare-persoane" label={t.guests} className="lg:col-span-2">
        <Select id="rezervare-persoane" name="guests" defaultValue="2">
          {guestCounts.map((n) => (
            <option key={n} value={n}>
              {t.guestOption(n)}
            </option>
          ))}
          <option value="more">{t.guestsMore}</option>
        </Select>
      </Field>
      <Field id="rezervare-mentiuni" label={t.notes} className="lg:col-span-2">
        <TextArea id="rezervare-mentiuni" name="notes" placeholder={t.notesPlaceholder} />
      </Field>
      <p className="type-caption text-muted lg:col-span-2">
        <Lines lines={t.privacy} />
      </p>
      <div className="lg:col-span-2">
        <Button type="submit">{t.submit}</Button>
      </div>
    </form>
  );
}
