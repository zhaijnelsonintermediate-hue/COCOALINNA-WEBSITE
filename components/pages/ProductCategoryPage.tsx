import { notFound } from "next/navigation";
import type { Locale } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { getCategory, loc, productCategories, productsByCategory } from "@/lib/content";
import { productListSchema } from "@/lib/schema";
import { PageShell } from "@/components/PageShell";
import { ProductGrid } from "@/components/blocks";

export function productCategoryParams() {
  return productCategories.map((c) => ({ category: c.slug }));
}

export function productCategoryMeta(locale: Locale, category: string) {
  const c = getCategory(category);
  if (!c) return buildMetadata({ locale, key: "productCategory", params: { category }, title: "Products", description: "" });
  return buildMetadata({
    locale,
    key: "productCategory",
    params: { category },
    title: loc(c.title, locale),
    description: loc(c.definition, locale),
    image: productsByCategory(category)[0]?.images[0]?.src,
  });
}

export function ProductCategoryPage({ locale, category }: { locale: Locale; category: string }) {
  const c = getCategory(category);
  if (!c) notFound();
  const products = productsByCategory(category);

  return (
    <PageShell
      locale={locale}
      routeKey="productCategory"
      params={{ category }}
      breadcrumbs={[
        { name: locale === "zh" ? "产品中心" : "Products", key: "products" },
        { name: loc(c.title, locale), key: "productCategory", params: { category } },
      ]}
      schema={[productListSchema(locale, "productCategory", { category }, products)]}
    >
      <section className="page-hero">
        <p className="eyebrow">PRODUCT CATEGORY</p>
        <h1>{loc(c.title, locale)}</h1>
        <p className="page-lead">{loc(c.definition, locale)}</p>
        <div className="criteria-box">
          <h2>{locale === "zh" ? "选择条件" : "How to choose"}</h2>
          <ul>
            {c.selectionCriteria[locale].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <ProductGrid locale={locale} products={products} />
      </section>
    </PageShell>
  );
}
