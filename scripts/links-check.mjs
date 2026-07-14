#!/usr/bin/env node
/**
 * Internal link checker against the built worker. Crawls every sitemap page,
 * collects internal <a href> targets, and asserts each resolves to HTTP 200
 * (tel:, mailto:, external and pure #anchors are skipped). Also reports pages
 * that are not reachable from any other page (orphans) among sitemap URLs.
 */
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distWorker = join(root, "dist/server/index.js");
if (!existsSync(distWorker)) {
  console.error("dist/server/index.js not found. Run `npm run build` first.");
  process.exit(1);
}
const { default: worker } = await import(distWorker);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

async function fetchPath(path) {
  const res = await worker.fetch(new Request("http://localhost" + path, { headers: { accept: "text/html" } }), env, ctx);
  return { status: res.status, body: res.status === 200 ? await res.text() : "" };
}

const sm = await fetchPath("/sitemap.xml");
const pages = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, "") || "/");

const errors = [];
const statusCache = new Map();
const inbound = new Map(pages.map((p) => [p, 0]));

async function statusOf(path) {
  if (statusCache.has(path)) return statusCache.get(path);
  const { status } = await fetchPath(path);
  statusCache.set(path, status);
  return status;
}

for (const page of pages) {
  const { body } = await fetchPath(page);
  const hrefs = [...body.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map((m) => m[1]);
  for (const href of hrefs) {
    if (/^(tel:|mailto:|https?:\/\/|#)/i.test(href)) continue;
    const clean = href.split("#")[0].split("?")[0];
    if (!clean.startsWith("/")) continue;
    if (inbound.has(clean) && clean !== page) inbound.set(clean, inbound.get(clean) + 1);
    const status = await statusOf(clean);
    if (status !== 200) errors.push(`${page} -> ${clean} (status ${status})`);
  }
}

const orphans = [...inbound.entries()].filter(([p, n]) => n === 0 && p !== "/" && p !== "/en/").map(([p]) => p);

for (const e of errors) console.error("✗ broken link: " + e);
for (const o of orphans) console.warn("⚠︎ orphan (no inbound internal link): " + o);

if (errors.length) {
  console.error(`\nlinks:check FAILED — ${errors.length} broken internal link(s).`);
  process.exit(1);
}
console.log(`✓ links:check passed — crawled ${pages.length} pages, ${statusCache.size} unique targets, ${orphans.length} orphan warning(s).`);
