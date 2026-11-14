"use client";

import { startTransition, useActionState, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { describedBy, Field, Select, TextArea, TextInput } from "@/components/ui/Field";
import { Lines } from "@/components/ui/Lines";
import { getDictionary, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { requestTable, type ReservationState } from "./actions";
import { fields } from "./validate";

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
 * Table request form with its four Figma states: default, error, sending, success
 * (docs/design/specs/masa-la-noi.md). Sending is the `requestTable` server action.
 */
export function ReservationForm({ lang }: { lang: Locale }) {
  // Changing the key starts a fresh form after a successful request.
  const [round, setRound] = useState(0);
  return <RequestForm key={round} lang={lang} onAgain={() => setRound((n) => n + 1)} />;
}

function RequestForm({ lang, onAgain }: { lang: Locale; onAgain: () => void }) {
  const d = getDictionary(lang);
  const t = d.form;
  const r = d.reservation;
  const [state, action, pending] = useActionState<ReservationState, FormData>(requestTable, { status: "idle" });

  // Dates depend on today, so they are listed only in the browser (the page itself is
  // built ahead of time and served for days).
  const inBrowser = useSyncExternalStore(noSubscription, () => true, () => false);
  const days = inBrowser ? upcomingDays(site.tableDaysAhead, t.locale) : [];

  // Errors from the last check, minus the fields the guest has edited since.
  const [edited, setEdited] = useState<{ after: ReservationState; names: Set<string> }>({ after: state, names: new Set() });
  const editedNow = edited.after === state ? edited.names : new Set<string>();
  const errors = state.status === "invalid" ? state.errors : {};
  const shown = (f: (typeof fields)[number]) => Boolean(errors[f]) && !editedNow.has(f);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // After a check fails, move to the first field that needs fixing.
  useEffect(() => {
    if (state.status === "invalid") {
      const first = fields.find((f) => state.errors[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
    if (state.status === "sent") doneRef.current?.focus();
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-6 outline-none">
        {/* Figma component "Mesaj / Succes". */}
        <div className="flex w-full flex-col gap-4 rounded-control border border-line p-6">
          <p className="type-h2">{r.success.title}</p>
          <p className="type-body">{r.success.text}</p>
          <p className="type-caption text-muted">{r.success.note}</p>
        </div>
        <Button variant="secondary" onClick={onAgain}>
          {r.success.again}
        </Button>
      </div>
    );
  }

  const err = (f: (typeof fields)[number]) => (shown(f) ? r.errors[f] : undefined);

  return (
    <form
      ref={formRef}
      // Sent from onSubmit rather than the action prop: the action prop resets the form
      // afterwards, which empties the date and time lists when a field needs fixing.
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => action(data));
      }}
      onChange={(event) => {
        const target = event.target;
        const name = target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement ? target.name : "";
        if (name) setEdited({ after: state, names: new Set([...editedNow, name]) });
      }}
      className="grid gap-6 lg:grid-cols-2"
      noValidate
    >
      <input type="hidden" name="lang" value={lang} />
      {/* Left empty by people; spam bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field id="rezervare-nume" label={t.name} error={err("name")}>
        <TextInput
          id="rezervare-nume"
          name="name"
          autoComplete="name"
          placeholder={t.namePlaceholder}
          required
          {...describedBy("rezervare-nume", { error: shown("name") })}
        />
      </Field>
      <Field id="rezervare-telefon" label={t.phone} error={err("phone")}>
        <TextInput
          id="rezervare-telefon"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={t.phonePlaceholder}
          required
          {...describedBy("rezervare-telefon", { error: shown("phone") })}
        />
      </Field>
      <Field id="rezervare-data" label={t.date} error={err("date")}>
        <Select
          id="rezervare-data"
          name="date"
          defaultValue=""
          required
          {...describedBy("rezervare-data", { error: shown("date") })}
        >
          <option value="" disabled>
            {t.datePlaceholder}
          </option>
          {days.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="rezervare-ora" label={t.time} hint={t.timeHint} error={err("time")}>
        <Select
          id="rezervare-ora"
          name="time"
          defaultValue=""
          required
          {...describedBy("rezervare-ora", { hint: true, error: shown("time") })}
        >
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
      <Field id="rezervare-persoane" label={t.guests} error={err("guests")} className="lg:col-span-2">
        <Select
          id="rezervare-persoane"
          name="guests"
          defaultValue="2"
          {...describedBy("rezervare-persoane", { error: shown("guests") })}
        >
          {guestCounts.map((n) => (
            <option key={n} value={n}>
              {t.guestOption(n)}
            </option>
          ))}
          <option value="more">{t.guestsMore}</option>
        </Select>
      </Field>
      <Field id="rezervare-mentiuni" label={t.notes} error={err("notes")} className="lg:col-span-2">
        <TextArea
          id="rezervare-mentiuni"
          name="notes"
          maxLength={500}
          placeholder={t.notesPlaceholder}
          {...describedBy("rezervare-mentiuni", { error: shown("notes") })}
        />
      </Field>

      <p className="type-caption text-muted lg:col-span-2">
        <Lines lines={t.privacy} />
      </p>

      {state.status === "failed" && (
        <p role="alert" className="type-body text-error lg:col-span-2">
          {state.reason === "tooMany" ? r.errors.tooMany : `${r.errors.notSent} ${site.phone}.`}
        </p>
      )}

      <div className="flex flex-col items-start gap-6 lg:col-span-2">
        <Button type="submit" disabled={pending} className="disabled:opacity-65">
          {pending ? r.sending : t.submit}
        </Button>
        {pending && (
          <p role="status" className="type-caption text-muted">
            {r.sendingNote}
          </p>
        )}
      </div>
    </form>
  );
}
