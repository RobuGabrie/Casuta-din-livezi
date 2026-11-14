import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactIntro } from "@/components/sections/ContactIntro";
import { MapSection } from "@/components/sections/MapSection";
import { SideTitle } from "@/components/sections/SideTitle";
import { getDictionary, hasLocale } from "@/content/i18n";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata({ lang, page: "contact", title: t.nav.contact, description: t.seo.contact });
}

// Contact. Figma frames 6:337 (desktop) and 6:331 (mobile); spec in docs/design/specs/lavanda-contact.md.
export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const t = d.contactPage;

  return (
    <>
      <ContactIntro lang={lang} />
      <SideTitle title={t.directions.title}>
        <p className="type-body-l text-muted">{t.directions.lead}</p>
        <p className="type-body text-muted">{t.directions.text}</p>
      </SideTitle>
      <MapSection
        mapAlt={d.contactBand.mapAlt}
        action={{ label: t.map.action, href: site.mapsUrl }}
        caption={t.map.caption}
      />
    </>
  );
}
