import "server-only";
import nodemailer from "nodemailer";
import { getDictionary, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import type { TableRequest } from "./validate";

/**
 * Sends a table request to the family by WhatsApp (CallMeBot) and by email (SMTP).
 * Settings come from the environment; see .env.example and docs/notifications.md.
 *
 * Returns which channels delivered. With no channel set up and RESERVATIONS_DRY_RUN=1
 * (the default under `next dev`), the message is printed to the server log instead.
 */
export async function notifyFamily(request: TableRequest, lang: Locale) {
  const message = formatMessage(request, lang);
  const env = process.env;

  const whatsappReady = Boolean(env.CALLMEBOT_APIKEY);
  const emailReady = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);
  const dryRun = env.RESERVATIONS_DRY_RUN === "1" || (env.RESERVATIONS_DRY_RUN === undefined && env.NODE_ENV === "development");

  if (!whatsappReady && !emailReady) {
    if (dryRun) {
      console.info(`[reservations] dry run, not sent:\n${message.text}`);
      return { delivered: ["log"] as string[] };
    }
    console.error("[reservations] no WhatsApp or email settings; request not delivered");
    return { delivered: [] as string[] };
  }

  const results = await Promise.allSettled([
    whatsappReady ? sendWhatsApp(message.text) : Promise.reject(new Error("WhatsApp not set up")),
    emailReady ? sendEmail(message.subject, message.text) : Promise.reject(new Error("email not set up")),
  ]);
  const delivered: string[] = [];
  results.forEach((result, i) => {
    const channel = i === 0 ? "whatsapp" : "email";
    if (result.status === "fulfilled") delivered.push(channel);
    else if ((i === 0 && whatsappReady) || (i === 1 && emailReady))
      console.error(`[reservations] ${channel} failed:`, result.reason);
  });
  return { delivered };
}

function formatMessage(r: TableRequest, lang: Locale) {
  // The family reads these, so labels are always Romanian.
  const t = getDictionary("ro").reservation.message;
  const day = new Intl.DateTimeFormat("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${r.date}T12:00:00Z`));
  const [h, m] = r.time.split(":").map(Number);
  const end = `${String(h + site.tableHours).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  const guests = r.guests === "more" ? `mai mult de ${site.tableMaxGuests}` : String(r.guests);

  const lines = [
    t.heading,
    "",
    `${t.name}: ${r.name}`,
    `${t.phone}: ${r.phone}`,
    `${t.date}: ${day}`,
    `${t.time}: ${r.time} (${t.until} ${end})`,
    `${t.guests}: ${guests}`,
    r.notes ? `${t.notes}: ${r.notes}` : "",
    `${t.language}: ${lang.toUpperCase()}`,
  ].filter((line, i) => line !== "" || i === 1);

  return {
    subject: `Masă: ${r.name}, ${day}, ${r.time}, ${guests} pers.`,
    text: lines.join("\n"),
  };
}

async function sendWhatsApp(text: string) {
  const phone = (process.env.CALLMEBOT_PHONE || site.phone).replace(/\D/g, "");
  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.searchParams.set("phone", phone);
  url.searchParams.set("text", text);
  url.searchParams.set("apikey", process.env.CALLMEBOT_APIKEY!);
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000), cache: "no-store" });
  const body = await response.text();
  // CallMeBot answers 200 with an HTML page; failures mention "ERROR" in it.
  if (!response.ok || /error/i.test(body)) throw new Error(`CallMeBot ${response.status}: ${body.slice(0, 200)}`);
}

async function sendEmail(subject: string, text: string) {
  const env = process.env;
  const port = Number(env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
  await transport.sendMail({
    from: `"${site.name} – site" <${env.SMTP_USER}>`,
    to: env.NOTIFY_EMAIL || site.email,
    subject,
    text,
  });
}
