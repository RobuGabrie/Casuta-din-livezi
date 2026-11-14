import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DishGallery } from "@/components/sections/DishGallery";
import { NotePanel } from "@/components/sections/NotePanel";
import { PageHero } from "@/components/sections/PageHero";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { Button } from "@/components/ui/Button";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { getDictionary, hasLocale } from "@/content/i18n";
import { site } from "@/content/site";
import { ReservationSection } from "@/features/reservations/ReservationSection";
import { callHref } from "@/lib/contact";

export async function generateMetadata({ params }: PageProps<"/[lang]/masa-la-noi">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.nav.masa, description: t.table.story.lead };
}

// Masa la noi. Figma frames 6:307 (desktop) and 6:299 (mobile); spec in docs/design/specs/masa-la-noi.md.
export default async function MasaLaNoi({ params }: PageProps<"/[lang]/masa-la-noi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang).table;

  return (
    <>
      <PageHero
        lang={lang}
        page="masa"
        index={t.hero.index}
        title={t.hero.title}
        lead={t.hero.lead}
        photo={{ src: "/photos/masa/sala-panorama-1.jpg", alt: t.hero.photoAlt }}
        contrastMiddle={40}
        mobileBottom={100}
      />
      <StoryBlock
        label={t.story.label}
        title={t.story.title}
        lead={t.story.lead}
        paragraphs={[t.story.text]}
        actions={<Button href="#rezervare">{t.story.action}</Button>}
        photo={{ src: "/photos/masa/cos-paine-brodat.jpg", alt: t.story.photoAlt }}
        photoSide="right"
        photoAspect="736/800"
      />
      <DishGallery
        title={t.dishes.title}
        items={t.dishes.items.map((d) => ({ ...d, src: `/photos/masa/${d.file}.jpg` }))}
        footer={
          <a
            href={site.instagramKitchenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="type-nav inline-flex items-center gap-2 self-start text-forest underline underline-offset-4"
          >
            {t.dishes.instagram}
            <ExternalLinkIcon />
          </a>
        }
      />
      <StoryBlock
        title={t.events.title}
        paragraphs={[t.events.text, t.events.more]}
        actions={
          <Button href={callHref(lang)} variant="secondary">
            {t.events.action}
          </Button>
        }
        photo={{ src: "/photos/evenimente/masa-botez-1.jpg", alt: t.events.photoAlt }}
        photoSide="left"
        photoAspect="736/680"
      />
      <NotePanel title={t.schedule.title} lines={t.schedule.lines} />
      <ReservationSection lang={lang} />
    </>
  );
}
