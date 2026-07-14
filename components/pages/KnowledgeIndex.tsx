import type { Locale } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { pathFor } from "@/lib/routes";
import { articlesByCategory, knowledgeCategories, loc } from "@/lib/content";
import { PageShell } from "@/components/PageShell";

export function knowledgeMeta(locale: Locale) {
  return buildMetadata({
    locale,
    key: "knowledge",
    title: locale === "zh" ? "知识中心｜巧克力选型与应用" : "Knowledge｜Chocolate selection & application",
    description:
      locale === "zh"
        ? "可可琳纳知识中心：选型基础、应用指南、标准与质量、研发洞察，回答采购与研发在真实项目中的问题。"
        : "Cocoa-Linna knowledge hub: selection guides, application guides, standards & quality, and R&D insights for real procurement and R&D questions.",
  });
}

export function KnowledgeIndex({ locale }: { locale: Locale }) {
  return (
    <PageShell
      locale={locale}
      routeKey="knowledge"
      breadcrumbs={[{ name: locale === "zh" ? "知识中心" : "Knowledge", key: "knowledge" }]}
    >
      <section className="page-hero">
        <p className="eyebrow">KNOWLEDGE HUB</p>
        <h1>{locale === "zh" ? "知识中心" : "Knowledge hub"}</h1>
        <p className="page-lead">
          {locale === "zh"
            ? "把选型经验写成可以被找到的知识。文章回答采购、研发与主理人在真实项目中会问的问题。"
            : "Turn selection experience into findable knowledge. Articles answer real procurement and R&D questions."}
        </p>
      </section>

      {knowledgeCategories.map((c) => {
        const articles = articlesByCategory(c.slug);
        if (articles.length === 0) return null;
        return (
          <section className="section knowledge-cat-block" key={c.slug}>
            <div className="section-heading split-heading">
              <div>
                <h2>
                  <a href={pathFor(locale, "knowledgeCategory", { category: c.slug })}>{loc(c.title, locale)}</a>
                </h2>
              </div>
              <p>{loc(c.definition, locale)}</p>
            </div>
            <ul className="article-list">
              {articles.map((a) => (
                <li key={a.id}>
                  <a href={pathFor(locale, "article", { category: a.category, slug: a.slug })}>
                    <h3>{loc(a.title, locale)}</h3>
                    <p>{loc(a.summary, locale)}</p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </PageShell>
  );
}
