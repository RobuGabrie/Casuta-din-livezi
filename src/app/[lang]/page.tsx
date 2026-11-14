import { notFound } from "next/navigation";
import { ContactBand } from "@/components/sections/ContactBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { IntroStatement } from "@/components/sections/IntroStatement";
import { PhotoBand } from "@/components/sections/PhotoBand";
import { PlacesList } from "@/components/sections/PlacesList";
import { ServiceBlock } from "@/components/sections/ServiceBlock";
import { Button } from "@/components/ui/Button";
import { getDictionary, hasLocale, href } from "@/content/i18n";
import { site } from "@/content/site";
import { callHref } from "@/lib/contact";

// Acasă. Figma frames 6:271 (desktop) and 6:262 (mobile); spec in docs/design/specs/acasa.md.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).home;

  return (
    <>
      <HomeHero lang={lang} introId="bun-venit" />
      <IntroStatement id="bun-venit" statement={t.intro.statement} text={t.intro.text} />

      <ServiceBlock
        index={t.stay.index}
        title={t.stay.title}
        text={t.stay.text}
        facts={t.stay.facts}
        photo={{ src: "/photos/cazare/casa-de-sus-cu-dealuri.jpg", alt: t.stay.photoAlt }}
        photoSide="right"
        photoAspect="tall"
        actions={
          <>
            <Button href={site.bookingUrl} variant="booking">
              {t.stay.booking}
            </Button>
            {site.airbnbUrl && (
              <Button href={site.airbnbUrl} variant="secondary" arrow>
                {t.stay.airbnb}
              </Button>
            )}
            <Button href={callHref(lang)} variant="secondary">
              {t.stay.direct}
            </Button>
          </>
        }
      />

      <ServiceBlock
        index={t.table.index}
        title={t.table.title}
        text={t.table.text}
        facts={t.table.facts}
        photo={{ src: "/photos/masa/sala-panorama-1.jpg", alt: t.table.photoAlt }}
        photoSide="left"
        photoAspect="wide"
        actions={<Button href={`${href(lang, "masa")}#rezervare`}>{t.table.action}</Button>}
      />

      <PhotoBand
        title={t.lavender.title}
        text={t.lavender.text}
        action={{ label: t.lavender.action, href: href(lang, "lavanda") }}
        caption={t.lavender.caption}
        photo={{ src: "/photos/lavanda/randuri-lavanda-toamna.jpg", alt: t.lavender.photoAlt }}
      />

      <PlacesList title={t.nearby.title} items={t.nearby.items} />
      <ContactBand lang={lang} />
    </>
  );
}
