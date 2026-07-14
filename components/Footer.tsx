import type { Locale } from "@/lib/site";
import { NAV, t } from "@/lib/i18n";
import { pathFor } from "@/lib/routes";
import { company, loc } from "@/lib/content";

const COMPANY_LINKS: { key: Parameters<typeof pathFor>[1]; zh: string; en: string }[] = [
  { key: "about", zh: "关于我们", en: "About" },
  { key: "rd-manufacturing", zh: "研发与制造", en: "R&D & manufacturing" },
  { key: "quality-certifications", zh: "质量与认证", en: "Quality & certifications" },
  { key: "resources", zh: "资料下载", en: "Resources" },
  { key: "contact", zh: "联系我们", en: "Contact" },
];

export function Footer({ locale }: { locale: Locale }) {
  const ui = t(locale);
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <div className="footer-brand">
            <strong>COCOA-LINNA</strong>
            <span>可 可 琳 纳</span>
          </div>
          <p>{ui.footerTagline}</p>
        </div>
        <nav className="footer-col" aria-label={ui.footerNav}>
          <h2>{ui.footerNav}</h2>
          <ul>
            {NAV.map((item) => (
              <li key={item.key}>
                <a href={pathFor(locale, item.key)}>{item.label[locale]}</a>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="footer-col" aria-label={ui.footerCompany}>
          <h2>{ui.footerCompany}</h2>
          <ul>
            {COMPANY_LINKS.map((l) => (
              <li key={l.key}>
                <a href={pathFor(locale, l.key)}>{locale === "zh" ? l.zh : l.en}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-col">
          <h2>{locale === "zh" ? "联系" : "Contact"}</h2>
          <ul>
            <li>
              <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>{company.phone}</a>
            </li>
            {company.locations.map((location) => (
              <li key={location.id}>
                {loc(location.role, locale)}· {loc(location.addressLocality, locale)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {ui.footerLegal}</span>
        <span>{ui.footerDisclaimer}</span>
      </div>
    </footer>
  );
}
