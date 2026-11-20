import { en } from "./en";
import { ro } from "./ro";

export const locales = ["ro", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

const dictionaries = { ro, en } as const;
export const getDictionary = (lang: Locale) => dictionaries[lang];
export type Dictionary = typeof ro;

/** The site's pages. Slugs are Romanian in both languages, as in the design. */
export const pages = ["home", "cazare", "masa", "lavanda", "imprejurimi", "contact"] as const;
export type PageKey = (typeof pages)[number];

const slugs: Record<PageKey, string> = {
  home: "",
  cazare: "/cazare",
  masa: "/masa-la-noi",
  lavanda: "/lavanda",
  imprejurimi: "/imprejurimi",
  contact: "/contact",
};

/** URL of a page in a language, e.g. href("en", "cazare") → "/en/cazare". */
export const href = (lang: Locale, page: PageKey) => `/${lang}${slugs[page]}`;
