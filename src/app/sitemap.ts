import type { MetadataRoute } from "next";
import { href, locales, pages } from "@/content/i18n";
import { languageAlternates, siteUrl } from "@/lib/seo";

// Every page in every language, each listing its other-language versions.
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) =>
    locales.map((lang) => ({
      url: `${siteUrl}${href(lang, page)}`,
      changeFrequency: "monthly" as const,
      priority: page === "home" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(page)).map(([code, path]) => [code, `${siteUrl}${path}`]),
        ),
      },
    })),
  );
}
