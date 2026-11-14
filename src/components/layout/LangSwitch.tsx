import Link from "next/link";
import { getDictionary, href, locales, type Locale, type PageKey } from "@/content/i18n";
import { cn } from "@/lib/cn";

/** "RO / EN". Each code links to the same page in that language. */
export function LangSwitch({
  lang,
  page,
  spacing = "tight",
  className,
}: {
  lang: Locale;
  page: PageKey;
  /** "wide" matches the menu's "RO     /     EN". */
  spacing?: "tight" | "wide";
  className?: string;
}) {
  return (
    <nav
      aria-label={getDictionary(lang).nav.languageLabel}
      className={cn("type-nav whitespace-pre", className)}
    >
      {locales.map((code, i) => (
        <span key={code}>
          {i > 0 && <span aria-hidden="true">{spacing === "wide" ? "     /     " : " / "}</span>}
          <Link
            href={href(code, page)}
            hrefLang={code}
            lang={code}
            aria-current={code === lang ? "true" : undefined}
            className="hover:underline hover:underline-offset-4"
          >
            {code.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
