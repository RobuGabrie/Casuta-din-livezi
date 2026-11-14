import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { defaultLocale, getDictionary, hasLocale, href } from "@/content/i18n";

async function currentLang() {
  const value = await rootLang();
  return value && hasLocale(value) ? value : defaultLocale;
}

// Not in Figma: the quietest page that fits the design rules (paper header, display
// title, one line, the main action). Recorded in docs/design/components.md.
// The tab keeps the site's default title: only a not-found page at the top of the app
// can set its own, and this one has to live under [lang] to know the language.
export default async function NotFound() {
  const lang = await currentLang();
  const t = getDictionary(lang);
  const services = ["cazare", "masa", "lavanda"] as const;

  return (
    <>
      <Container>
        <SiteHeader lang={lang} page="home" tone="paper" />
      </Container>
      <Container className="flex flex-col items-start gap-6 pt-10 pb-16 lg:pt-16 lg:pb-[120px]">
        <h1 id="continut" tabIndex={-1} className="type-display outline-none">
          {t.notFound.title}
        </h1>
        <p className="type-body-l max-w-[560px] text-muted">{t.notFound.text}</p>
        <Button href={href(lang, "home")}>{t.notFound.home}</Button>
        <p className="type-body mt-4 text-muted">
          {t.notFound.or}{" "}
          {services.map((page, i) => (
            <span key={page}>
              {i > 0 && " · "}
              <Link href={href(lang, page)} className="text-forest underline underline-offset-4">
                {t.nav[page]}
              </Link>
            </span>
          ))}
        </p>
      </Container>
    </>
  );
}
