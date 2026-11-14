import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { PhotoContrast } from "@/components/ui/PhotoContrast";
import { getDictionary, href, type Locale } from "@/content/i18n";
import { site } from "@/content/site";

const services = ["cazare", "masa", "lavanda"] as const;

/** Home hero: photo, header, and the three service words (docs/design/specs/acasa.md). */
export function HomeHero({ lang, introId }: { lang: Locale; introId: string }) {
  const t = getDictionary(lang);

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
      <PhotoContrast />

      <Container className="relative flex h-full flex-col">
        <SiteHeader lang={lang} page="home" tone="onPhoto" rule="paper" />
        <p id="continut" tabIndex={-1} className="type-nav mt-[45px] outline-none lg:mt-[61px]">
          {t.home.hero.place}
        </p>

        <h1 className="sr-only">{site.name}</h1>
        <nav
          aria-label={t.nav.servicesLabel}
          className="mt-auto grid gap-4 lg:grid-cols-[372fr_464fr_412fr] lg:gap-8"
        >
          {services.map((page, i) => (
            <Link key={page} href={href(lang, page)} className="group flex flex-col gap-1 lg:gap-4">
              <span aria-hidden="true" className="h-px bg-paper/60" />
              {/* Figma keeps a 36px box here; the number sits at its top. */}
              <span aria-hidden="true" className="type-index h-9">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="type-service-link group-hover:underline group-hover:decoration-1 group-hover:underline-offset-8">
                {t.nav[page]}
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-[21px] flex flex-col gap-4 pb-4 lg:mt-[95px] lg:flex-row lg:items-start lg:justify-between lg:pb-[50px]">
          <p className="type-nav">{t.home.hero.tagline}</p>
          <a href={`#${introId}`} className="type-caption self-end hover:underline hover:underline-offset-4 lg:mt-0.5">
            {t.home.hero.discover}  ↓
          </a>
        </div>
      </Container>
    </section>
  );
}
