#!/usr/bin/env node
/**
 * Scaffold a new knowledge article in data/articles.json with status "pending"
 * (draft → review → published). Not rendered until set to "verified".
 * Usage: npm run new:article -- <category> <slug> "<中文标题>" "<English title>"
 *   category ∈ selection-guides | application-guides | standards-quality | rd-insights
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [category, slug, titleZh, titleEn] = process.argv.slice(2);
if (!category || !slug || !titleZh || !titleEn) {
  console.error('Usage: npm run new:article -- <category> <slug> "<中文标题>" "<English title>"');
  process.exit(1);
}
const file = join(root, "data/articles.json");
const articles = JSON.parse(readFileSync(file, "utf8"));
if (articles.some((a) => a.slug === slug)) {
  console.error(`Slug "${slug}" already exists.`);
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
const L = (zh, en) => ({ zh, en });

articles.push({
  id: slug,
  slug,
  category,
  translationKey: `art-${slug}`,
  status: "pending",
  title: L(titleZh, titleEn),
  summary: L("TODO 摘要", "TODO summary"),
  buyerQuestion: L("TODO 采购问题", "TODO buyer question"),
  author: L("可可琳纳应用团队", "Cocoa-Linna Applications Team"),
  technicalReviewer: L("TODO_COMPANY_VERIFY", "TODO_COMPANY_VERIFY"),
  relatedProductIds: [],
  relatedApplicationIds: [],
  evidence: [],
  faq: [],
  body: [{ type: "p", text: L("TODO 正文", "TODO body") }],
  publishedAt: today,
  updatedAt: today,
  lastReviewedAt: today,
});

writeFileSync(file, JSON.stringify(articles, null, 2) + "\n");
console.log(`✓ Added draft article "${slug}" (status: pending). Draft → review → set status "verified", then npm run content:validate.`);
