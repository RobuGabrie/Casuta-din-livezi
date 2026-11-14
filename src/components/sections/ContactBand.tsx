import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { MapImage } from "@/components/ui/MapImage";
import { getDictionary, href, type Locale } from "@/content/i18n";
import { site } from "@/content/site";

/** Forest band with address, phone, email and the village map. */
export function ContactBand({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).contactBand;
  const pending = !site.phone;

  return (
    <section className="bg-forest text-paper">
      <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,448fr)_minmax(0,736fr)] lg:gap-x-[clamp(64px,8.889vw,128px)] lg:py-20">
        <div className="flex flex-col items-start gap-6">
          <h2 className="type-h2">{t.title}</h2>
          <p className="type-body">
            <Lines lines={t.address} />
          </p>
          <p className="type-body">
            {t.phoneLabel}:{" "}
            {site.phone ? (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="underline-offset-4 hover:underline">
                {site.phone}
              </a>
            ) : (
              t.phonePending
            )}
            <br />
            {t.emailLabel}:{" "}
            {site.email ? (
              <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                {site.email}
              </a>
            ) : (
              t.emailPending
            )}
          </p>
          <Button href={href(lang, "contact")} variant="onPhoto">
            {t.action}
          </Button>
          {pending && <p className="type-caption">{t.pendingNote}</p>}
        </div>
        <MapImage alt={t.mapAlt} className="aspect-[342/260] lg:aspect-[736/360]" />
      </Container>
    </section>
  );
}
