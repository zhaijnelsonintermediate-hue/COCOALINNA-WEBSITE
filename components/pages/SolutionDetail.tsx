import { notFound } from "next/navigation";
import type { Locale } from "@/lib/site";
import type { LocalizedList } from "@/lib/types";
import { buildMetadata } from "@/lib/metadata";
import { getApplication, loc, publicApplications } from "@/lib/content";
import { t } from "@/lib/i18n";
import { PageShell } from "@/components/PageShell";
import { CtaBanner, RelatedArticles, RelatedProducts } from "@/components/blocks";

export function solutionParams() {
  return publicApplications.map((a) => ({ slug: a.slug }));
}

export function solutionMeta(locale: Locale, slug: string) {
  const a = getApplication(slug);
  if (!a) return buildMetadata({ locale, key: "solutionDetail", params: { slug }, title: "Solution", description: "" });
  return buildMetadata({
    locale,
    key: "solutionDetail",
    params: { slug },
    title: loc(a.title, locale),
    description: loc(a.summary, locale),
    image: a.image.src,
  });
}

function ListSection({ title, list, locale }: { title: string; list: LocalizedList; locale: Locale }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <ul className="check-list">
        {list[locale].map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function SolutionDetail({ locale, slug }: { locale: Locale; slug: string }) {
  const a = getApplication(slug);
  if (!a) notFound();
  const ui = t(locale);
  const L = {
    finished: locale === "zh" ? "覆盖的最终产品" : "Finished products covered",
    process: locale === "zh" ? "典型工艺要点" : "Typical process notes",
    issues: locale === "zh" ? "常见问题与可能原因" : "Common issues and likely causes",
    trial: locale === "zh" ? "试样时请提供" : "For a trial, please provide",
  };

  return (
    <PageShell
      locale={locale}
      routeKey="solutionDetail"
      params={{ slug }}
      breadcrumbs={[
        { name: locale === "zh" ? "应用方案" : "Solutions", key: "solutions" },
        { name: loc(a.title, locale), key: "solutionDetail", params: { slug } },
      ]}
    >
      <article className="detail">
        <div className="detail-hero">
          <div className="detail-image">
            <img src={a.image.src} alt={loc(a.image.alt, locale)} width={a.image.width} height={a.image.height} fetchPriority="high" decoding="async" />
          </div>
          <div className="detail-intro">
            <p className="eyebrow">{loc(a.eyebrow, locale)}</p>
            <h1>{loc(a.title, locale)}</h1>
            <p className="detail-def">{loc(a.summary, locale)}</p>
          </div>
        </div>

        <ListSection title={L.finished} list={a.finishedProducts} locale={locale} />
        <ListSection title={L.process} list={a.processNotes} locale={locale} />
        <ListSection title={L.issues} list={a.commonIssues} locale={locale} />
        <ListSection title={L.trial} list={a.trialInputs} locale={locale} />

        <RelatedProducts locale={locale} ids={a.recommendedProductIds} title={ui.recommendedProducts} />
        <RelatedArticles locale={locale} ids={a.relatedArticleIds} title={ui.relatedArticles} />

        <p className="data-note">{ui.dataNote}</p>
        <CtaBanner locale={locale} />
      </article>
    </PageShell>
  );
}
