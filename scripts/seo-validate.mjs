#!/usr/bin/env node
/**
 * SEO/GEO validation against the BUILT worker (dist/server/index.js). Run after
 * `npm run build`. Checks, for every sitemap URL:
 *  - HTTP 200 (no redirect / 404 in the sitemap)
 *  - exactly one <h1>
 *  - <html lang> matches the URL's language
 *  - self-referential canonical equals the sitemap loc
 *  - bidirectional hreflang (zh-CN, en, x-default) present
 *  - all JSON-LD blocks are valid JSON
 * Also validates robots.txt (has Sitemap + AI bots) and that sitemap/feed parse.
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
const ORIGIN = "https://www.cocoa-linna.com";
const { default: worker } = await import(distWorker);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

async function fetchPath(path) {
  const res = await worker.fetch(new Request("http://localhost" + path, { headers: { accept: "text/html" } }), env, ctx);
  return { status: res.status, ct: res.headers.get("content-type") || "", body: await res.text(), location: res.headers.get("location") };
}

const errors = [];
const err = (m) => errors.push(m);

// 1. Pull sitemap
const sm = await fetchPath("/sitemap.xml");
if (sm.status !== 200) err(`sitemap.xml returned ${sm.status}`);
const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (locs.length === 0) err("sitemap has no <loc> entries");

// 2. Validate each page
for (const loc of locs) {
  const path = loc.replace(ORIGIN, "") || "/";
  const { status, body } = await fetchPath(path);
  if (status !== 200) {
    err(`${path}: expected 200, got ${status}`);
    continue;
  }
  const h1s = body.match(/<h1[\b >]/gi) || [];
  if (h1s.length !== 1) err(`${path}: expected exactly one <h1>, found ${h1s.length}`);

  const lang = (body.match(/<html[^>]*lang="([^"]+)"/i) || [])[1];
  const expectLang = path.startsWith("/en") ? "en" : "zh-CN";
  if (lang !== expectLang) err(`${path}: <html lang> is "${lang}", expected "${expectLang}"`);

  const canonical = (body.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i) || [])[1];
  if (canonical !== loc) err(`${path}: canonical "${canonical}" != sitemap loc "${loc}"`);

  const hreflangs = [...body.matchAll(/hreflang="([^"]+)"/gi)].map((m) => m[1]);
  for (const need of ["zh-CN", "en", "x-default"]) {
    if (!hreflangs.includes(need)) err(`${path}: missing hreflang "${need}"`);
  }

  for (const m of body.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(m[1]);
    } catch {
      err(`${path}: invalid JSON-LD`);
    }
  }
}

// 3. robots.txt
const robots = await fetchPath("/robots.txt");
if (robots.status !== 200) err(`robots.txt returned ${robots.status}`);
if (!/Sitemap:\s*https?:\/\//.test(robots.body)) err("robots.txt missing Sitemap URL");
for (const bot of ["OAI-SearchBot", "Claude-SearchBot", "Baiduspider"]) {
  if (!robots.body.includes(bot)) err(`robots.txt missing ${bot}`);
}

// 4. feed
const feed = await fetchPath("/feed.xml");
if (feed.status !== 200 || !feed.body.includes("<feed")) err("feed.xml not a valid Atom feed");

if (errors.length) {
  for (const e of errors) console.error("✗ " + e);
  console.error(`\nseo:validate FAILED — ${errors.length} error(s) across ${locs.length} URLs.`);
  process.exit(1);
}
console.log(`✓ seo:validate passed — ${locs.length} URLs, canonical + hreflang + JSON-LD + robots + feed OK.`);
