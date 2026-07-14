#!/usr/bin/env node
/**
 * Scaffold a new product record in data/products.json with status "pending"
 * (so it is NOT rendered publicly until reviewed and set to "verified").
 * Usage: npm run new:product -- <category> <slug> "<中文名>" "<English name>"
 *   category ∈ couverture | compound-chocolate | chocolate-sauce | functional-decoration
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [category, slug, nameZh, nameEn] = process.argv.slice(2);
if (!category || !slug || !nameZh || !nameEn) {
  console.error('Usage: npm run new:product -- <category> <slug> "<中文名>" "<English name>"');
  process.exit(1);
}
const file = join(root, "data/products.json");
const products = JSON.parse(readFileSync(file, "utf8"));
if (products.some((p) => p.slug === slug)) {
  console.error(`Slug "${slug}" already exists.`);
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
const L = (zh, en) => ({ zh, en });
const TODO = L("TODO_COMPANY_VERIFY", "TODO_COMPANY_VERIFY");

products.push({
  id: slug,
  slug,
  status: "pending",
  category,
  translationKey: `product-${slug}`,
  brand: "COCOA-LINNA",
  manufacturerLegalName: L("可可琳纳食品海门有限公司", "Cocoa-Linna Food Haimen Co., Ltd."),
  name: L(nameZh, nameEn),
  eyebrow: TODO,
  shortDescription: TODO,
  productForm: TODO,
  fatSystem: TODO,
  applicationTags: [],
  recommendedApplications: TODO,
  attributes: [],
  packagingOptions: [],
  sampleAvailable: true,
  certificationIds: ["iso9001", "iso22000", "fssc22000"],
  relatedArticleIds: [],
  images: [{ src: "/company/REPLACE.jpg", alt: L(`${nameZh}包装`, `${nameEn} pack`), width: 400, height: 230 }],
  evidenceIds: [],
  tone: "cocoa",
  publishedAt: today,
  updatedAt: today,
});

writeFileSync(file, JSON.stringify(products, null, 2) + "\n");
console.log(`✓ Added draft product "${slug}" (status: pending). Fill fields, set status to "verified", then run npm run content:validate.`);
