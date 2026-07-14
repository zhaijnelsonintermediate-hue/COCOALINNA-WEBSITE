import type { Locale } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { pathFor } from "@/lib/routes";
import { t } from "@/lib/i18n";
import { loc, publicApplications } from "@/lib/content";
import { PageShell } from "@/components/PageShell";

export function solutionsMeta(locale: Locale) {
  return buildMetadata({
    locale,
    key: "solutions",
    title: locale === "zh" ? "应用方案｜烘焙 · 冰淇淋 · 饮品 · 食品工业" : "Solutions｜Bakery · Frozen · Beverage · Industry",
    description:
      locale === "zh"
        ? "可可琳纳按应用场景组织的巧克力选型方案：烘焙、冰淇淋与冷冻甜品、饮品与乳品、食品工业。"
        : "Cocoa-Linna chocolate selection organised by application: bakery, ice cream & frozen dessert, beverage & dairy, food manufacturing.",
  });
}

export function SolutionsIndex({ locale }: { locale: Locale }) {
  const ui = t(locale);
  return (
    <PageShell
      locale={locale}
      routeKey="solutions"
      breadcrumbs={[{ name: locale === "zh" ? "应用方案" : "Solutions", key: "solutions" }]}
    >
      <section className="page-hero">
        <p className="eyebrow">APPLICATIONS</p>
        <h1>{locale === "zh" ? "应用方案" : "Application solutions"}</h1>
        <p className="page-lead">
          {locale === "zh"
            ? "先说你要做什么，再选择哪一种巧克力。每个应用方案给出典型工艺、常见问题、推荐产品与试样所需条件。"
            : "Tell us what you make, then choose the chocolate. Each solution covers typical process, common issues, recommended products and what a trial needs."}
        </p>
      </section>
      <section className="section">
        <div className="solution-list">
          {publicApplications.map((a, i) => (
            <a className="solution-list-item" key={a.slug} href={pathFor(locale, "solutionDetail", { slug: a.slug })}>
              <img src={a.image.src} alt={loc(a.image.alt, locale)} width={a.image.width} height={a.image.height} loading="lazy" decoding="async" />
              <div>
                <span>0{i + 1}</span>
                <h2>{loc(a.title, locale)}</h2>
                <p>{loc(a.summary, locale)}</p>
                <em>{ui.readMore}<b aria-hidden>↗</b></em>
              </div>
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
