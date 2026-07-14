/**
 * UI-chrome strings (navigation, buttons, labels). Body/marketing copy lives in
 * the content layer (`data/*.json`, `content/*`), not here.
 */
import type { Locale } from "./site";
import type { RouteKey } from "./routes";

export type Dict = { [K in keyof (typeof UI)["zh"]]: string };

export const localeHtmlLang: Record<Locale, string> = { zh: "zh-CN", en: "en" };
export const otherLocale: Record<Locale, Locale> = { zh: "en", en: "zh" };

/** Primary navigation: label + target route key, shared by both languages. */
export const NAV: { key: RouteKey; label: Record<Locale, string> }[] = [
  { key: "products", label: { zh: "产品中心", en: "Products" } },
  { key: "solutions", label: { zh: "应用方案", en: "Solutions" } },
  { key: "knowledge", label: { zh: "知识中心", en: "Knowledge" } },
  { key: "quality-certifications", label: { zh: "质量与认证", en: "Quality" } },
  { key: "about", label: { zh: "关于我们", en: "About" } },
  { key: "contact", label: { zh: "联系我们", en: "Contact" } },
];

export const UI = {
  zh: {
    skipToContent: "跳到主要内容",
    home: "首页",
    langLabel: "语言",
    switchTo: "English",
    rfq: "申请样品 / RFQ",
    rfqShort: "样品 / RFQ",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    breadcrumbHome: "首页",
    readMore: "了解更多",
    viewProduct: "查看产品",
    viewAll: "查看全部",
    relatedProducts: "相关产品",
    relatedApplications: "相关应用方案",
    relatedArticles: "相关技术文章",
    recommendedProducts: "推荐产品",
    keyFacts: "关键事实",
    specifications: "关键参数",
    packaging: "包装规格",
    applications: "适用应用",
    lastVerified: "最后审核",
    dataNote: "本页公开信息以公司审核版本为准；具体参数、认证有效期与供货条件请以最终确认为准。",
    pendingNote: "该字段尚待公司质量部门确认，暂不作为承诺。",
    faqTitle: "常见问题",
    sampleCta: "申请该产品样品",
    contactCta: "联系应用团队",
    author: "作者",
    reviewer: "技术审核",
    published: "发布",
    updated: "更新",
    evidence: "依据与来源",
    footerTagline: "Bean to Dessert with Love",
    footerLegal: "可可琳纳食品贸易（上海）股份有限公司",
    footerDisclaimer: "本网站公开内容以公司审核版本为准。",
    footerNav: "网站导航",
    footerCompany: "公司",
    notFoundTitle: "页面不存在",
    notFoundBody: "您访问的页面可能已移动或不存在。",
    backHome: "返回首页",
  },
  en: {
    skipToContent: "Skip to main content",
    home: "Home",
    langLabel: "Language",
    switchTo: "中文",
    rfq: "Request samples / RFQ",
    rfqShort: "Sample / RFQ",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    breadcrumbHome: "Home",
    readMore: "Learn more",
    viewProduct: "View product",
    viewAll: "View all",
    relatedProducts: "Related products",
    relatedApplications: "Related solutions",
    relatedArticles: "Related articles",
    recommendedProducts: "Recommended products",
    keyFacts: "Key facts",
    specifications: "Specifications",
    packaging: "Packaging",
    applications: "Applications",
    lastVerified: "Last reviewed",
    dataNote:
      "Public information on this page is subject to the company-approved version; parameters, certificate validity and supply terms are confirmed on request.",
    pendingNote: "This field is pending confirmation by the Quality department and is not a commitment.",
    faqTitle: "Frequently asked questions",
    sampleCta: "Request this sample",
    contactCta: "Contact the applications team",
    author: "Author",
    reviewer: "Technical review",
    published: "Published",
    updated: "Updated",
    evidence: "Evidence & sources",
    footerTagline: "Bean to Dessert with Love",
    footerLegal: "Cocoa-Linna Food Trading (Shanghai) Co., Ltd.",
    footerDisclaimer: "Public content on this site is subject to the company-approved version.",
    footerNav: "Site navigation",
    footerCompany: "Company",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you requested may have moved or no longer exists.",
    backHome: "Back to home",
  },
} as const;

export function t(locale: Locale): Dict {
  return UI[locale];
}
