import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { PhotoContrast } from "@/components/ui/PhotoContrast";
import type { Locale, PageKey } from "@/content/i18n";
import { cn } from "@/lib/cn";

/**
 * Hero of the service pages (Cazare, Masa la noi, Lavanda): photo, header, index,
 * large title and a lead line at the bottom (docs/design/specs/cazare.md).
 */
export function PageHero({
  lang,
  page,
  index,
  title,
  lead,
  photo,
  contrastMiddle,
  mobileBottom = 60,
}: {
  lang: Locale;
  page: PageKey;
  index: string;
  title: string;
  lead: string;
  photo: { src: string; alt: string; position?: string };
  /** Middle stop of the contrast layer, from Figma (35 or 40). */
  contrastMiddle?: number;
  /** Space under the lead on mobile: 60 when the lead takes two lines, 100 for one. */
  mobileBottom?: 60 | 100;
}) {
  return (
    <section className="relative h-[740px] text-paper lg:h-[840px]">
      <div className="absolute inset-0">
        <Photo src={photo.src} alt={photo.alt} sizes="100vw" preload position={photo.position} className="h-full" />
      </div>
      <PhotoContrast variant="page" middle={contrastMiddle} />

      <Container className="relative flex h-full flex-col">
        <SiteHeader lang={lang} page={page} tone="onPhoto" />
        <div className={cn("mt-auto lg:pb-20", mobileBottom === 100 ? "pb-[100px]" : "pb-[60px]")}>
          <p className="type-index">{index}</p>
          <h1 className="type-display mt-[22px] lg:mt-5">{title}</h1>
          <p className="type-body-l mt-[26px] lg:mt-7 lg:max-w-[850px]">{lead}</p>
        </div>
      </Container>
    </section>
  );
}
