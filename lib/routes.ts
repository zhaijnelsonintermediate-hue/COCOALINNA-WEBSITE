/**
 * Central URL model. Every canonical path, breadcrumb, hreflang alternate and
 * sitemap entry is derived from `pathFor()` so the two languages never drift.
 *
 * URL policy (see docs/ROUTE-MAP.md):
 *  - Chinese (default locale) is served at the root: `/products/...`
 *  - English is served under `/en/`: `/en/products/...`
 *  - Every page path ends with a trailing slash.
 *  - Category / article slugs are stable lowercase ASCII with hyphens.
 */
import type { Locale } from "./site";
import { SITE, absoluteUrl } from "./site";

export type RouteParams = { category?: string; slug?: string };

export type RouteKey =
  | "home"
  | "products"
  | "productCategory"
  | "productDetail"
  | "solutions"
  | "solutionDetail"
  | "knowledge"
  | "knowledgeCategory"
  | "article"
  | "about"
  | "rd-manufacturing"
  | "quality-certifications"
  | "resources"
  | "contact";

function basePath(key: RouteKey, p: RouteParams = {}): string {
  switch (key) {
    case "home":
      return "/";
    case "products":
      return "/products/";
    case "productCategory":
      return `/products/${p.category}/`;
    case "productDetail":
      return `/products/${p.category}/${p.slug}/`;
    case "solutions":
      return "/solutions/";
    case "solutionDetail":
      return `/solutions/${p.slug}/`;
    case "knowledge":
      return "/knowledge/";
    case "knowledgeCategory":
      return `/knowledge/${p.category}/`;
    case "article":
      return `/knowledge/${p.category}/${p.slug}/`;
    default:
      return `/${key}/`;
  }
}

/** Locale-aware path (relative, always trailing-slashed). */
export function pathFor(locale: Locale, key: RouteKey, p: RouteParams = {}): string {
  const base = basePath(key, p);
  if (locale === SITE.defaultLocale) return base;
  return base === "/" ? "/en/" : `/en${base}`;
}

/** Absolute canonical URL for a page. */
export function canonicalFor(locale: Locale, key: RouteKey, p: RouteParams = {}): string {
  return absoluteUrl(pathFor(locale, key, p));
}

/**
 * hreflang alternates for a page: both languages plus x-default (points at the
 * default locale). Feeds Next `alternates.languages` and the sitemap.
 */
export function alternatesFor(key: RouteKey, p: RouteParams = {}): {
  canonicalPath: (locale: Locale) => string;
  languages: Record<string, string>;
} {
  const zh = absoluteUrl(pathFor("zh", key, p));
  const en = absoluteUrl(pathFor("en", key, p));
  return {
    canonicalPath: (locale) => pathFor(locale, key, p),
    languages: {
      "zh-CN": zh,
      en: en,
      "x-default": zh,
    },
  };
}
