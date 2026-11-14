import { href, type Locale } from "@/content/i18n";
import { site } from "@/content/site";

/**
 * Where "call us" actions go: a tel: link once the phone number is known,
 * otherwise the Contact page.
 */
export function callHref(lang: Locale) {
  return site.phone ? `tel:${site.phone.replace(/\s/g, "")}` : href(lang, "contact");
}

/** A WhatsApp chat with the family, optionally with a first message written. */
export function whatsappHref(text?: string) {
  const number = site.phone.replace(/\D/g, "");
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
