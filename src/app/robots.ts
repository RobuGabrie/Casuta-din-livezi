import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // The style guide is a tool for comparing the code with Figma, not a page for guests.
    rules: { userAgent: "*", allow: "/", disallow: ["/ro/styleguide", "/en/styleguide"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
