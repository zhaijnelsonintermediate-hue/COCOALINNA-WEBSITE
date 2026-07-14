import { notFound } from "next/navigation";
import type { Locale } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { pathFor } from "@/lib/routes";
import { articlesByCategory, getKnowledgeCategory, knowledgeCategories, loc } from "@/lib/content";
import { PageShell } from "@/components/PageShell";

export function knowledgeCategoryParams() {
  return knowledgeCategories.map((c) => ({ category: c.slug }));
}

export function knowledgeCategoryMeta(locale: Locale, category: string) {
  const c = getKnowledgeCategory(category);
  if (!c) return buildMetadata({ locale, key: "knowledgeCategory", params: { category }, title: "Knowledge", description: "" });
  return buildMetadata({
    locale,
    key: "knowledgeCategory",
    params: { category },
    title: loc(c.title, locale),
    description: loc(c.definition, locale),
  });
}

export function KnowledgeCategoryPage({ locale, category }: { locale: Locale; category: string }) {
  const c = getKnowledgeCategory(category);
  if (!c) notFound();
  const articles = articlesByCategory(category);

  return (
    <PageShell
      locale={locale}
      routeKey="knowledgeCategory"
      params={{ category }}
      breadcrumbs={[
        { name: locale === "zh" ? "知识中心" : "Knowledge", key: "knowledge" },
        { name: loc(c.title, locale), key: "knowledgeCategory", params: { category } },
      ]}
    >
      <section className="page-hero">
        <p className="eyebrow">KNOWLEDGE</p>
        <h1>{loc(c.title, locale)}</h1>
        <p className="page-lead">{loc(c.definition, locale)}</p>
      </section>
      <section className="section">
        <ul className="article-list">
          {articles.map((a) => (
            <li key={a.id}>
              <a href={pathFor(locale, "article", { category: a.category, slug: a.slug })}>
                <h2>{loc(a.title, locale)}</h2>
                <p>{loc(a.summary, locale)}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
