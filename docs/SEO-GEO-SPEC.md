# SEO / GEO 规范 / Spec

传统搜索与 AI 检索的主体系是：标准 HTML + 服务端可见内容 + 清晰结构 + Sitemap + Feed + Schema + 内链 + 真实内容。`/llms.txt` 仅为辅助，不作为排名或 AI 推荐的核心手段。没有专用 GEO Schema。

## 元数据（`lib/metadata.ts` → 每个可索引页面）

- 唯一 `title`、唯一 `meta description`。
- 自引用 canonical（`alternates.canonical`）。
- 中英双向 `hreflang`（`zh-CN`、`en`、`x-default`→中文），由 `lib/routes.ts#alternatesFor` 统一生成。
- Open Graph + Twitter 卡片 + 社交分享图。
- `robots`：默认 `index,follow`；`buildMetadata({ noindex:true })` 输出 `noindex,follow`。
- `datePublished/dateModified` 仅用内容中的真实日期，不随构建伪装更新。

## JSON-LD（`lib/schema.ts`，与可见内容同源）

- 全站：`Organization`（`@id=…/#organization`）、`WebSite`。
- 非首页：`BreadcrumbList`（`PageShell` 自动注入）。
- 产品详情：`Product` —— 无公开价格 **不输出** `Offer`；已确认属性 → `additionalProperty`；`manufacturer` 引用 Organization `@id`。
- 产品分类 / 产品中心：`ItemList`。
- 文章：`Article` —— 真实作者、发布/修改日期、发布机构、主图；`technicalReviewer` 为占位时不输出 `reviewedBy`。
- FAQ：**仅当页面存在真实可见问答** 时输出 `FAQPage`（文章页）。
- 所有 URL 为绝对 URL；`<` 转义防止脚本逃逸。`scripts/seo-validate.mjs` 校验每页 JSON-LD 为合法 JSON。

## Robots（`lib/seo-files.ts#robotsTxt`，可配置）

- 允许 `Googlebot`、`Bingbot`、`Baiduspider` 及 AI 搜索爬虫 `OAI-SearchBot`、`ChatGPT-User`、`Claude-SearchBot`、`Claude-User` 访问公开内容。
- **训练类爬虫** `GPTBot`、`ClaudeBot` 与搜索用途分开配置，受 `SITE.allowAiTrainingBots` 开关控制（当前默认 **允许**，因项目目标为“公开知识可被发现”）。改为 `false` 并重新部署即可禁止。
- `Disallow`：`/admin/`、`/api/private/`、`/draft/`、`/preview/`、`/_test/`（对所有 UA）。
- 写入完整 `Sitemap:` URL。robots.txt 不作为安全工具，秘密数据不部署到公共目录。

## Sitemap / Feed（`lib/sitemap.ts`）

- `/sitemap.xml`：74 个 canonical URL，每个含 `xhtml:link` hreflang 备用集合与真实 `lastmod`（结构页用固定日期，产品/文章用 `updatedAt`）。**只包含 200、canonical、可索引页面**（由 `seo:validate` 保证）。
- `/feed.xml`：Atom，发布技术文章时自动包含。
- 图片 sitemap：公司/产品图片数量增加后再启用（预留）。

## 扩展点（已预留，密钥走环境变量）

- **IndexNow**：新增/更新/删除已发布页面后自动提交的 hook 位（`INDEXNOW_KEY`）。
- **百度链接提交**：搜索资源平台推送 hook 位（`BAIDU_PUSH_TOKEN`）。
- **公共数据层**（未启用）：`/api/public/v1/products`、`/feeds/products.json`、`/openapi.json`——仅暴露已验证且网页可见字段，需版本、缓存、限流、CORS。
- RFQ 以标准无障碍 HTML 表单为核心；Agent 自动询盘接口在鉴权/限流/反垃圾/公司确认前不开放。

## 301 / 404 / 410

- 旧 URL 301 映射见 `data/redirects.json` → `docs/REDIRECTS.csv`，由 `worker/index.ts` 执行。不把旧页面统一重定向到首页。
- 自定义 404：`app/(zh|en)/not-found.tsx` + 全局兜底 `app/not-found.tsx`。
- 失效产品：从 `products.json` 移除或置 `status!=verified` 即自动退出 sitemap/内链；必要时对永久下架 URL 采用 410（可在 Worker 扩展）。

## CI 应阻断（进入生产前）

重复 URL/slug；缺少 H1/title/description/canonical；hreflang 不互指；页面或 JSON-LD 出现未验证占位参数；断链/坏图/空 alt；sitemap 含 404/重定向/noindex/非 canonical；草稿或内部内容被索引。以上分别由 `content:validate` + `seo:validate` + `links:check` 覆盖。

## 监测与归因（预留，密钥不入库）

Google Search Console / GA4、Bing Webmaster、百度搜索资源平台 / 百度统计。统一事件：`view_product`、`view_solution`、`download_technical_document`、`request_sample`、`submit_rfq`、`switch_language`、`ai_referral`（把 ChatGPT/Claude/Perplexity/Bing-Copilot 来源归入 AI referral，保留原始 referrer 与 UTM）。见 `.env.example`。
