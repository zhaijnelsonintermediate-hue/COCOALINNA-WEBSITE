import type { ReactNode } from "react";
import type { Locale } from "@/lib/site";
import { t } from "@/lib/i18n";
import { pathFor, type RouteKey, type RouteParams } from "@/lib/routes";
import { otherLocale } from "@/lib/i18n";
import {
  breadcrumbSchema,
  graph,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  key: RouteKey;
  params?: RouteParams;
}

/**
 * Shared page frame: skip link, header (with a real language-switch link to the
 * equivalent page), visible breadcrumbs, main landmark, footer, and the
 * Organization + WebSite + BreadcrumbList JSON-LD. Page-specific schema is
 * passed via `schema`.
 */
export function PageShell({
  locale,
  routeKey,
  params = {},
  breadcrumbs = [],
  schema = [],
  children,
}: {
  locale: Locale;
  routeKey: RouteKey;
  params?: RouteParams;
  breadcrumbs?: Crumb[];
  schema?: object[];
  children: ReactNode;
}) {
  const ui = t(locale);
  const altPath = pathFor(otherLocale[locale], routeKey, params);
  const nodes: object[] = [organizationSchema(locale), websiteSchema(locale)];
  if (breadcrumbs.length > 0) {
    nodes.push(
      breadcrumbSchema(locale, [
        { name: ui.breadcrumbHome, key: "home" },
        ...breadcrumbs,
      ]),
    );
  }
  nodes.push(...schema);

  return (
    <>
      <JsonLd data={graph(...nodes)} />
      <a className="skip-link" href="#main">
        {ui.skipToContent}
      </a>
      <div className="site-shell">
        <Header locale={locale} altPath={altPath} />
        <main id="main">
          {breadcrumbs.length > 0 && (
            <nav className="breadcrumbs" aria-label={locale === "zh" ? "面包屑" : "Breadcrumb"}>
              <ol>
                <li>
                  <a href={pathFor(locale, "home")}>{ui.breadcrumbHome}</a>
                </li>
                {breadcrumbs.map((c, i) => {
                  const isLast = i === breadcrumbs.length - 1;
                  return (
                    <li key={`${c.key}-${i}`}>
                      {isLast ? (
                        <span aria-current="page">{c.name}</span>
                      ) : (
                        <a href={pathFor(locale, c.key, c.params)}>{c.name}</a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}
          {children}
        </main>
        <Footer locale={locale} />
      </div>
    </>
  );
}
