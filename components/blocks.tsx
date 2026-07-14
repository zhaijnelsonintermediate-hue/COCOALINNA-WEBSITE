import type { Locale } from "@/lib/site";
import type { Product } from "@/lib/types";
import { t } from "@/lib/i18n";
import { pathFor } from "@/lib/routes";
import { getApplication, getArticleById, getProductById, loc } from "@/lib/content";

/** Product card — a real link to the product detail page (crawlable). */
export function ProductCard({ locale, product }: { locale: Locale; product: Product }) {
  const href = pathFor(locale, "productDetail", { category: product.category, slug: product.slug });
  const img = product.images[0];
  return (
    <article className={`product-card tone-${product.tone}`}>
      <a className="product-card-link" href={href}>
        <div className="product-image">
          {img && <img src={img.src} alt={loc(img.alt, locale)} width={img.width} height={img.height} loading="lazy" decoding="async" />}
        </div>
        <div className="product-copy">
          <p>{loc(product.eyebrow, locale)}</p>
          <h3>{loc(product.name, locale)}</h3>
          <span>{loc(product.shortDescription, locale)}</span>
          <em>
            {t(locale).viewProduct} <b aria-hidden>↗</b>
          </em>
        </div>
      </a>
    </article>
  );
}

export function ProductGrid({ locale, products }: { locale: Locale; products: Product[] }) {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} locale={locale} product={p} />
      ))}
    </div>
  );
}

/** A titled list of internal links to related products. */
export function RelatedProducts({ locale, ids, title }: { locale: Locale; ids: string[]; title: string }) {
  const items = ids.map(getProductById).filter((p): p is Product => Boolean(p));
  if (items.length === 0) return null;
  return (
    <section className="related-block" aria-label={title}>
      <h2>{title}</h2>
      <ProductGrid locale={locale} products={items} />
    </section>
  );
}

/** Links to related applications. */
export function RelatedApplications({ locale, slugs, title }: { locale: Locale; slugs: string[]; title: string }) {
  const items = slugs.map((s) => getApplication(s)).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <section className="related-block" aria-label={title}>
      <h2>{title}</h2>
      <ul className="link-list">
        {items.map((a) => (
          <li key={a!.slug}>
            <a href={pathFor(locale, "solutionDetail", { slug: a!.slug })}>{loc(a!.title, locale)}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Links to related knowledge articles. */
export function RelatedArticles({ locale, ids, title }: { locale: Locale; ids: string[]; title: string }) {
  const items = ids.map(getArticleById).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <section className="related-block" aria-label={title}>
      <h2>{title}</h2>
      <ul className="link-list">
        {items.map((a) => (
          <li key={a!.id}>
            <a href={pathFor(locale, "article", { category: a!.category, slug: a!.slug })}>{loc(a!.title, locale)}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Sample / RFQ call to action linking to the contact page. */
export function CtaBanner({ locale, defaultProduct }: { locale: Locale; defaultProduct?: string }) {
  const ui = t(locale);
  const href = pathFor(locale, "contact") + (defaultProduct ? `?product=${defaultProduct}` : "");
  return (
    <aside className="cta-banner">
      <p>{locale === "zh" ? "把你的应用条件告诉我们，更快缩小试样范围。" : "Tell us your process conditions to narrow the sample set faster."}</p>
      <a className="button button-dark" href={href}>
        {ui.rfq} <span aria-hidden>↗</span>
      </a>
    </aside>
  );
}
