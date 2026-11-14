import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { getDictionary, type Locale } from "@/content/i18n";
import { ReservationForm } from "./ReservationForm";

/** "Rezervă o masă": the intro beside the table request form. Anchor: #rezervare. */
export function ReservationSection({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).table.reserve;

  return (
    <section id="rezervare" className="scroll-mt-6">
      <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,448fr)_minmax(0,736fr)] lg:items-start lg:gap-x-[clamp(64px,8.889vw,128px)] lg:py-[120px]">
        <div className="flex flex-col gap-6">
          <h2 className="type-h2">
            <Lines lines={t.title} />
          </h2>
          <p className="type-body-l text-muted">{t.lead}</p>
          <p className="type-body text-muted">{t.text}</p>
        </div>
        <ReservationForm lang={lang} />
      </Container>
    </section>
  );
}
