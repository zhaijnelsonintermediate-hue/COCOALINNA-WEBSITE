/**
 * Content-model types shared by every page template, JSON-LD builder and the
 * validation scripts. These mirror the field lists in the project brief
 * (docs/CONTENT-MODEL.md). Fields may be empty, but must never be fabricated:
 * unconfirmed values stay empty / omitted and are tracked in
 * docs/COMPANY-DATA-TODO.md.
 */
import type { Locale } from "./site";

export type { Locale };

/** Publication status. Only `verified` public facts are rendered on public pages. */
export type Status = "verified" | "pending" | "internal";

/** A string that exists in both site languages. */
export type Localized = { zh: string; en: string };
/** A string list that exists in both site languages. */
export type LocalizedList = { zh: string[]; en: string[] };

export type ProductCategory =
  | "couverture"
  | "compound-chocolate"
  | "chocolate-sauce"
  | "functional-decoration";

export type ApplicationSlug =
  | "bakery"
  | "ice-cream-frozen-dessert"
  | "beverage-dairy"
  | "food-manufacturing";

export type KnowledgeCategory =
  | "selection-guides"
  | "application-guides"
  | "standards-quality"
  | "rd-insights";

export interface ProductImage {
  src: string;
  alt: Localized;
  width: number;
  height: number;
}

/** A single confirmed technical attribute (rendered in the spec table + Schema additionalProperty). */
export interface Attribute {
  key: string;
  label: Localized;
  value: Localized;
}

export interface Product {
  id: string;
  slug: string;
  status: Status;
  category: ProductCategory;
  translationKey: string;
  sku?: string;
  mpn?: string;
  brand: string;
  manufacturerLegalName: Localized;
  name: Localized;
  eyebrow: Localized;
  shortDescription: Localized;
  productForm: Localized;
  /** Verified only. Present when the pack/name states it (e.g. "58% dark"). */
  cocoaSolidsPercent?: number;
  fatSystem: Localized;
  flavorProfile?: Localized;
  applicationTags: ApplicationSlug[];
  recommendedApplications: Localized;
  /** Confirmed public technical attributes. Unknown fields are simply omitted. */
  attributes: Attribute[];
  packagingOptions: Localized[];
  minimumOrderQuantity?: Localized;
  sampleAvailable: boolean;
  leadTime?: Localized;
  shelfLife?: Localized;
  storageConditions?: Localized;
  certificationIds: string[];
  relatedArticleIds: string[];
  images: ProductImage[];
  evidenceIds: string[];
  tone: string;
  lastVerifiedAt?: string;
  verifiedBy?: string;
  publishedAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  slug: ApplicationSlug;
  status: Status;
  translationKey: string;
  title: Localized;
  eyebrow: Localized;
  summary: Localized;
  image: ProductImage;
  /** Finished-product types this application covers. */
  finishedProducts: LocalizedList;
  /** Typical process notes: temperature, moisture, equipment, shelf life, texture. */
  processNotes: LocalizedList;
  /** Common failure modes and likely causes. */
  commonIssues: LocalizedList;
  /** What the customer should provide for a useful trial. */
  trialInputs: LocalizedList;
  recommendedProductIds: string[];
  relatedArticleIds: string[];
  publishedAt: string;
  updatedAt: string;
}

export interface FaqItem {
  question: Localized;
  answer: Localized;
}

export interface EvidenceRef {
  id: string;
  label: Localized;
  detail: Localized;
  /** Optional public URL supporting the claim. */
  sourceUrl?: string;
}

export type ArticleBlock =
  | { type: "p"; text: Localized }
  | { type: "h2"; text: Localized }
  | { type: "list"; items: LocalizedList }
  | { type: "note"; text: Localized };

export interface Article {
  id: string;
  slug: string;
  category: KnowledgeCategory;
  translationKey: string;
  status: Status;
  title: Localized;
  summary: Localized;
  /** The buyer/search question this article answers. */
  buyerQuestion: Localized;
  author: Localized;
  technicalReviewer?: Localized;
  relatedProductIds: string[];
  relatedApplicationIds: ApplicationSlug[];
  evidence: EvidenceRef[];
  faq: FaqItem[];
  body: ArticleBlock[];
  heroImage?: ProductImage;
  publishedAt: string;
  updatedAt: string;
  lastReviewedAt?: string;
}

export interface Certification {
  id: string;
  status: Status;
  name: Localized;
  issuer: Localized;
  scope: Localized;
  /** TODO_COMPANY_VERIFY where empty: certificate number / validity. */
  certificateNumber?: string;
  validUntil?: string;
}

export interface CompanyData {
  legalName: Localized;
  brand: string;
  brandZh: string;
  foundingYear: string;
  tagline: Localized;
  description: Localized;
  phone: string;
  locations: {
    id: string;
    role: Localized;
    name: Localized;
    addressLocality: Localized;
    streetAddress: Localized;
    country: string;
  }[];
  timeline: { year: string; event: Localized }[];
  stats: { value: string; label: Localized; status: Status }[];
}
