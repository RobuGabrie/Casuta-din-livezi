import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";
import { PhotoContrast } from "@/components/ui/PhotoContrast";
import type { Locale, PageKey } from "@/content/i18n";
import { cn } from "@/lib/cn";

/**
 * Hero of the service pages: photo, header, optional index, large title, a lead and an
 * optional note at the bottom (specs: cazare.md, masa-la-noi.md, lavanda-contact.md).
 */
export function PageHero({
  lang,
  page,
  index,
  title,
  lead,
  note,
  photo,
  contrastMiddle,
  mobileBottom = 60,
}: {
  lang: Locale;
  page: PageKey;
  index?: string;
  title: string;
  lead: string | readonly string[];
  /** Small line under the lead (Lavanda); changes the spacing as in Figma. */
  note?: string;
  photo: { src: string; alt: string; position?: string };
  /** Middle stop of the contrast layer, from Figma (35 or 40). */
  contrastMiddle?: number;
  /** Space under the lead on mobile when there is no note: 60 for two lines, 100 for one. */
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
        <div
          className={cn(
            "mt-auto",
            note ? "pb-8 lg:pb-[30px]" : mobileBottom === 100 ? "pb-[100px] lg:pb-20" : "pb-[60px] lg:pb-20",
          )}
        >
          {index && <p className="type-index mb-[22px] lg:mb-5">{index}</p>}
          <h1 className="type-display">{title}</h1>
          <p className={cn("type-body-l mt-[26px] lg:max-w-[850px]", note ? "lg:mt-5" : "lg:mt-7")}>
            <Lines lines={typeof lead === "string" ? [lead] : lead} />
          </p>
          {note && <p className="type-caption mt-10 lg:mt-7">{note}</p>}
        </div>
      </Container>
    </section>
  );
}
