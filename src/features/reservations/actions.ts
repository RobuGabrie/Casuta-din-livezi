"use server";

import { headers } from "next/headers";
import { hasLocale } from "@/content/i18n";
import { notifyFamily } from "./notify";
import { validateTableRequest, type FieldName } from "./validate";

export type ReservationState =
  | { status: "idle" }
  | { status: "invalid"; errors: Partial<Record<FieldName, true>> }
  | { status: "failed"; reason: "tooMany" | "notSent" }
  | { status: "sent" };

// A few requests per visitor are enough; more in a short time is almost always a bot.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function tooMany(key: string, now: number) {
  const times = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  times.push(now);
  recent.set(key, times);
  if (recent.size > 5_000) recent.clear();
  return times.length > MAX_PER_WINDOW;
}

/** Server action behind the table request form (docs/design/specs/masa-la-noi.md). */
export async function requestTable(_previous: ReservationState, form: FormData): Promise<ReservationState> {
  // Hidden field that people never see; bots fill it. Pretend it worked.
  if (String(form.get("website") ?? "") !== "") return { status: "sent" };

  const result = validateTableRequest(form);
  if (!result.ok) return { status: "invalid", errors: result.errors };

  const h = await headers();
  // Behind the Cloudflare Tunnel the visitor's address is in CF-Connecting-IP.
  const visitor =
    h.get("cf-connecting-ip") || h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (tooMany(visitor, Date.now())) return { status: "failed", reason: "tooMany" };

  const langValue = String(form.get("lang") ?? "ro");
  const { delivered } = await notifyFamily(result.request, hasLocale(langValue) ? langValue : "ro");
  if (delivered.length === 0) return { status: "failed", reason: "notSent" };

  return { status: "sent" };
}
