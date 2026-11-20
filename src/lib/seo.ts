import type { Metadata } from "next";
import { href, locales, type Locale, type PageKey } from "@/content/i18n";
import { site } from "@/content/site";

/**
 * The public address of the site, used for canonical links, the sitemap and share
 * previews. Set SITE_URL on the server once the domain is bought.
 */
export const siteUrl = (process.env.SITE_URL || "https://casutadinlivezi.ro").replace(/\/$/, "");

const shareImages: Record<PageKey, string> = {
  home: "/og/acasa.jpg",
  cazare: "/og/cazare.jpg",
  masa: "/og/masa-la-noi.jpg",
  lavanda: "/og/lavanda.jpg",
  imprejurimi: "/og/imprejurimi.jpg",
  contact: "/og/contact.jpg",
};

/** Links to the same page in every language, for search engines (hreflang). */
export function languageAlternates(page: PageKey) {
  return {
    ...Object.fromEntries(locales.map((l) => [l, href(l, page)])),
    "x-default": href("ro", page),
  };
}

/**
 * Full metadata for one page: title, description, canonical address, language
 * alternates and the share preview (Open Graph and X cards).
 */
export function pageMetadata({
  lang,
  page,
  title,
  description,
}: {
  lang: Locale;
  page: PageKey;
  /** Page title; the home page passes its full title. */
  title: string;
  description: string;
}): Metadata {
  const image = { url: shareImages[page], width: 1200, height: 630, alt: site.name };
  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: { canonical: href(lang, page), languages: languageAlternates(page) },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: page === "home" ? title : `${title} · ${site.name}`,
      description,
      url: href(lang, page),
      locale: lang === "ro" ? "ro_RO" : "en_GB",
      alternateLocale: lang === "ro" ? ["en_GB"] : ["ro_RO"],
      images: [image],
    },
    twitter: { card: "summary_large_image", images: [image.url] },
  };
}
