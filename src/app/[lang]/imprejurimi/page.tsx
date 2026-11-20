import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CallBand } from "@/components/sections/CallBand";
import { InfoColumns } from "@/components/sections/InfoColumns";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { NearbyGroup } from "@/components/sections/NearbyGroup";
import { PageHero } from "@/components/sections/PageHero";
import { getDictionary, hasLocale, href, type Locale } from "@/content/i18n";
import { directionsUrl, nearbyGroups, nearbyPlaces, type NearbyKey } from "@/content/nearby";
import { site } from "@/content/site";
import { pageMetadata, siteUrl } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/imprejurimi">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMetadata({ lang, page: "imprejurimi", title: t.nearbyPage.title, description: t.seo.imprejurimi });
}

/** "1 km · 15 min pe jos", "25 km · 35 min cu mașina", "62 km · 1 h 30 min cu mașina". */
function distanceLabel(lang: Locale, key: NearbyKey) {
  const t = getDictionary(lang).nearbyPage;
  const p = nearbyPlaces[key];
  const km = p.km < 10 ? Math.round(p.km) || 1 : Math.round(p.km);
  const h = Math.floor(p.minutes / 60);
  const m = p.minutes % 60;
  const time = h ? `${h} h${m ? ` ${m} min` : ""}` : `${m} min`;
  return `${km} km · ${time} ${p.onFoot ? t.onFoot : t.byCar}`;
}

// Împrejurimi. Not in Figma: built from the existing sections (docs/design/components.md).
export default async function Imprejurimi({ params }: PageProps<"/[lang]/imprejurimi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const t = d.nearbyPage;

  const card = (key: NearbyKey) => {
    const p = nearbyPlaces[key];
    const text = t.places[key];
    const license = p.credit.license === "public-domain" ? t.publicDomain : p.credit.license;
    const wiki = p.wiki[lang] ?? p.wiki.ro;
    return {
      name: text.name,
      text: text.text,
      distance: distanceLabel(lang, key),
      photo: {
        src: `/photos/imprejurimi/${key}.jpg`,
        alt: text.photoAlt,
        credit: `${t.photo}: ${p.credit.author}, ${license}, Wikimedia Commons (${t.cropped})`,
        creditHref: p.credit.source,
      },
      links: [
        { label: t.directions, href: directionsUrl(p.lat, p.lon) },
        ...(wiki ? [{ label: t.wiki, href: wiki }] : []),
      ],
    };
  };

  // Tells search engines which attractions the page lists and where each one is.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.title,
    itemListElement: nearbyGroups
      .flatMap((g) => g.places)
      .map((key, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "TouristAttraction",
          name: t.places[key].name,
          description: t.places[key].text,
          image: `${siteUrl}/photos/imprejurimi/${key}.jpg`,
          geo: { "@type": "GeoCoordinates", latitude: nearbyPlaces[key].lat, longitude: nearbyPlaces[key].lon },
          ...(nearbyPlaces[key].wiki.ro ? { sameAs: Object.values(nearbyPlaces[key].wiki) } : {}),
        },
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output escaped for safe embedding in HTML.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <PageHero
        lang={lang}
        page="imprejurimi"
        index={t.hero.index}
        title={t.hero.title}
        lead={t.hero.lead}
        photo={{ src: "/photos/imprejurimi/voronet-mare.jpg", alt: t.hero.photoAlt }}
      />
      <IntroStatement statement={t.intro.statement} text={t.intro.text} />
      {nearbyGroups.map((g) => (
        <NearbyGroup key={g.key} title={t.groups[g.key]} places={g.places.map(card)} />
      ))}
      <InfoColumns title={t.trips.title} items={t.trips.items} />
      <CallBand
        title={t.contact.title}
        text={t.contact.text}
        action={{ label: t.contact.action, href: href(lang, "cazare") }}
        note={`${d.contactBand.phoneLabel}: ${site.phone}`}
      />
    </>
  );
}
