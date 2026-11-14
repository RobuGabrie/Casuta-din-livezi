import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/content/i18n";

/**
 * Adds the language to addresses that have none: "/" → "/ro", "/cazare" → "/ro/cazare".
 * Romanian unless the browser's first preferred language is something else, then English.
 */
export function proxy(request: NextRequest) {
  const first = (request.headers.get("accept-language") ?? "").split(",")[0]?.trim().slice(0, 2).toLowerCase();
  const lang = !first || first === defaultLocale ? defaultLocale : hasLocale(first) ? first : "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except: addresses that already start with a language, the admin page,
  // Next.js internals, and files (anything with a dot, like /photos/x.jpg).
  matcher: ["/((?!ro(?:/|$)|en(?:/|$)|admin|_next|.*\\..*).*)"],
};
