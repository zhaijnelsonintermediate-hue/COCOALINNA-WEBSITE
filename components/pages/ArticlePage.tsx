import { notFound } from "next/navigation";
import type { Locale } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { t } from "@/lib/i18n";
import { getArticle, getKnowledgeCategory, loc, publicArticles } from "@/lib/content";
import { articleSchema, faqSchema } from "@/lib/schema";
import { PageShell } from "@/components/PageShell";
import { Prose } from "@/components/Prose";
import { CtaBanner, RelatedApplications, RelatedProducts } from "@/components/blocks";

const PENDING = "TODO_COMPANY_VERIFY";

export function articleParams() {
  return publicArticles.map((a) => ({ category: a.category, slug: a.slug }));
}

export function articleMeta(locale: Locale, category: string, slug: string) {
  const a = getArticle(category, slug);
  if (!a) return buildMetadata({ locale, key: "article", params: { category, slug }, title: "Article", description: "" });
  return buildMetadata({
    locale,
    key: "article",
    params: { category, slug },
    title: loc(a.title, locale),
    description: loc(a.summary, locale),
    image: a.heroImage?.src,
  });
}

export function ArticlePage({ locale, category, slug }: { locale: Locale; category: string; slug: string }) {
  const a = getArticle(category, slug);
  if (!a) notFound();
  const ui = t(locale);
  const c = getKnowledgeCategory(a.category);
  const schema: object[] = [articleSchema(locale, a)];
  if (a.faq.length > 0) schema.push(faqSchema(locale, a.faq));

  return (
    <PageShell
      locale={locale}
      routeKey="article"
      params={{ category, slug }}
      breadcrumbs={[
        { name: locale === "zh" ? "知识中心" : "Knowledge", key: "knowledge" },
        { name: c ? loc(c.title, locale) : category, key: "knowledgeCategory", params: { category } },
        { name: loc(a.title, locale), key: "article", params: { category, slug } },
      ]}
      schema={schema}
    >
      <article className="article">
        <header className="article-head">
          <p className="eyebrow">{c ? loc(c.title, locale) : ""}</p>
          <h1>{loc(a.title, locale)}</h1>
          <p className="article-summary">{loc(a.summary, locale)}</p>
          <dl className="article-meta">
            <div>
              <dt>{ui.author}</dt>
              <dd>{loc(a.author, locale)}</dd>
            </div>
            {a.technicalReviewer && a.technicalReviewer[locale] !== PENDING && (
              <div>
                <dt>{ui.reviewer}</dt>
                <dd>{loc(a.technicalReviewer, locale)}</dd>
              </div>
            )}
            <div>
              <dt>{ui.published}</dt>
              <dd>
                <time dateTime={a.publishedAt}>{a.publishedAt}</time>
              </dd>
            </div>
            <div>
              <dt>{ui.updated}</dt>
              <dd>
                <time dateTime={a.updatedAt}>{a.updatedAt}</time>
              </dd>
            </div>
          </dl>
        </header>

        {a.heroImage && (
          <figure className="article-hero">
            <img src={a.heroImage.src} alt={loc(a.heroImage.alt, locale)} width={a.heroImage.width} height={a.heroImage.height} decoding="async" />
          </figure>
        )}

        <Prose blocks={a.body} locale={locale} />

        {a.evidence.length > 0 && (
          <section className="detail-section">
            <h2>{ui.evidence}</h2>
            <ul className="evidence-mini">
              {a.evidence.map((e) => (
                <li key={e.id}>
                  <strong>{loc(e.label, locale)}</strong> {loc(e.detail, locale)}
                  {e.sourceUrl && (
                    <>
                      {" "}
                      <a href={e.sourceUrl} rel="nofollow noopener" target="_blank">
                        ↗
                      </a>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {a.faq.length > 0 && (
          <section className="detail-section faq">
            <h2>{ui.faqTitle}</h2>
            <dl className="faq-list">
              {a.faq.map((f, i) => (
                <div key={i}>
                  <dt>{loc(f.question, locale)}</dt>
                  <dd>{loc(f.answer, locale)}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <RelatedProducts locale={locale} ids={a.relatedProductIds} title={ui.relatedProducts} />
        <RelatedApplications locale={locale} slugs={a.relatedApplicationIds} title={ui.relatedApplications} />

        <CtaBanner locale={locale} />
      </article>
    </PageShell>
  );
}
