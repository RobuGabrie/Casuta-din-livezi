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
        <main>{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}
