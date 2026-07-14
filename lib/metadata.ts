/**
 * Builds Next.js Metadata (title, description, canonical, hreflang, Open Graph)
 * for any page from its route key + params. Canonical is self-referential and
 * hreflang alternates always point both ways with an x-default.
 */
import type { Metadata } from "next";
import type { Locale } from "./site";
import { SITE, absoluteUrl } from "./site";
import { alternatesFor, pathFor, type RouteKey, type RouteParams } from "./routes";
import { company } from "./content";

const TITLE_SUFFIX: Record<Locale, string> = {
  zh: "可可琳纳 COCOA-LINNA",
  en: "Cocoa-Linna",
};

export interface PageMetaInput {
  locale: Locale;
  key: RouteKey;
  params?: RouteParams;
  title: string;
  description: string;
  image?: string;
  /** noindex,follow for search-result/preview/thin pages. */
  noindex?: boolean;
}

export function buildMetadata(input: PageMetaInput): Metadata {
  const { locale, key, params = {}, title, description, image, noindex } = input;
  const canonicalPath = pathFor(locale, key, params);
  const alt = alternatesFor(key, params);
  const ogImage = image ?? "/company/image-277.webp";
  const fullTitle = key === "home" ? title : `${title}｜${TITLE_SUFFIX[locale]}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: alt.languages,
    },
    openGraph: {
      type: key === "article" ? "article" : "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      title: fullTitle,
      description,
      url: absoluteUrl(canonicalPath),
      siteName: `${company.brandZh} ${company.brand}`,
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(ogImage)],
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    metadataBase: new URL(SITE.origin),
  };
}
