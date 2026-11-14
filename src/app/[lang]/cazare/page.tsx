import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FacilitiesPanel } from "@/components/sections/FacilitiesPanel";
import { Gallery } from "@/components/sections/Gallery";
import { InfoColumns } from "@/components/sections/InfoColumns";
import { MapAside } from "@/components/sections/MapAside";
import { PageHero } from "@/components/sections/PageHero";
import { SeasonNote } from "@/components/sections/SeasonNote";
import { SplitIntro } from "@/components/sections/SplitIntro";
import { StayActions } from "@/components/sections/StayActions";
import { StickyBookingBar } from "@/components/sections/StickyBookingBar";
import { getDictionary, hasLocale } from "@/content/i18n";
import { callHref } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/cazare">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata({ lang, page: "cazare", title: t.nav.cazare, description: t.seo.cazare });
}

// Cazare. Figma frames 6:290 (desktop) and 6:280 (mobile); spec in docs/design/specs/cazare.md.
export default async function Cazare({ params }: PageProps<"/[lang]/cazare">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const t = d.stay;

  return (
    <>
      <PageHero
        lang={lang}
        page="cazare"
        index={t.hero.index}
        title={t.hero.title}
        lead={t.hero.lead}
        photo={{ src: "/photos/cazare/casa-de-sus-cu-dealuri.jpg", alt: t.hero.photoAlt }}
      />
      <SplitIntro statement={t.intro.statement}>
        <p className="type-body-l text-muted">{t.intro.text}</p>
        <p className="type-nav whitespace-pre-wrap text-forest">{t.intro.rating}</p>
        <StayActions lang={lang} />
        <p className="type-caption text-muted">{t.intro.note}</p>
      </SplitIntro>
      <Gallery
        title={t.gallery.title}
        caption={t.gallery.caption}
        photos={t.gallery.photos.map((p) => ({ ...p, src: `/photos/cazare/${p.file}.jpg` }))}
        featured={t.gallery.featured}
        labels={t.gallery}
      />
      <FacilitiesPanel title={t.facilities.title} items={t.facilities.items} />
      <InfoColumns title={t.rules.title} items={t.rules.items} />
      <SeasonNote title={t.season.title} text={t.season.text} />
      <MapAside
        id="rezerva"
        title={t.location.title}
        lines={t.location.lines}
        mapAlt={d.contactBand.mapAlt}
        actions={<StayActions lang={lang} />}
      />
      <StickyBookingBar
        primary={{ label: d.home.stay.direct, href: callHref(lang) }}
        secondary={{ label: t.bar.online, href: "#rezerva" }}
      />
    </>
  );
}
