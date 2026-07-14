import type { Locale } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";
import { pathFor } from "@/lib/routes";
import {
  certifications,
  company,
  evidenceList,
  loc,
  publicProducts,
} from "@/lib/content";
import { PageShell } from "@/components/PageShell";
import { RfqForm } from "@/components/RfqForm";

/* ------------------------------------------------------------------ About */

export function aboutMeta(locale: Locale) {
  return buildMetadata({
    locale,
    key: "about",
    title: locale === "zh" ? "关于我们" : "About us",
    description: loc(company.description, locale),
    image: "/company/image-536.webp",
  });
}

export function AboutPage({ locale }: { locale: Locale }) {
  return (
    <PageShell
      locale={locale}
      routeKey="about"
      breadcrumbs={[{ name: locale === "zh" ? "关于我们" : "About", key: "about" }]}
    >
      <section className="page-hero">
        <p className="eyebrow">COCOA-LINNA SINCE 1995</p>
        <h1>{locale === "zh" ? "关于可可琳纳" : "About Cocoa-Linna"}</h1>
        <p className="page-lead">{loc(company.description, locale)}</p>
      </section>

      <section className="section">
        <div className="stat-row">
          {company.stats.map((s) => (
            <div className="stat" key={s.value}>
              <strong>{s.value}</strong>
              <span>{loc(s.label, locale)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>{locale === "zh" ? "发展历程" : "Milestones"}</h2>
        <div className="timeline">
          {company.timeline.map((item) => (
            <article key={item.year}>
              <strong>{item.year}</strong>
              <span>{loc(item.event, locale)}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>{locale === "zh" ? "三地布局" : "Three-site network"}</h2>
        <div className="location-grid">
          {company.locations.map((l) => (
            <article className="location-card" key={l.id}>
              <p className="eyebrow">{loc(l.role, locale)}</p>
              <h3>{loc(l.name, locale)}</h3>
              <p>{loc(l.streetAddress, locale)}, {loc(l.addressLocality, locale)}</p>
            </article>
          ))}
        </div>
        <p className="section-more">
          <a href={pathFor(locale, "rd-manufacturing")}>{locale === "zh" ? "研发与制造 →" : "R&D & manufacturing →"}</a>
        </p>
      </section>
    </PageShell>
  );
}

/* -------------------------------------------------------- R&D / manufacturing */

const RD_STEPS = {
  zh: [
    ["01", "原料与风味", "全球严选优质产区可可豆，通过稳定供应链管理确保批次品质与风味一致。"],
    ["02", "配方与应用", "围绕烘焙稳定、流动性、脆度、包衣与冷冻场景进行配方与应用验证。"],
    ["03", "制造与交付", "研发、生产、品质与技术服务协同，推动方案从试样走向量产。"],
  ],
  en: [
    ["01", "Ingredients & flavour", "Global sourcing of quality-origin cocoa beans with stable supply-chain management for batch and flavour consistency."],
    ["02", "Formula & application", "Formulation and application trials around bake stability, flow, snap, coating and frozen use."],
    ["03", "Manufacture & delivery", "R&D, production, quality and service move a sample toward scale-up."],
  ],
} as const;

export function rdMeta(locale: Locale) {
  return buildMetadata({
    locale,
    key: "rd-manufacturing",
    title: locale === "zh" ? "研发与制造" : "R&D & manufacturing",
    description:
      locale === "zh"
        ? "可可琳纳围绕客户最终产品组织研发、生产与技术服务：从可可原料到应用验证，三地协同推动量产。"
        : "Cocoa-Linna organises R&D, production and technical service around the customer's finished product, from cocoa ingredients to application validation across three sites.",
    image: "/company/image-456.webp",
  });
}

export function RdManufacturingPage({ locale }: { locale: Locale }) {
  const controls = evidenceList.find((e) => e.id === "process-controls");
  return (
    <PageShell
      locale={locale}
      routeKey="rd-manufacturing"
      breadcrumbs={[{ name: locale === "zh" ? "研发与制造" : "R&D & manufacturing", key: "rd-manufacturing" }]}
    >
      <section className="page-hero">
        <p className="eyebrow">BEAN TO DESSERT</p>
        <h1>{locale === "zh" ? "研发与制造" : "R&D & manufacturing"}</h1>
        <p className="page-lead">
          {locale === "zh"
            ? "从可可豆筛选、风味评价、配方试验，到生产与应用验证，围绕客户最终产品组织研发，而不是把原料交付作为终点。"
            : "From bean selection and sensory mapping to formulation, production and application trials — R&D is organised around the customer's finished product, not the ingredient hand-off."}
        </p>
      </section>

      <section className="section">
        <div className="craft-steps light-bg">
          {RD_STEPS[locale].map(([n, title, body]) => (
            <article key={n}>
              <span>{n}</span>
              <div>
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {controls && (
        <section className="section">
          <h2>{locale === "zh" ? "全链路品控" : "End-to-end quality control"}</h2>
          <p>{loc(controls.detail, locale)}</p>
          <p className="section-more">
            <a href={pathFor(locale, "quality-certifications")}>{locale === "zh" ? "质量与认证 →" : "Quality & certifications →"}</a>
          </p>
        </section>
      )}
    </PageShell>
  );
}

/* -------------------------------------------------- Quality & certifications */

export function qualityMeta(locale: Locale) {
  return buildMetadata({
    locale,
    key: "quality-certifications",
    title: locale === "zh" ? "质量与认证" : "Quality & certifications",
    description:
      locale === "zh"
        ? "可可琳纳的质量体系与认证：ISO 9001、ISO 22000、FSSC 22000、SMETA 与邓白氏资信，以及参与国家标准起草的公开证据。"
        : "Cocoa-Linna quality systems and certifications: ISO 9001, ISO 22000, FSSC 22000, SMETA and D&B, plus public evidence of national-standard drafting.",
    image: "/company/image-537.webp",
  });
}

export function QualityCertificationsPage({ locale }: { locale: Locale }) {
  return (
    <PageShell
      locale={locale}
      routeKey="quality-certifications"
      breadcrumbs={[{ name: locale === "zh" ? "质量与认证" : "Quality", key: "quality-certifications" }]}
    >
      <section className="page-hero">
        <p className="eyebrow">EVIDENCE, NOT SLOGANS</p>
        <h1>{locale === "zh" ? "质量与认证" : "Quality & certifications"}</h1>
        <p className="page-lead">
          {locale === "zh"
            ? "把标准、认证与适用边界写成可验证的信息。以下认证与证据为公司公开资料，证书编号与有效期以质量部门确认为准。"
            : "Standards, certifications and boundaries written as verifiable information. Certificate numbers and validity are confirmed by the Quality department."}
        </p>
      </section>

      <section className="section">
        <h2>{locale === "zh" ? "体系认证" : "System certifications"}</h2>
        <div className="cert-grid">
          {certifications.map((cert) => (
            <article className="cert-card" key={cert.id}>
              <h3>{loc(cert.name, locale)}</h3>
              <p className="cert-issuer">{loc(cert.issuer, locale)}</p>
              <p>{loc(cert.scope, locale)}</p>
              <p className="cert-pending">
                {locale === "zh" ? "证书编号 / 有效期：待质量部门确认" : "Certificate no. / validity: pending Quality confirmation"}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>{locale === "zh" ? "公开证据" : "Public evidence"}</h2>
        <ul className="evidence-mini">
          {evidenceList.map((e) => (
            <li key={e.id}>
              <strong>{loc(e.label, locale)}</strong> {loc(e.detail, locale)}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}

/* ------------------------------------------------------------- Resources */

export function resourcesMeta(locale: Locale) {
  return buildMetadata({
    locale,
    key: "resources",
    title: locale === "zh" ? "资料下载" : "Resources",
    description:
      locale === "zh"
        ? "可可琳纳技术资料与下载入口。产品技术资料（TDS）、规格书与检测报告将在公司审核后陆续上线。"
        : "Cocoa-Linna technical resources and downloads. Product technical data sheets, specifications and test reports will be published after company review.",
  });
}

export function ResourcesPage({ locale }: { locale: Locale }) {
  return (
    <PageShell
      locale={locale}
      routeKey="resources"
      breadcrumbs={[{ name: locale === "zh" ? "资料下载" : "Resources", key: "resources" }]}
    >
      <section className="page-hero">
        <p className="eyebrow">RESOURCES</p>
        <h1>{locale === "zh" ? "资料下载" : "Resources"}</h1>
        <p className="page-lead">
          {locale === "zh"
            ? "产品技术资料（TDS）、规格书与第三方检测报告将在公司审核后逐步上线，并为每个下载文件建立可搜索的 HTML 落地页。"
            : "Product technical data sheets, specifications and third-party test reports will be published after company review, each with a searchable HTML landing page."}
        </p>
      </section>
      <section className="section">
        <div className="resource-note">
          <p>
            {locale === "zh"
              ? "当前阶段暂无公开下载文件。你可以先从产品与应用页面了解公开参数，或直接联系应用团队索取对应技术资料。"
              : "No public downloads are available yet. Explore public parameters on the product and solution pages, or contact the applications team for the relevant technical documents."}
          </p>
          <p className="section-more">
            <a href={pathFor(locale, "products")}>{locale === "zh" ? "查看产品 →" : "View products →"}</a>{" "}
            <a href={pathFor(locale, "contact")}>{locale === "zh" ? "联系索取资料 →" : "Request documents →"}</a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}

/* -------------------------------------------------------------- Contact */

export function contactMeta(locale: Locale) {
  return buildMetadata({
    locale,
    key: "contact",
    title: locale === "zh" ? "联系我们 / 申请样品" : "Contact / Request samples",
    description:
      locale === "zh"
        ? "把你的应用条件告诉可可琳纳应用团队：终产品、工艺温度、设备、目标口感与预计用量，帮助更快缩小试样范围。"
        : "Tell the Cocoa-Linna applications team your finished product, process temperature, equipment, target texture and volume to narrow the sample set faster.",
  });
}

export function ContactPage({ locale }: { locale: Locale }) {
  const productOptions = publicProducts.map((p) => ({ value: p.id, label: loc(p.name, locale) }));
  return (
    <PageShell
      locale={locale}
      routeKey="contact"
      breadcrumbs={[{ name: locale === "zh" ? "联系我们" : "Contact", key: "contact" }]}
    >
      <section className="contact-section">
        <div className="contact-copy">
          <p className="eyebrow light">SAMPLE & RFQ</p>
          <h1>{locale === "zh" ? "把你的应用条件告诉我们" : "Tell us your process conditions"}</h1>
          <p>
            {locale === "zh"
              ? "提供终产品、工艺温度、设备、目标口感和预计用量，应用团队才能更快缩小试样范围。"
              : "Finished product, temperature, equipment, target texture and expected volume help the applications team narrow the sample set."}
          </p>
          <div className="contact-details">
            <p>{locale === "zh" ? "业务咨询" : "Business enquiries"}</p>
            <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>{company.phone}</a>
            {company.locations.map((l) => (
              <span key={l.id}>
                {loc(l.role, locale)} · {loc(l.streetAddress, locale)}, {loc(l.addressLocality, locale)}
              </span>
            ))}
          </div>
        </div>
        <RfqForm locale={locale} products={productOptions} />
      </section>
    </PageShell>
  );
}
