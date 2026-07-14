import type { Locale } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { pathFor } from "@/lib/routes";
import { loc, productCategories, productsByCategory } from "@/lib/content";
import { productListSchema } from "@/lib/schema";
import { PageShell } from "@/components/PageShell";
import { ProductGrid } from "@/components/blocks";

export function productsMeta(locale: Locale) {
  return buildMetadata({
    locale,
    key: "products",
    title: locale === "zh" ? "产品中心｜纯脂 · 代脂 · 巧克力酱 · 功能装饰" : "Products｜Couverture · Compound · Sauces · Functional",
    description:
      locale === "zh"
        ? "可可琳纳产品中心：纯脂巧克力、代脂巧克力、巧克力酱与功能装饰巧克力四大系统，按应用条件选择合适体系。"
        : "Cocoa-Linna product centre: couverture, compound chocolate, chocolate sauces and functional decoration — choose the right system by application.",
  });
}

export function ProductsIndex({ locale }: { locale: Locale }) {
  const allProducts = productCategories.flatMap((c) => productsByCategory(c.slug));
  return (
    <PageShell
      locale={locale}
      routeKey="products"
      breadcrumbs={[{ name: locale === "zh" ? "产品中心" : "Products", key: "products" }]}
      schema={[productListSchema(locale, "products", {}, allProducts)]}
    >
      <section className="page-hero">
        <p className="eyebrow">PRODUCT CENTER</p>
        <h1>{locale === "zh" ? "产品中心" : "Product centre"}</h1>
        <p className="page-lead">
          {locale === "zh"
            ? "四套产品系统覆盖从配方到呈现。选择一个系统查看分类定义、选型条件与具体产品。"
            : "Four product systems from formulation to finish. Choose a system to see its definition, selection criteria and products."}
        </p>
      </section>

      {productCategories.map((c) => {
        const products = productsByCategory(c.slug);
        return (
          <section className="section product-category-block" key={c.slug}>
            <div className="section-heading split-heading">
              <div>
                <h2>
                  <a href={pathFor(locale, "productCategory", { category: c.slug })}>{loc(c.title, locale)}</a>
                </h2>
              </div>
              <p>{loc(c.definition, locale)}</p>
            </div>
            <ProductGrid locale={locale} products={products} />
          </section>
        );
      })}
    </PageShell>
  );
}
