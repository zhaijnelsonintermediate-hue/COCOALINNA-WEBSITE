/**
 * Enumerates every indexable, canonical, 200 URL for the sitemap and feed.
 * Draft/preview/search pages are intentionally excluded. Each logical page
 * yields one entry per language, all sharing the same hreflang alternate set.
 */
import type { Locale } from "./site";
import { absoluteUrl } from "./site";
import { alternatesFor, pathFor, type RouteKey, type RouteParams } from "./routes";
import {
  articlesByRecency,
  knowledgeCategories,
  productCategories,
  publicApplications,
  publicArticles,
  publicProducts,
} from "./content";

const STRUCTURAL_LASTMOD = "2026-01-15";

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  alternates: Record<string, string>;
}

interface LogicalPage {
  key: RouteKey;
  params?: RouteParams;
  lastmod: string;
}

function logicalPages(): LogicalPage[] {
  const pages: LogicalPage[] = [
    { key: "home", lastmod: STRUCTURAL_LASTMOD },
    { key: "products", lastmod: STRUCTURAL_LASTMOD },
    { key: "solutions", lastmod: STRUCTURAL_LASTMOD },
    { key: "knowledge", lastmod: STRUCTURAL_LASTMOD },
    { key: "about", lastmod: STRUCTURAL_LASTMOD },
    { key: "rd-manufacturing", lastmod: STRUCTURAL_LASTMOD },
    { key: "quality-certifications", lastmod: STRUCTURAL_LASTMOD },
    { key: "resources", lastmod: STRUCTURAL_LASTMOD },
    { key: "contact", lastmod: STRUCTURAL_LASTMOD },
  ];
  for (const c of productCategories) {
    pages.push({ key: "productCategory", params: { category: c.slug }, lastmod: STRUCTURAL_LASTMOD });
  }
  for (const p of publicProducts) {
    pages.push({ key: "productDetail", params: { category: p.category, slug: p.slug }, lastmod: p.updatedAt });
  }
  for (const a of publicApplications) {
    pages.push({ key: "solutionDetail", params: { slug: a.slug }, lastmod: a.updatedAt });
  }
  for (const c of knowledgeCategories) {
    pages.push({ key: "knowledgeCategory", params: { category: c.slug }, lastmod: STRUCTURAL_LASTMOD });
  }
  for (const a of publicArticles) {
    pages.push({ key: "article", params: { category: a.category, slug: a.slug }, lastmod: a.updatedAt });
  }
  return pages;
}

export function sitemapEntries(): SitemapEntry[] {
  const locales: Locale[] = ["zh", "en"];
  const entries: SitemapEntry[] = [];
  for (const page of logicalPages()) {
    const alt = alternatesFor(page.key, page.params);
    for (const locale of locales) {
      entries.push({
        loc: absoluteUrl(pathFor(locale, page.key, page.params)),
        lastmod: page.lastmod,
        alternates: alt.languages,
      });
    }
  }
  return entries;
}

/** Feed items: public articles, most recent first, for both languages. */
export function feedItems() {
  const locales: Locale[] = ["zh", "en"];
  return articlesByRecency().flatMap((a) =>
    locales.map((locale) => ({
      article: a,
      locale,
      url: absoluteUrl(pathFor(locale, "article", { category: a.category, slug: a.slug })),
    })),
  );
}
