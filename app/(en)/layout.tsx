import type { Metadata, Viewport } from "next";
import "../globals.css";
import { SITE } from "@/lib/site";

/** English root layout (served under /en). See the (zh) group for the default. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: "Cocoa-Linna｜B2B Chocolate Application Solutions",
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

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
