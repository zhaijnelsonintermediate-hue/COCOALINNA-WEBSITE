# 技术架构 / Architecture

> 可可琳纳 COCOA-LINNA — SEO/GEO 生产架构（本轮：生产架构 + 页面模板 + 内容模型 + SEO/GEO 基础设施）。

## 技术栈

- **框架**：Next.js App Router（v16），通过 [`vinext`](https://github.com/cloudflare/vinext) 运行在 **Cloudflare Workers** 上（Vite + RSC）。这是现有 V1 源码采用的方向，予以保留，未做无必要的框架迁移。
- **语言**：TypeScript（严格模式），React 19 服务端组件（RSC）。
- **样式**：Tailwind v4（`@import "tailwindcss"`）+ 手写设计系统（`app/globals.css`，保留 V1 视觉母版并追加多页面模板样式）。
- **运行时数据**：静态导入的文件型内容库（`data/*.json` + `lib/content.ts`）。Cloudflare Workers 运行时无文件系统，故内容在构建时被打包进产物。
- **可选后端**：Cloudflare D1 / Drizzle（`db/`，当前 schema 为空，未使用）。

## 渲染方式

- 所有公共页面为 **服务端渲染（SSG/SSR）**。首页、产品、应用、文章、企业页在“查看网页源代码”时即可读到主要正文、H1、链接与 JSON-LD（已由 `scripts/seo-validate.mjs` 逐页校验）。
- **Client Component 仅用于交互增强**：`components/Header.tsx`（移动端菜单开合）与 `components/RfqForm.tsx`（表单状态）。主要内容不锁在客户端状态里。
- 原 V1 的产品/知识 **弹窗** 已升级为 **真实独立详情页 URL**（更利于抓取与引用），弹窗式浏览不再是唯一入口。语言切换是 **真实链接**（跨 `(zh)`/`(en)` 根布局，整页导航），不是客户端替换文字。

## 目录结构（关键部分）

```text
app/
  (zh)/                    中文根布局组（默认语言，根路径）
    layout.tsx             <html lang="zh-CN">
    page.tsx               /                     （薄包装 → components/pages/*）
    products/…             /products, /products/[category], /products/[category]/[slug]
    solutions/…            /solutions, /solutions/[slug]
    knowledge/…            /knowledge, /knowledge/[category], /knowledge/[category]/[slug]
    about|rd-manufacturing|quality-certifications|resources|contact/
    not-found.tsx
  (en)/                    英文根布局组
    layout.tsx             <html lang="en">
    en/…                   /en/* 镜像上述全部路由
    not-found.tsx
  not-found.tsx            全局兜底 404（自带 html/body）
  globals.css              视觉母版 + 多页面模板样式
components/
  pages/*                  按 locale 参数渲染的共享页面模板（真正的实现）
  Header, Footer, PageShell, Breadcrumbs(内置于 PageShell), RfqForm, Prose, blocks, JsonLd, NotFoundView
lib/
  site.ts                  站点常量、绝对 URL、AI 训练爬虫开关
  routes.ts                URL 单一模型：pathFor / canonicalFor / alternatesFor
  i18n.ts                  UI 文案字典、导航
  types.ts                 内容模型类型
  content.ts               类型化内容访问层（单一事实来源）
  schema.ts                JSON-LD 构建器
  metadata.ts              Next Metadata（title/canonical/hreflang/OG）
  sitemap.ts               全站可索引 URL 枚举
  seo-files.ts             robots.txt / sitemap.xml / feed.xml / llms.txt 生成器
data/*.json                company, products, applications, articles, certifications, evidence, taxonomy, redirects
scripts/*.mjs              content-validate / seo-validate / links-check / new-product / new-article
worker/index.ts            Cloudflare 入口：301 重定向 + SEO 文件 + 图片优化 + vinext handler
docs/*                     本套文档
```

## 组件边界

- **`components/pages/*`** 是页面真正实现，接受 `locale` 参数；`app/(zh)/…` 与 `app/(en)/en/…` 只是薄包装（`generateMetadata` + `generateStaticParams` + 渲染），避免中英文重复代码。
- **`PageShell`** 统一提供：跳转链接、Header、面包屑、`<main>`、Footer，并注入 `Organization` + `WebSite` + `BreadcrumbList` 及页面级 JSON-LD。
- **数据流单向**：`data/*.json` →（`lib/content.ts` 只暴露 `status: verified` 的公开数据）→ 页面模板 / JSON-LD / sitemap / feed / llms.txt。可见内容与结构化数据同源，不会互相矛盾。

## 国际化（i18n）

- 采用 Next.js **多根布局 + 路由组** 方案：`(zh)` 与 `(en)` 各自拥有独立 `<html lang>`。
- 中文位于根路径以保留现有权重，英文位于 `/en/`。
- URL 规范形式 **无尾斜杠**（框架默认 `trailingSlash: false`，见 `next.config.ts`）：canonical/sitemap/内链均为非尾斜杠且返回 200，带尾斜杠的变体 308 重定向到规范 URL。此策略下静态资源（`/company/*.webp` 等）不会被重定向到 404。
- 文件型 SEO 端点（`/robots.txt`、`/sitemap.xml`、`/feed.xml`、`/llms.txt`）在 `worker/index.ts` 中于框架路由前直接返回。

## 与 V1 的差异（保留视觉母版）

- 保留 `app/globals.css` 全部设计令牌与视觉语言、`public/company/*` 全部公司原图与产品图。
- `app/CocoaLinnaSite.tsx`（单页 client 原型）已被多页面服务端模板取代；其视觉在 `globals.css` 与新模板中延续，原文件仍保留在首个提交的 git 历史中。
- 产品/应用/文章的营销文案沿用 V1 已有真实内容；技术事实以公司资料（PDF）为准，未确认字段留空或标记 `TODO_COMPANY_VERIFY`。

## 构建与校验

`npm run build`（vinext，权威构建/类型门）· `npm run content:validate` · `npm run seo:validate` · `npm run links:check` · `npm run lint` · `npm test`。详见 docs/SEO-GEO-SPEC.md 与 docs/ACCEPTANCE-REPORT.md。
