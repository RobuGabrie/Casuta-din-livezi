import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";
import { getDictionary, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { callHref, whatsappHref } from "@/lib/contact";

/** Top of the Contact page: paper header, big title, contact details beside a photo. */
export function ContactIntro({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const t = d.contactPage;

  return (
    <>
      <Container>
        <SiteHeader lang={lang} page="contact" tone="paper" />
      </Container>
      <section>
        <Container className="flex flex-col gap-16 pt-10 pb-16 lg:pt-16 lg:pb-[120px]">
          <h1 id="continut" tabIndex={-1} className="type-display outline-none">
            {t.title}
          </h1>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,448fr)_minmax(0,736fr)] lg:items-start lg:gap-x-[clamp(64px,8.889vw,128px)]">
            <div className="flex flex-col items-start gap-6">
              <h2 className="type-h2">{t.subtitle}</h2>
              <p className="type-body-l">
                <Lines lines={t.address} />
              </p>
              <p className="type-nav text-forest">{t.phoneLabel}</p>
              <a href={callHref(lang)} className="type-h3 underline-offset-4 hover:underline">
                {site.phone}
              </a>
              <div className="flex flex-wrap gap-4">
                <Button href={callHref(lang)}>{d.actions.call}</Button>
                <Button href={whatsappHref()} variant="secondary">
                  {d.actions.whatsapp}
                </Button>
              </div>
              <p className="type-body text-muted">
                {t.emailLabel}:{" "}
                <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </p>
            </div>
            <Photo
              src="/photos/cazare/iaz-foisor-salcii-1.jpg"
              alt={t.photoAlt}
              sizes="(min-width: 64rem) 51vw, 100vw"
              className="h-[440px] lg:h-auto lg:aspect-[736/780]"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
