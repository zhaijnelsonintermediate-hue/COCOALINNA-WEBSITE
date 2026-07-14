import type { Locale } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { pathFor } from "@/lib/routes";
import { t } from "@/lib/i18n";
import {
  company,
  loc,
  productCategories,
  productsByCategory,
  publicApplications,
  articlesByRecency,
} from "@/lib/content";
import { PageShell } from "@/components/PageShell";

const HERO = {
  zh: {
    eyebrow: "CHOCOLATE EXPERT · SINCE 1995",
    title: ["从原料到应用，", "让巧克力成为", "产品竞争力"],
    body: "纯脂、代脂、巧克力酱与功能型解决方案，服务烘焙、冰淇淋、饮品与食品工业。",
    primary: "按应用选产品",
    trust: [
      ["1995", "专业巧克力事业起点"],
      ["GB/T 19343—2025", "主要起草单位之一"],
      ["三地协同", "上海研发 · 海门制造 · 沈阳研发"],
    ],
    productTitle: "四套产品系统，覆盖从配方到呈现",
    productBody: "从纯脂、代脂到巧克力酱与功能装饰，按应用条件选择合适的巧克力体系。",
    solTitle: "先说你要做什么，再选择哪一种巧克力",
    solBody: "温度、含水量、设备、货架期和目标口感，都会改变最合适的答案。",
    knowledgeTitle: "把选型经验写成可以被找到的知识",
    knowledgeBody: "应用文章回答采购与研发在真实项目中会问的问题。",
    evidenceTitle: "让采购、研发与 AI 都能读懂的证据",
  },
  en: {
    eyebrow: "CHOCOLATE EXPERT · SINCE 1995",
    title: ["From ingredient", "to application,", "engineered to compete"],
    body: "Couverture, compound, chocolate sauces and functional solutions for bakery, ice cream, beverages and food manufacturing.",
    primary: "Find by application",
    trust: [
      ["1995", "Our chocolate journey began"],
      ["GB/T 19343—2025", "A major drafting organisation"],
      ["Three sites", "Shanghai · Haimen · Shenyang"],
    ],
    productTitle: "Four systems, from formulation to finish",
    productBody: "From couverture and compound to sauces and functional decoration — choose the chocolate system by application.",
    solTitle: "Tell us what you make. Then choose the chocolate.",
    solBody: "Temperature, water activity, equipment, shelf life and target texture all shape the right answer.",
    knowledgeTitle: "Turn selection experience into findable knowledge",
    knowledgeBody: "Application articles answer real procurement and R&D questions.",
    evidenceTitle: "Proof procurement, R&D and AI can interpret",
  },
} as const;

export function homeMeta(locale: Locale) {
  return buildMetadata({
    locale,
    key: "home",
    title:
      locale === "zh"
        ? "可可琳纳 COCOA-LINNA｜B2B 巧克力应用解决方案"
        : "Cocoa-Linna｜B2B Chocolate Application Solutions",
    description:
      locale === "zh"
        ? "可可琳纳为烘焙、冰淇淋、饮品与食品工业提供纯脂巧克力、代脂巧克力、巧克力酱、耐烤与装饰巧克力应用解决方案。"
        : "Cocoa-Linna supplies couverture, compound chocolate, chocolate sauces, bake-stable and decoration chocolate for bakery, ice cream, beverage and food-manufacturing customers.",
  });
}

export function HomePage({ locale }: { locale: Locale }) {
  const h = HERO[locale];
  const ui = t(locale);
  const articles = articlesByRecency().slice(0, 3);

  return (
    <PageShell locale={locale} routeKey="home">
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{h.eyebrow}</p>
          <h1>{h.title.map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="hero-body">{h.body}</p>
          <div className="hero-actions">
            <a className="button button-dark" href={pathFor(locale, "solutions")}>
              {h.primary}<span aria-hidden>↘</span>
            </a>
            <a className="button button-line" href={pathFor(locale, "contact")}>
              {ui.rfq}<span aria-hidden>↗</span>
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/company/image-277.webp" alt={locale === "zh" ? "可可豆与黑巧克力" : "Cocoa beans and dark chocolate"} width={1920} height={1080} fetchPriority="high" decoding="async" />
        </div>
        <div className="trust-strip">
          {h.trust.map(([value, label], i) => (
            <div className="trust-item" key={value}>
              <span>0{i + 1}</span>
              <strong>{value}</strong>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section solutions-section" id="solutions">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">START WITH THE APPLICATION</p>
            <h2>{h.solTitle}</h2>
          </div>
          <p>{h.solBody}</p>
        </div>
        <div className="solution-grid">
          {publicApplications.map((a, i) => (
            <article className={`solution-card ${i % 3 === 0 ? "wide" : "standard"}`} key={a.slug}>
              <a href={pathFor(locale, "solutionDetail", { slug: a.slug })}>
                <img src={a.image.src} alt={loc(a.image.alt, locale)} width={a.image.width} height={a.image.height} loading="lazy" decoding="async" />
                <div className="solution-overlay" />
                <div className="solution-index">0{i + 1}</div>
                <div className="solution-copy">
                  <h3>{loc(a.title, locale)}</h3>
                  <p>{loc(a.summary, locale)}</p>
                  <em>{ui.readMore}<span aria-hidden>↘</span></em>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section products-section" id="products">
        <div className="section-heading product-heading">
          <p className="eyebrow">PRODUCT SYSTEMS</p>
          <h2>{h.productTitle}</h2>
          <p>{h.productBody}</p>
        </div>
        <div className="category-grid">
          {productCategories.map((c, i) => {
            const first = productsByCategory(c.slug)[0];
            return (
              <a className="category-card" key={c.slug} href={pathFor(locale, "productCategory", { category: c.slug })}>
                {first?.images[0] && (
                  <img src={first.images[0].src} alt={loc(first.images[0].alt, locale)} width={first.images[0].width} height={first.images[0].height} loading="lazy" decoding="async" />
                )}
                <div className="category-card-copy">
                  <span>0{i + 1}</span>
                  <h3>{loc(c.title, locale)}</h3>
                  <p>{loc(c.definition, locale)}</p>
                  <em>{ui.viewAll}<b aria-hidden>↗</b></em>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="craft-section" id="about">
        <div className="craft-copy">
          <p className="eyebrow light">BEAN TO DESSERT</p>
          <h2>{locale === "zh" ? "把原料、感官与工艺放在同一张桌上" : "Ingredients, sensory and process — at one table"}</h2>
          <p className="craft-lead">{loc(company.description, locale)}</p>
          <a className="button button-line light" href={pathFor(locale, "about")}>
            {locale === "zh" ? "了解可可琳纳" : "About Cocoa-Linna"}<span aria-hidden>↗</span>
          </a>
        </div>
        <div className="craft-gallery">
          <figure className="gallery-bean"><img src="/company/image-001.webp" alt={locale === "zh" ? "可可果" : "Cocoa pods"} width={1105} height={704} loading="lazy" decoding="async" /><figcaption>{locale === "zh" ? "原料" : "Ingredients"}</figcaption></figure>
          <figure className="gallery-lab"><img src="/company/image-372.webp" alt={locale === "zh" ? "研发人员进行可可豆感官评价" : "R&D sensory evaluation of cocoa beans"} width={1080} height={1577} loading="lazy" decoding="async" /><figcaption>{locale === "zh" ? "研发" : "R&D"}</figcaption></figure>
          <figure className="gallery-taste"><img src="/company/image-375.webp" alt={locale === "zh" ? "巧克力样品品评" : "Chocolate sample evaluation"} width={1080} height={1527} loading="lazy" decoding="async" /><figcaption>{locale === "zh" ? "品评" : "Sensory"}</figcaption></figure>
          <figure className="gallery-line"><img src="/company/image-456.webp" alt={locale === "zh" ? "巧克力生产线" : "Chocolate production line"} width={1920} height={1080} loading="lazy" decoding="async" /><figcaption>{locale === "zh" ? "制造" : "Manufacturing"}</figcaption></figure>
        </div>
      </section>

      <section className="section knowledge-section">
        <div className="section-heading split-heading knowledge-heading">
          <div><p className="eyebrow">APPLICATION KNOWLEDGE</p><h2>{h.knowledgeTitle}</h2></div>
          <p>{h.knowledgeBody}</p>
        </div>
        <div className="knowledge-grid">
          {articles.map((a, i) => (
            <article key={a.id}>
              <div className="knowledge-number">0{i + 1}</div>
              <p>{loc(a.buyerQuestion, locale)}</p>
              <h3>
                <a href={pathFor(locale, "article", { category: a.category, slug: a.slug })}>{loc(a.title, locale)}</a>
              </h3>
              <span>{loc(a.summary, locale)}</span>
            </article>
          ))}
        </div>
        <p className="section-more">
          <a href={pathFor(locale, "knowledge")}>{ui.viewAll} →</a>
        </p>
      </section>
    </PageShell>
  );
}
