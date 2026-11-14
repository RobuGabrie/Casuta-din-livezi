import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CallBand } from "@/components/sections/CallBand";
import { PageHero } from "@/components/sections/PageHero";
import { SplitIntro } from "@/components/sections/SplitIntro";
import { StoryBlock } from "@/components/sections/StoryBlock";
import { Button } from "@/components/ui/Button";
import { getDictionary, hasLocale } from "@/content/i18n";
import { site } from "@/content/site";
import { callHref, whatsappHref } from "@/lib/contact";

export async function generateMetadata({ params }: PageProps<"/[lang]/lavanda">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.nav.lavanda, description: t.lavender.season.text };
}

// Lavanda. Figma frames 6:323 (desktop) and 6:315 (mobile); spec in docs/design/specs/lavanda-contact.md.
export default async function Lavanda({ params }: PageProps<"/[lang]/lavanda">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const t = d.lavender;

  const stories = [
    { ...t.walk, src: "/photos/lavanda/randuri-lavanda-toamna.jpg", side: "right" },
    { ...t.photos, src: "/photos/lavanda/rama-foto-lavanda-1.jpg", side: "left" },
    { ...t.goods, src: "/photos/lavanda/apus-peste-livada.jpg", side: "right" },
  ] as const;

  return (
    <>
      <PageHero
        lang={lang}
        page="lavanda"
        title={t.hero.title}
        lead={t.hero.lead}
        note={t.hero.note}
        photo={{ src: "/photos/lavanda/randuri-lavanda-toamna.jpg", alt: t.hero.photoAlt }}
        contrastMiddle={40}
      />
      <SplitIntro statement={t.season.statement}>
        <p className="type-accent text-forest">{t.season.when}</p>
        <p className="type-body-l text-muted">{t.season.text}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={callHref(lang)}>{d.actions.call}</Button>
          <Button href={whatsappHref()} variant="secondary">
            {d.actions.whatsapp}
          </Button>
        </div>
      </SplitIntro>
      {stories.map((s) => (
        <StoryBlock
          key={s.label}
          label={s.label}
          title={s.title}
          paragraphs={[s.text]}
          photo={{ src: s.src, alt: s.photoAlt }}
          photoSide={s.side}
          photoAspect="736/720"
          spacing="bottom"
        />
      ))}
      <CallBand
        title={t.contact.title}
        text={t.contact.text}
        action={{ label: t.contact.action, href: whatsappHref(t.contact.whatsappText) }}
        note={`${d.contactBand.phoneLabel}: ${site.phone}`}
      />
    </>
  );
}
