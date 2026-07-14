/**
 * Global, non-secret site configuration. Single source of truth for the
 * canonical domain, brand strings and analytics/AI-crawler toggles.
 *
 * NOTE: no marketing claims live here. Verified company facts belong in
 * `data/company.json`; this file only holds infrastructure-level constants.
 */

export const SITE = {
  /** Final canonical origin. Keep the existing production domain to retain equity. */
  origin: "https://www.cocoa-linna.com",
  brand: "COCOA-LINNA",
  brandZh: "可可琳纳",
  /** Default locale is served at the root path (no /zh prefix) to keep URL equity. */
  defaultLocale: "zh" as const,
  locales: ["zh", "en"] as const,
  contactEmail: "info@cocoa-linna.com", // TODO_COMPANY_VERIFY: confirm public inbox
  phone: "+86-21-32521650",
  /**
   * AI training-crawler policy. The project goal is "public knowledge should be
   * discoverable", so training bots (GPTBot, ClaudeBot) are allowed by default.
   * Flip to false (and redeploy) to disallow them in robots.txt. See
   * docs/SEO-GEO-SPEC.md for the split between search and training crawlers.
   */
  allowAiTrainingBots: true,
} as const;

export type Locale = (typeof SITE.locales)[number];

/**
 * Absolute URL helper. All internal page paths use a trailing slash so that
 * canonical, hreflang, sitemap and JSON-LD URLs stay byte-for-byte consistent.
 */
export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  const lastSegment = path.split("/").pop() ?? "";
  const isFile = lastSegment.includes("."); // e.g. sitemap.xml, robots.txt
  if (path !== "/" && !path.endsWith("/") && !isFile) path = `${path}/`;
  return `${SITE.origin}${path}`;
}

export function isLocale(value: string): value is Locale {
  return (SITE.locales as readonly string[]).includes(value);
}
