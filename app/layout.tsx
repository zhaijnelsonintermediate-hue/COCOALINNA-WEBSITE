import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cocoa-linna.com"),
  title: {
    default: "可可琳纳 COCOA-LINNA｜B2B巧克力应用解决方案",
    template: "%s｜可可琳纳 COCOA-LINNA",
  },
  description:
    "可可琳纳为烘焙、冰淇淋、饮品与食品工业提供纯脂巧克力、代脂巧克力、巧克力酱、耐烤与装饰巧克力应用解决方案。",
  keywords: [
    "可可琳纳",
    "Cocoa-Linna",
    "B2B巧克力供应商",
    "烘焙巧克力",
    "纯脂巧克力",
    "代脂巧克力",
    "巧克力酱",
    "耐烤巧克力豆",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: "en_US",
    title: "可可琳纳 COCOA-LINNA｜从原料到应用",
    description: "面向烘焙、冰淇淋、饮品与食品工业的专业巧克力应用解决方案。",
    url: "/",
    siteName: "可可琳纳 COCOA-LINNA",
    images: [
      {
        url: "/company/image-277.webp",
        width: 1920,
        height: 1080,
        alt: "可可豆与巧克力",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#25140f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
