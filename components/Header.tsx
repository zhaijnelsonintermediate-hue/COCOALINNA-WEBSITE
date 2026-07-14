"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/site";
import { NAV, t } from "@/lib/i18n";
import { pathFor } from "@/lib/routes";

/**
 * Site header. Interactive only for the mobile menu toggle; every link is a
 * real <a href> present in the server-rendered HTML. The language switch is a
 * real link to the equivalent page in the other language (never a client-only
 * text swap).
 */
export function Header({ locale, altPath }: { locale: Locale; altPath: string }) {
  const [open, setOpen] = useState(false);
  const ui = t(locale);
  const home = pathFor(locale, "home");

  return (
    <header className="site-header">
      <Link className="wordmark" href={home} aria-label={`${locale === "zh" ? "可可琳纳" : "Cocoa-Linna"} home`}>
        <span>COCOA-LINNA</span>
        <small>可 可 琳 纳</small>
      </Link>
      <nav className={open ? "main-nav open" : "main-nav"} aria-label={locale === "zh" ? "主导航" : "Primary navigation"}>
        {NAV.map((item) => (
          <Link key={item.key} href={pathFor(locale, item.key)} onClick={() => setOpen(false)}>
            {item.label[locale]}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        {/* Language switch crosses the (zh)/(en) root layouts — a real link (full
            navigation), never a client-only text swap. */}
        <a className="language-switch-link" href={altPath} hrefLang={locale === "zh" ? "en" : "zh-CN"} aria-label={ui.langLabel}>
          {ui.switchTo}
        </a>
        <Link className="sample-mini" href={pathFor(locale, "contact")}>
          {ui.rfqShort} <span aria-hidden>↗</span>
        </Link>
        <button
          className={open ? "menu-button active" : "menu-button"}
          type="button"
          aria-label={open ? ui.closeMenu : ui.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
        </button>
      </div>
    </header>
  );
}
