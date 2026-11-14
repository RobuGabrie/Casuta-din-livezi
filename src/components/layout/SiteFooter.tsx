import Link from "next/link";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import { Container } from "@/components/ui/Container";
import { getDictionary, href, type Locale } from "@/content/i18n";
import { site } from "@/content/site";

const footerPages = ["cazare", "masa", "lavanda", "contact"] as const;

/** Footer "Subsol" (docs/design/specs/layout.md). */
export function SiteFooter({ lang }: { lang: Locale }) {
  const t = getDictionary(lang);
  const social = [
    { url: site.facebookUrl, label: "Facebook", Icon: FacebookIcon },
    { url: site.instagramStayUrl, label: "Instagram", Icon: InstagramIcon },
  ].filter((s) => s.url);
  const external = [...social, { url: site.bookingUrl, label: "Booking.com" }];

  return (
    <footer className="bg-forest text-paper">
      <Container className="flex flex-col gap-6 pt-16 pb-10 lg:pt-20">
        <div aria-hidden="true" className="h-px bg-paper/22" />
        <p className="type-footer-wordmark">{site.name}</p>
        <p className="type-body">{t.footer.tagline}</p>

        <nav aria-label={t.footer.linksLabel}>
          <ul className="type-nav grid grid-cols-[repeat(2,minmax(0,150px))] gap-x-6 gap-y-4 lg:grid-cols-[repeat(4,160px)]">
            {footerPages.map((p) => (
              <li key={p}>
                <Link href={href(lang, p)} className="hover:underline hover:underline-offset-4">
                  {t.nav[p]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {social.length > 0 && (
          <ul aria-label={t.footer.socialLabel} className="flex gap-6">
            {social.map(({ url, label, Icon }) => (
              <li key={label}>
                <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        )}

        <ul className="type-nav flex flex-wrap gap-x-[14px] gap-y-2">
          {external.map(({ url, label }) => (
            <li key={label}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <p className="type-caption">
          © {site.foundedYear} {site.name} · {t.footer.place}
        </p>
      </Container>
    </footer>
  );
}
