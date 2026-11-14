import { Button } from "@/components/ui/Button";
import { getDictionary, type Locale } from "@/content/i18n";
import { site } from "@/content/site";
import { callHref } from "@/lib/contact";

/**
 * The stay's booking buttons, everywhere the cottage is booked: "Rezervă cu noi"
 * first (direct, no commission), then Booking.com and Airbnb (docs/design/specs/acasa.md).
 */
export function StayActions({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).home.stay;
  return (
    <div className="flex flex-wrap gap-3">
      <Button href={callHref(lang)}>{t.direct}</Button>
      <Button href={site.bookingUrl} variant="secondary" arrow>
        {t.booking}
      </Button>
      {site.airbnbUrl && (
        <Button href={site.airbnbUrl} variant="secondary" arrow>
          {t.airbnb}
        </Button>
      )}
    </div>
  );
}
