"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@/lib/site";

const STR = {
  zh: {
    company: "公司名称",
    contact: "联系人",
    contactWay: "手机或邮箱",
    application: "应用场景",
    product: "意向产品",
    volume: "预计用量 / 项目阶段",
    message: "工艺条件与目标口感",
    choose: "请选择",
    submit: "提交样品需求",
    note: "本表单目前用于收集样品/RFQ 需求，尚未接入后台自动发送。正式上线后可接入邮箱、CRM 或企业微信。",
    success: "已在本页记录您的需求。正式接入后台后，这里会自动生成销售线索。",
    apps: ["连锁烘焙", "食品工业", "冰淇淋与冷冻甜品", "饮品与乳品", "休闲食品", "其他"],
  },
  en: {
    company: "Company",
    contact: "Contact person",
    contactWay: "Phone or email",
    application: "Application",
    product: "Product interest",
    volume: "Expected volume / project stage",
    message: "Process conditions and target texture",
    choose: "Select",
    submit: "Submit sample request",
    note: "This form currently collects sample / RFQ requests and is not yet wired to an automatic backend. Production can route leads to email, CRM or WeCom.",
    success: "Saved on this page. Once connected, this action will create a qualified sales lead.",
    apps: ["Bakery chain", "Food manufacturing", "Ice cream & frozen desserts", "Beverage & dairy", "Snacks", "Other"],
  },
} as const;

export function RfqForm({
  locale,
  products,
  defaultProduct = "",
}: {
  locale: Locale;
  products: { value: string; label: string }[];
  defaultProduct?: string;
}) {
  const s = STR[locale];
  const [submitted, setSubmitted] = useState(false);
  // Prefill the product from a ?product= link (e.g. a product-page CTA) using a
  // lazy initializer so there is no setState-in-effect and no dynamic route.
  const [product, setProduct] = useState(() => {
    if (typeof window === "undefined") return defaultProduct;
    const q = new URLSearchParams(window.location.search).get("product");
    return q && products.some((p) => p.value === q) ? q : defaultProduct;
  });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="rfq-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          <span>{s.company}</span>
          <input required name="company" autoComplete="organization" />
        </label>
        <label>
          <span>{s.contact}</span>
          <input required name="contact" autoComplete="name" />
        </label>
      </div>
      <label>
        <span>{s.contactWay}</span>
        <input required name="contactWay" autoComplete="email" />
      </label>
      <div className="form-row">
        <label>
          <span>{s.application}</span>
          <select required name="application" defaultValue="">
            <option value="" disabled>
              {s.choose}
            </option>
            {s.apps.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{s.product}</span>
          <select name="product" value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="">{s.choose}</option>
            {products.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>{s.volume}</span>
        <input name="volume" />
      </label>
      <label>
        <span>{s.message}</span>
        <textarea required name="message" rows={4} />
      </label>
      <button className="button button-copper" type="submit">
        {s.submit}
        <span aria-hidden>↗</span>
      </button>
      <p className="form-note">{s.note}</p>
      {submitted && (
        <div className="form-success" role="status">
          {s.success}
        </div>
      )}
    </form>
  );
}
