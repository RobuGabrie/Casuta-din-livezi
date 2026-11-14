import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";
import { PhotoContrast } from "@/components/ui/PhotoContrast";
import { getDictionary, href, type Locale } from "@/content/i18n";

const services = ["cazare", "masa", "lavanda"] as const;

/**
 * Home hero: photo, header, greeting, and three compact service selectors at the
 * bottom (docs/design/specs/acasa.md, Figma 6:271 / 6:262, updated 2026-11-15).
 */
export function HomeHero({ lang, introId }: { lang: Locale; introId: string }) {
  const t = getDictionary(lang);
  const hero = t.home.hero;

  return (
    <section className="relative h-[800px] text-paper lg:h-[920px]">
      <div className="absolute inset-0">
        <Photo
          src="/photos/cazare/casa-de-sus-cu-dealuri.jpg"
          alt={t.home.stay.photoAlt}
          sizes="100vw"
          preload
          className="h-full"
        />
      </div>
      <PhotoContrast variant="hero" />

      <Container className="relative flex h-full flex-col">
        <SiteHeader lang={lang} page="home" tone="onPhoto" rule="paper" />
        <p id="continut" tabIndex={-1} className="type-nav mt-[45px] outline-none lg:mt-[61px]">
          {hero.place}
        </p>

        {/* Bottom block. Mobile order: greeting, line, "Descoperă locul", services.
            Desktop order: greeting, line, services, "Descoperă locul" on the right. */}
        <div className="mt-auto flex flex-col pb-[69px] lg:pb-7">
          <h1 className="type-hero-intro">
            <Lines lines={hero.title} />
          </h1>
          <p className="type-body mt-4 max-w-[640px] lg:mt-6">{hero.tagline}</p>

          <nav
            aria-label={t.nav.servicesLabel}
            className="order-4 mt-4 grid grid-cols-[98fr_122fr_98fr] gap-3 lg:order-3 lg:mt-[136px] lg:grid-cols-3 lg:gap-8"
          >
            {services.map((page) => (
              <Link key={page} href={href(lang, page)} className="group flex flex-col gap-2">
                <span aria-hidden="true" className="h-px bg-paper/60" />
                <span className="flex items-center justify-between gap-2">
                  <span className="type-service-selector group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8">
                    {t.nav[page]}
                  </span>
                  <span aria-hidden="true" className="type-h3 hidden transition-transform group-hover:translate-x-1 lg:inline">
                    →
                  </span>
                </span>
                <span className="type-caption lg:hidden">{hero.services[page].short}</span>
                <span className="type-nav hidden lg:inline">{hero.services[page].long}</span>
              </Link>
            ))}
          </nav>

          <a
            href={`#${introId}`}
            className="type-caption order-3 mt-7 self-start hover:underline hover:underline-offset-4 lg:order-4 lg:mt-[37px] lg:self-end"
          >
            {hero.discover}  ↓
          </a>
        </div>
      </Container>
    </section>
  );
}
