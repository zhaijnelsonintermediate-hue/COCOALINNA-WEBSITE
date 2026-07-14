#!/usr/bin/env node
/**
 * Content validation — runs without a build. Enforces the content-model rules
 * from docs/CONTENT-MODEL.md so bad data cannot reach production:
 *  - unique ids and slugs (products, applications, articles)
 *  - required local(zh+en) fields present and non-empty
 *  - referential integrity (categories, related ids, certifications, evidence)
 *  - images carry alt text (both languages) and width/height
 *  - dates are valid ISO (YYYY-MM-DD)
 *  - flags unverified placeholders (TODO_COMPANY_VERIFY) as warnings
 *
 * Exit code 1 on any error; warnings do not fail the build.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const PENDING = "TODO_COMPANY_VERIFY";
const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const products = read("data/products.json");
const applications = read("data/applications.json");
const articles = read("data/articles.json");
const certifications = read("data/certifications.json");
const evidence = read("data/evidence.json");
const taxonomy = read("data/taxonomy.json");

const productCats = new Set(taxonomy.productCategories.map((c) => c.slug));
const knowledgeCats = new Set(taxonomy.knowledgeCategories.map((c) => c.slug));
const appSlugs = new Set(applications.map((a) => a.slug));
const certIds = new Set(certifications.map((c) => c.id));
const evidenceIds = new Set(evidence.map((e) => e.id));
const productIds = new Set(products.map((p) => p.id));
const articleIds = new Set(articles.map((a) => a.id));

function localized(obj, path) {
  if (!obj || typeof obj !== "object") {
    err(`${path}: missing localized value`);
    return;
  }
  for (const lang of ["zh", "en"]) {
    if (typeof obj[lang] !== "string" || obj[lang].trim() === "") {
      err(`${path}.${lang}: empty or missing`);
    } else if (obj[lang] === PENDING) {
      warn(`${path}.${lang}: unverified placeholder (${PENDING})`);
    }
  }
}

function unique(items, key, kind) {
  const seen = new Set();
  for (const it of items) {
    const v = it[key];
    if (seen.has(v)) err(`${kind}: duplicate ${key} "${v}"`);
    seen.add(v);
  }
}

function checkImage(img, path) {
  if (!img) return err(`${path}: missing image`);
  if (!img.src || !img.src.startsWith("/")) err(`${path}.src: invalid`);
  localized(img.alt, `${path}.alt`);
  if (!Number.isFinite(img.width) || !Number.isFinite(img.height)) err(`${path}: width/height required (CLS)`);
}

// ---- Products ----
unique(products, "id", "product");
unique(products, "slug", "product");
for (const p of products) {
  const at = `product[${p.id}]`;
  if (!slugRe.test(p.slug)) err(`${at}.slug: not a clean slug`);
  if (!productCats.has(p.category)) err(`${at}.category: unknown "${p.category}"`);
  localized(p.name, `${at}.name`);
  localized(p.shortDescription, `${at}.shortDescription`);
  localized(p.eyebrow, `${at}.eyebrow`);
  for (const d of ["publishedAt", "updatedAt"]) if (!isoDate.test(p[d] || "")) err(`${at}.${d}: bad date`);
  if (!Array.isArray(p.images) || p.images.length === 0) err(`${at}.images: required`);
  else p.images.forEach((img, i) => checkImage(img, `${at}.images[${i}]`));
  for (const tag of p.applicationTags || []) if (!appSlugs.has(tag)) err(`${at}.applicationTags: unknown "${tag}"`);
  for (const id of p.certificationIds || []) if (!certIds.has(id)) err(`${at}.certificationIds: unknown "${id}"`);
  for (const id of p.evidenceIds || []) if (!evidenceIds.has(id)) err(`${at}.evidenceIds: unknown "${id}"`);
  for (const id of p.relatedArticleIds || []) if (!articleIds.has(id)) err(`${at}.relatedArticleIds: unknown "${id}"`);
  if (typeof p.cocoaSolidsPercent === "number" && (p.cocoaSolidsPercent < 0 || p.cocoaSolidsPercent > 100))
    err(`${at}.cocoaSolidsPercent: out of range`);
}

// ---- Applications ----
unique(applications, "slug", "application");
for (const a of applications) {
  const at = `application[${a.slug}]`;
  if (!slugRe.test(a.slug)) err(`${at}.slug: not a clean slug`);
  localized(a.title, `${at}.title`);
  localized(a.summary, `${at}.summary`);
  checkImage(a.image, `${at}.image`);
  for (const k of ["finishedProducts", "processNotes", "commonIssues", "trialInputs"]) {
    const v = a[k];
    if (!v || !Array.isArray(v.zh) || !Array.isArray(v.en)) err(`${at}.${k}: needs zh[] and en[]`);
    else if (v.zh.length !== v.en.length) warn(`${at}.${k}: zh/en length mismatch`);
  }
  for (const id of a.recommendedProductIds || []) if (!productIds.has(id)) err(`${at}.recommendedProductIds: unknown "${id}"`);
  for (const id of a.relatedArticleIds || []) if (!articleIds.has(id)) err(`${at}.relatedArticleIds: unknown "${id}"`);
}

// ---- Articles ----
unique(articles, "id", "article");
unique(articles, "slug", "article");
for (const a of articles) {
  const at = `article[${a.id}]`;
  if (!slugRe.test(a.slug)) err(`${at}.slug: not a clean slug`);
  if (!knowledgeCats.has(a.category)) err(`${at}.category: unknown "${a.category}"`);
  localized(a.title, `${at}.title`);
  localized(a.summary, `${at}.summary`);
  localized(a.buyerQuestion, `${at}.buyerQuestion`);
  localized(a.author, `${at}.author`);
  for (const d of ["publishedAt", "updatedAt"]) if (!isoDate.test(a[d] || "")) err(`${at}.${d}: bad date`);
  if (!Array.isArray(a.body) || a.body.length === 0) err(`${at}.body: required`);
  for (const id of a.relatedProductIds || []) if (!productIds.has(id)) err(`${at}.relatedProductIds: unknown "${id}"`);
  for (const s of a.relatedApplicationIds || []) if (!appSlugs.has(s)) err(`${at}.relatedApplicationIds: unknown "${s}"`);
  (a.faq || []).forEach((f, i) => {
    localized(f.question, `${at}.faq[${i}].question`);
    localized(f.answer, `${at}.faq[${i}].answer`);
  });
  if (a.heroImage) checkImage(a.heroImage, `${at}.heroImage`);
}

// ---- Report ----
for (const w of warnings) console.warn("⚠︎ " + w);
if (errors.length) {
  for (const e of errors) console.error("✗ " + e);
  console.error(`\ncontent:validate FAILED — ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(1);
}
console.log(`✓ content:validate passed — ${products.length} products, ${applications.length} applications, ${articles.length} articles. ${warnings.length} warning(s).`);
