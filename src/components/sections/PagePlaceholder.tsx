import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { getDictionary, type Locale, type PageKey } from "@/content/i18n";

/**
 * Stand-in for pages not built yet, so links work and the header and footer can be
 * checked in both tones. Removed page by page in milestones 3 to 6.
 */
export function PagePlaceholder({
  lang,
  page,
  photo,
}: {
  lang: Locale;
  page: PageKey;
  /** Pages that open with a photo in Figma get an onPhoto header. */
  photo?: { src: string; alt: string };
}) {
  const t = getDictionary(lang);
  const title = t.nav[page];

  if (!photo) {
    return (
      <>
        <Container>
          <SiteHeader lang={lang} page={page} tone="paper" />
        </Container>
        <Container className="flex min-h-[60vh] flex-col justify-center gap-6 py-16">
          <h1 className="type-display">{title}</h1>
          <p className="type-body-l text-muted">{t.placeholder}</p>
        </Container>
      </>
    );
  }

  return (
    <section className="relative h-[740px] text-paper lg:h-[840px]">
      <div className="absolute inset-0">
        <Photo src={photo.src} alt={photo.alt} sizes="100vw" preload className="h-full" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(35_40_32/0.55)_0%,rgb(35_40_32/0.12)_45%,rgb(35_40_32/0.7)_100%)]"
      />
      <Container className="relative flex h-full flex-col">
        <SiteHeader lang={lang} page={page} tone="onPhoto" rule={page === "home" ? "paper" : "line"} />
        <div className="mt-auto flex flex-col gap-4 pb-16">
          <h1 className="type-display">{title}</h1>
          <p className="type-body-l">{t.placeholder}</p>
        </div>
      </Container>
    </section>
  );
}
