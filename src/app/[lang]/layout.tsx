import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getDictionary, hasLocale, locales } from "@/content/i18n";
import { siteUrl } from "@/lib/seo";
import "../globals.css";

const serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-serif",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).meta;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.title, template: "%s · Căsuța din Livezi" },
    description: t.description,
  };
}

// Each page renders its own header, because its tone depends on the page's hero.
export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a
          href="#continut"
          className="type-button sr-only z-50 rounded-control bg-forest text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-6 focus:py-4"
        >
          {getDictionary(lang).nav.skipToContent}
        </a>
        <main>{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
