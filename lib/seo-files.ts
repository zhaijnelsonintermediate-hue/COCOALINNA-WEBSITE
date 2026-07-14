/**
 * Generators for the file-style SEO endpoints (/robots.txt, /sitemap.xml,
 * /feed.xml, /llms.txt). They are served directly from the Cloudflare Worker
 * so that `trailingSlash: true` (which the HTML pages rely on) does not
 * 308-redirect these dotted paths. All output derives from the content layer.
 */
import { SITE, absoluteUrl } from "./site";
import { pathFor } from "./routes";
import {
  loc,
  productCategories,
  publicApplications,
  publicArticles,
  publicProducts,
} from "./content";
import { feedItems, sitemapEntries } from "./sitemap";

export interface SeoFile {
  body: string;
  contentType: string;
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function robotsTxt(): SeoFile {
  const disallowInternal = ["/admin/", "/api/private/", "/draft/", "/preview/", "/_test/"];
  const searchBots = ["Googlebot", "Bingbot", "Baiduspider", "OAI-SearchBot", "ChatGPT-User", "Claude-SearchBot", "Claude-User"];
  const trainingBots = ["GPTBot", "ClaudeBot"];
  const lines: string[] = ["# Cocoa-Linna robots.txt", ""];

  for (const bot of searchBots) {
    lines.push(`User-agent: ${bot}`, "Allow: /");
    for (const p of disallowInternal) lines.push(`Disallow: ${p}`);
    lines.push("");
  }
  for (const bot of trainingBots) {
    lines.push(`User-agent: ${bot}`);
    if (SITE.allowAiTrainingBots) {
      lines.push("Allow: /");
      for (const p of disallowInternal) lines.push(`Disallow: ${p}`);
    } else {
      lines.push("Disallow: /");
    }
    lines.push("");
  }
  lines.push("User-agent: *", "Allow: /");
  for (const p of disallowInternal) lines.push(`Disallow: ${p}`);
  lines.push("", `Sitemap: ${absoluteUrl("/sitemap.xml")}`, "");

  return { body: lines.join("\n"), contentType: "text/plain; charset=utf-8" };
}

export function sitemapXml(): SeoFile {
  const urls = sitemapEntries()
    .map((e) => {
      const links = Object.entries(e.alternates)
        .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${xmlEscape(href)}" />`)
        .join("\n");
      return `  <url>\n    <loc>${xmlEscape(e.loc)}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n${links}\n  </url>`;
    })
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return { body, contentType: "application/xml; charset=utf-8" };
}

export function feedXml(): SeoFile {
  const items = feedItems();
  const updated = items.reduce((max, i) => (i.article.updatedAt > max ? i.article.updatedAt : max), "1970-01-01");
  const entries = items
    .map((i) => {
      const title = loc(i.article.title, i.locale);
      const summary = loc(i.article.summary, i.locale);
      return `  <entry>\n    <title>${xmlEscape(title)}</title>\n    <link href="${i.url}" />\n    <id>${i.url}</id>\n    <updated>${new Date(i.article.updatedAt).toISOString()}</updated>\n    <summary>${xmlEscape(summary)}</summary>\n    <content type="text">${xmlEscape(summary)}</content>\n  </entry>`;
    })
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<feed xmlns="http://www.w3.org/2005/Atom">\n  <title>Cocoa-Linna · Knowledge</title>\n  <link href="${absoluteUrl("/feed.xml")}" rel="self" />\n  <link href="${SITE.origin}/" />\n  <id>${SITE.origin}/</id>\n  <updated>${new Date(updated).toISOString()}</updated>\n${entries}\n</feed>\n`;
  return { body, contentType: "application/atom+xml; charset=utf-8" };
}

export function llmsTxt(): SeoFile {
  const lines: string[] = ["# Cocoa-Linna (可可琳纳)", ""];
  lines.push("> B2B chocolate & chocolate-application solutions: couverture, compound chocolate, chocolate sauces, bake-stable and decoration chocolate for bakery, ice cream, beverage and food manufacturing. Chinese at the root, English under /en/.", "");
  lines.push("## Products");
  for (const c of productCategories) lines.push(`- [${loc(c.title, "en")}](${absoluteUrl(pathFor("en", "productCategory", { category: c.slug }))})`);
  for (const p of publicProducts) lines.push(`- [${loc(p.name, "en")}](${absoluteUrl(pathFor("en", "productDetail", { category: p.category, slug: p.slug }))})`);
  lines.push("", "## Solutions");
  for (const a of publicApplications) lines.push(`- [${loc(a.title, "en")}](${absoluteUrl(pathFor("en", "solutionDetail", { slug: a.slug }))})`);
  lines.push("", "## Knowledge");
  for (const a of publicArticles) lines.push(`- [${loc(a.title, "en")}](${absoluteUrl(pathFor("en", "article", { category: a.category, slug: a.slug }))})`);
  lines.push("", "## Company");
  lines.push(`- [About](${absoluteUrl(pathFor("en", "about"))})`);
  lines.push(`- [R&D & manufacturing](${absoluteUrl(pathFor("en", "rd-manufacturing"))})`);
  lines.push(`- [Quality & certifications](${absoluteUrl(pathFor("en", "quality-certifications"))})`);
  lines.push(`- [Contact / RFQ](${absoluteUrl(pathFor("en", "contact"))})`, "");
  return { body: lines.join("\n"), contentType: "text/plain; charset=utf-8" };
}

export const SEO_FILES: Record<string, () => SeoFile> = {
  "/robots.txt": robotsTxt,
  "/sitemap.xml": sitemapXml,
  "/feed.xml": feedXml,
  "/llms.txt": llmsTxt,
};
