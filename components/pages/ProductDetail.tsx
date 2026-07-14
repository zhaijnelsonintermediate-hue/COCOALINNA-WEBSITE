import { notFound } from "next/navigation";
import type { Locale } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { t } from "@/lib/i18n";
import {
  getCategory,
  getCertification,
  getEvidence,
  getProduct,
  loc,
  publicProducts,
} from "@/lib/content";
import { productSchema } from "@/lib/schema";
import { PageShell } from "@/components/PageShell";
import { CtaBanner, RelatedApplications, RelatedArticles } from "@/components/blocks";
import { pathFor } from "@/lib/routes";

const PENDING = "TODO_COMPANY_VERIFY";

export function productParams() {
  return publicProducts.map((p) => ({ category: p.category, slug: p.slug }));
}

export function productMeta(locale: Locale, category: string, slug: string) {
  const p = getProduct(slug);
  if (!p) return buildMetadata({ locale, key: "productDetail", params: { category, slug }, title: "Product", description: "" });
  return buildMetadata({
    locale,
    key: "productDetail",
    params: { category: p.category, slug: p.slug },
    title: loc(p.name, locale),
    description: loc(p.shortDescription, locale),
    image: p.images[0]?.src,
  });
}

export function ProductDetail({ locale, category, slug }: { locale: Locale; category: string; slug: string }) {
  const p = getProduct(slug);
  if (!p || p.category !== category) notFound();
  const ui = t(locale);
  const c = getCategory(p.category);
  const img = p.images[0];
  const certs = p.certificationIds.map(getCertification).filter(Boolean);
  const evidence = p.evidenceIds.map(getEvidence).filter(Boolean);
  const visibleAttrs = p.attributes.filter((a) => a.value[locale] !== PENDING);

  return (
    <PageShell
      locale={locale}
      routeKey="productDetail"
      params={{ category, slug }}
      breadcrumbs={[
        { name: locale === "zh" ? "产品中心" : "Products", key: "products" },
        { name: c ? loc(c.title, locale) : category, key: "productCategory", params: { category } },
        { name: loc(p.name, locale), key: "productDetail", params: { category, slug } },
      ]}
      schema={[productSchema(locale, p)]}
    >
      <article className="detail">
        <div className="detail-hero">
          <div className={`detail-image tone-${p.tone}`}>
            {img && <img src={img.src} alt={loc(img.alt, locale)} width={img.width} height={img.height} fetchPriority="high" decoding="async" />}
          </div>
          <div className="detail-intro">
            <p className="eyebrow">{loc(p.eyebrow, locale)}</p>
            <h1>{loc(p.name, locale)}</h1>
            <p className="detail-def">{loc(p.shortDescription, locale)}</p>
            <div className="detail-actions">
              <a className="button button-dark" href={pathFor(locale, "contact") + `?product=${p.id}`}>
                {ui.sampleCta}<span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>

        {visibleAttrs.length > 0 && (
          <section className="detail-section">
            <h2>{ui.specifications}</h2>
            <table className="spec-table">
              <tbody>
                {visibleAttrs.map((a) => (
                  <tr key={a.key}>
                    <th scope="row">{loc(a.label, locale)}</th>
                    <td>{loc(a.value, locale)}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">{locale === "zh" ? "脂肪体系" : "Fat system"}</th>
                  <td>{loc(p.fatSystem, locale) === PENDING ? <em className="pending">{ui.pendingNote}</em> : loc(p.fatSystem, locale)}</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        <section className="detail-section">
          <h2>{ui.applications}</h2>
          <p>{loc(p.recommendedApplications, locale)}</p>
        </section>

        {p.packagingOptions.length > 0 && (
          <section className="detail-section">
            <h2>{ui.packaging}</h2>
            <ul className="pill-list">
              {p.packagingOptions.map((pkg, i) => (
                <li key={i}>{loc(pkg, locale)}</li>
              ))}
            </ul>
          </section>
        )}

        {certs.length > 0 && (
          <section className="detail-section">
            <h2>{locale === "zh" ? "适用体系认证" : "Applicable certifications"}</h2>
            <ul className="pill-list">
              {certs.map((cert) => (
                <li key={cert!.id}>{loc(cert!.name, locale)}</li>
              ))}
            </ul>
          </section>
        )}

        {evidence.length > 0 && (
          <section className="detail-section">
            <h2>{ui.evidence}</h2>
            <ul className="evidence-mini">
              {evidence.map((e) => (
                <li key={e!.id}>
                  <strong>{loc(e!.label, locale)}</strong> {loc(e!.detail, locale)}
                </li>
              ))}
            </ul>
          </section>
        )}

        <RelatedApplications locale={locale} slugs={p.applicationTags} title={ui.relatedApplications} />
        <RelatedArticles locale={locale} ids={p.relatedArticleIds} title={ui.relatedArticles} />

        <p className="data-note">
          {p.lastVerifiedAt && p.verifiedBy !== PENDING && (
            <span>{ui.lastVerified}: {p.lastVerifiedAt} · </span>
          )}
          {ui.dataNote}
        </p>

        <CtaBanner locale={locale} defaultProduct={p.id} />
      </article>
    </PageShell>
  );
}
