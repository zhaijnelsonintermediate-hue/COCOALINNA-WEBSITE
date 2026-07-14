import type { Metadata, Viewport } from "next";
import "../globals.css";
import { SITE } from "@/lib/site";

/**
 * Chinese root layout (default locale, served at the root path). Multiple root
 * layouts are used so `<html lang>` matches the page language — see the sibling
 * (en) group. Per-page metadata is generated in each route via `generateMetadata`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: "可可琳纳 COCOA-LINNA｜B2B巧克力应用解决方案",
    template: "%s",
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#25140f",
};

export default function ZhRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
