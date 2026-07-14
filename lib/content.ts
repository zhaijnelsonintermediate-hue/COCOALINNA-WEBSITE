/**
 * Typed, edge-safe content layer. All data is statically imported so it is
 * bundled into the Worker (no filesystem at runtime). Every page template and
 * JSON-LD builder reads through these accessors — the single source of truth.
 */
import type {
  Application,
  Article,
  Certification,
  CompanyData,
  EvidenceRef,
  KnowledgeCategory,
  Localized,
  Product,
  ProductCategory,
} from "./types";
import type { Locale } from "./site";

import companyJson from "../data/company.json";
import productsJson from "../data/products.json";
import applicationsJson from "../data/applications.json";
import articlesJson from "../data/articles.json";
import certificationsJson from "../data/certifications.json";
import evidenceJson from "../data/evidence.json";
import taxonomyJson from "../data/taxonomy.json";

export const company = companyJson as CompanyData;
export const products = productsJson as Product[];
export const applications = applicationsJson as Application[];
export const articles = articlesJson as Article[];
export const certifications = certificationsJson as Certification[];
export const evidenceList = evidenceJson as EvidenceRef[];

export type CategoryDef = {
  slug: ProductCategory;
  title: Localized;
  definition: Localized;
  selectionCriteria: { zh: string[]; en: string[] };
};
export type KnowledgeCategoryDef = {
  slug: KnowledgeCategory;
  title: Localized;
  definition: Localized;
};

export const productCategories = taxonomyJson.productCategories as CategoryDef[];
export const knowledgeCategories = taxonomyJson.knowledgeCategories as KnowledgeCategoryDef[];

/** Only public, verified records are exposed to templates. */
const isPublic = (s: { status: string }) => s.status === "verified";

export const publicProducts = products.filter(isPublic);
export const publicApplications = applications.filter(isPublic);
export const publicArticles = articles.filter(isPublic);

export function getProduct(slug: string): Product | undefined {
  return publicProducts.find((p) => p.slug === slug);
}
export function getProductById(id: string): Product | undefined {
  return publicProducts.find((p) => p.id === id);
}
export function productsByCategory(category: string): Product[] {
  return publicProducts.filter((p) => p.category === category);
}
export function getCategory(slug: string): CategoryDef | undefined {
  return productCategories.find((c) => c.slug === slug);
}

export function getApplication(slug: string): Application | undefined {
  return publicApplications.find((a) => a.slug === slug);
}

export function getArticle(category: string, slug: string): Article | undefined {
  return publicArticles.find((a) => a.category === category && a.slug === slug);
}
export function getArticleById(id: string): Article | undefined {
  return publicArticles.find((a) => a.id === id);
}
export function articlesByCategory(category: string): Article[] {
  return publicArticles.filter((a) => a.category === category);
}
export function getKnowledgeCategory(slug: string): KnowledgeCategoryDef | undefined {
  return knowledgeCategories.find((c) => c.slug === slug);
}

export function getCertification(id: string): Certification | undefined {
  return certifications.find((c) => c.id === id);
}
export function getEvidence(id: string): EvidenceRef | undefined {
  return evidenceList.find((e) => e.id === id);
}

export function loc<T extends { zh: string; en: string }>(value: T, locale: Locale): string {
  return value[locale];
}

/** Most-recently-updated public articles first (for feed + knowledge index). */
export function articlesByRecency(): Article[] {
  return [...publicArticles].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}
