import { getDictionary, href, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/seo";

/**
 * Tells search engines what the place is (schema.org JSON-LD): a holiday home and a
 * restaurant at the same address in Cacica. Rendered once, on Acasă.
 *
 * Left out on purpose: the Booking.com rating (Google does not allow third-party
 * reviews in a site's own markup) and opening days (only the hours are confirmed).
 */
export function StructuredData({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const address = {
    "@type": "PostalAddress",
    addressLocality: "Cacica",
    addressRegion: "Suceava",
    addressCountry: "RO",
  };
  const sameAs = [site.facebookUrl, site.instagramStayUrl, site.instagramKitchenUrl, site.bookingUrl, site.airbnbUrl].filter(
    Boolean,
  );

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": `${siteUrl}/#cazare`,
        name: site.name,
        description: t.meta.description,
        url: `${siteUrl}${href(lang, "home")}`,
        image: `${siteUrl}/og/acasa.jpg`,
        telephone: site.phone,
        email: site.email,
        address,
        checkinTime: "15:00",
        checkoutTime: "11:00",
        petsAllowed: false,
        smokingAllowed: false,
        sameAs,
      },
      {
        "@type": "Restaurant",
        "@id": `${siteUrl}/#masa`,
        name: `${site.name} · ${t.nav.masa}`,
        description: t.table.story.lead,
        url: `${siteUrl}${href(lang, "masa")}`,
        image: `${siteUrl}/og/masa-la-noi.jpg`,
        telephone: site.phone,
        address,
        servesCuisine: lang === "ro" ? "Bucătărie tradițională din Bucovina" : "Traditional Bucovina cooking",
        acceptsReservations: true,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output escaped for safe embedding in HTML.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
