/**
 * JSON-LD builders. Every graph is generated from the same content layer that
 * renders the visible page, so structured data never contradicts what a user
 * (or crawler) reads. Stable `@id`s connect entities across pages.
 *
 * Rules honoured here:
 *  - No fabricated Offer/price/availability (we have no public price).
 *  - Only confirmed attributes become Product.additionalProperty.
 *  - Absolute URLs everywhere.
 */
import type { Article, Product } from "./types";
import type { Locale } from "./site";
import { SITE, absoluteUrl } from "./site";
import { canonicalFor, pathFor, type RouteKey, type RouteParams } from "./routes";
import { company, getProductById, loc } from "./content";

const ORG_ID = `${SITE.origin}/#organization`;
const WEBSITE_ID = `${SITE.origin}/#website`;

export function organizationSchema(locale: Locale) {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: loc(company.legalName, locale),
    alternateName: [company.brand, company.brandZh],
    url: SITE.origin + "/",
    foundingDate: company.foundingYear,
    description: loc(company.description, locale),
    telephone: company.phone,
    address: company.locations.map((l) => ({
      "@type": "PostalAddress",
      streetAddress: loc(l.streetAddress, locale),
      addressLocality: loc(l.addressLocality, locale),
      addressCountry: l.country,
    })),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.origin + "/",
    name: `${company.brandZh} ${company.brand}`,
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    publisher: { "@id": ORG_ID },
  };
}

/** Breadcrumb from a list of { name, key/params } steps (last item = current page). */
export function breadcrumbSchema(
  locale: Locale,
  steps: { name: string; key: RouteKey; params?: RouteParams }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: steps.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      item: canonicalFor(locale, s.key, s.params),
    })),
  };
}

export function productSchema(locale: Locale, product: Product) {
  const url = canonicalFor(locale, "productDetail", {
    category: product.category,
    slug: product.slug,
  });
  const additionalProperty = product.attributes.map((a) => ({
    "@type": "PropertyValue",
    name: loc(a.label, locale),
    value: loc(a.value, locale),
  }));
  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: loc(product.name, locale),
    description: loc(product.shortDescription, locale),
    sku: product.sku,
    mpn: product.mpn,
    brand: { "@type": "Brand", name: product.brand },
    manufacturer: { "@id": ORG_ID },
    category: product.category,
    image: product.images.map((i) => absoluteUrl(i.src)),
    url,
    ...(additionalProperty.length ? { additionalProperty } : {}),
    // No Offer: there is no public price/availability. Do not fabricate one.
  };
}

export function productListSchema(
  locale: Locale,
  key: RouteKey,
  params: RouteParams,
  items: Product[],
) {
  return {
    "@type": "ItemList",
    "@id": `${canonicalFor(locale, key, params)}#list`,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: canonicalFor(locale, "productDetail", { category: p.category, slug: p.slug }),
      name: loc(p.name, locale),
    })),
  };
}

export function articleSchema(locale: Locale, article: Article) {
  const url = canonicalFor(locale, "article", {
    category: article.category,
    slug: article.slug,
  });
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: loc(article.title, locale),
    description: loc(article.summary, locale),
    inLanguage: locale === "zh" ? "zh-CN" : "en",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: loc(article.author, locale) },
    ...(article.technicalReviewer && article.technicalReviewer[locale] !== "TODO_COMPANY_VERIFY"
      ? { reviewedBy: { "@type": "Person", name: loc(article.technicalReviewer, locale) } }
      : {}),
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: url,
    ...(article.heroImage ? { image: absoluteUrl(article.heroImage.src) } : {}),
  };
}

/** FAQPage — only call when the FAQ is genuinely visible on the page. */
export function faqSchema(locale: Locale, faq: Article["faq"]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: loc(f.question, locale),
      acceptedAnswer: { "@type": "Answer", text: loc(f.answer, locale) },
    })),
  };
}

/** Wrap one or more entities into a single @graph document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Small helper used by templates to link a recommended product list to names. */
export function resolveProductNames(locale: Locale, ids: string[]): string[] {
  return ids
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p))
    .map((p) => loc(p.name, locale));
}

export function jsonLdScript(data: object): string {
  // Escape "<" to prevent breaking out of the <script> context.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export { pathFor };
