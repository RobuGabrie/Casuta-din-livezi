import Link from "next/link";
import { getDictionary, href, type Locale, type PageKey } from "@/content/i18n";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { LangSwitch } from "./LangSwitch";
import { MobileMenu } from "./MobileMenu";

const navPages = ["cazare", "masa", "lavanda", "contact"] as const;

// Desktop link boxes are fixed-width in Figma (64, 92, 64, 64, then 72 for RO / EN),
// 32px apart, inside a 620px block. The block is wider than its links, so the
// navigation stops short of the right margin; that gap is part of the design.
const navWidths: Record<(typeof navPages)[number], string> = {
  cazare: "min-w-16",
  masa: "min-w-[92px]",
  lavanda: "min-w-16",
  contact: "min-w-16",
};

/**
 * Site header (docs/design/specs/layout.md).
 * - tone "onPhoto": paper text over the hero photo, with a rule underneath. The hero
 *   places it; the header itself has no background.
 * - tone "paper": ink text on the page background, for pages without a hero photo.
 */
export function SiteHeader({
  lang,
  page,
  tone,
  rule = "line",
  className,
}: {
  lang: Locale;
  page: PageKey;
  tone: "onPhoto" | "paper";
  /** Colour of the rule under an onPhoto header: paper on Acasă, line elsewhere. */
  rule?: "paper" | "line";
  className?: string;
}) {
  const t = getDictionary(lang);
  const navLinks = navPages.map((p) => ({ href: href(lang, p), label: t.nav[p], current: p === page }));

  return (
    <header
      className={cn(
        "pt-6 lg:pt-8",
        tone === "onPhoto" ? "text-paper" : "pb-6 text-ink lg:pb-8",
        className,
      )}
    >
      <div className="flex h-[30px] items-center justify-between gap-6 lg:h-9">
        <Link href={href(lang, "home")} className="type-wordmark">
          {site.name}
        </Link>

        <nav aria-label={t.nav.label} className="type-nav hidden w-[620px] items-center gap-8 lg:flex">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.current ? "page" : undefined}
              className={cn(navWidths[navPages[i]], "hover:underline hover:underline-offset-4")}
            >
              {link.label}
            </Link>
          ))}
          <LangSwitch lang={lang} page={page} className="min-w-[72px]" />
        </nav>

        {/* Figma: "RO / EN" in a 60px box, 27px before the 28px menu icon box. */}
        <div className="flex items-center gap-[17px] lg:hidden">
          <LangSwitch lang={lang} page={page} className="min-w-[60px]" />
          <MobileMenu
            wordmark={site.name}
            homeHref={href(lang, "home")}
            links={[{ href: href(lang, "home"), label: t.nav.home }, ...navLinks]}
            langSwitch={<LangSwitch lang={lang} page={page} spacing="wide" />}
            footer={
              <p className="type-nav">
                {t.menu.place}
                <br />
                {t.menu.tagline}
              </p>
            }
            openLabel={t.nav.openMenu}
            closeLabel={t.nav.closeMenu}
          />
        </div>
      </div>

      {tone === "onPhoto" && (
        <div
          aria-hidden="true"
          className={cn("mt-[30px] h-px lg:mt-10", rule === "paper" ? "bg-paper/40" : "bg-line/40")}
        />
      )}
    </header>
  );
}
