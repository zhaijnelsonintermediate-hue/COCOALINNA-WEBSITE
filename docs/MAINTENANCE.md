# 维护指南 / Maintenance

面向用户、Claude 与 ChatGPT 的日常内容维护流程。所有内容为 Git 版本控制的文件型内容库，无需 CMS。

## 发布流程

```text
AI 起草 → 字段验证(content:validate) → 公司事实审核 → 中英文校对 → 置为 verified 发布
→ 重新构建(build 自动重生成页面/Schema/Sitemap/Feed)
→ IndexNow/百度提交(接入后) → 记录 updatedAt
```

只有 `status: "verified"` 的记录会渲染到公共页面并进入 sitemap/feed。脚手架默认写入 `pending`。

## 新增产品

```bash
npm run new:product -- <category> <slug> "<中文名>" "<English name>"
# category ∈ couverture | compound-chocolate | chocolate-sauce | functional-decoration
```

1. 编辑 `data/products.json` 中新记录：填写 `shortDescription`、`productForm`、`fatSystem`、`attributes`（仅确认属性）、`packagingOptions`、`applicationTags`、`recommendedApplications`、`images`（含 `alt` 中英与 `width/height`）。
2. 把产品图放入 `public/company/`，更新 `images[].src`。
3. 公司确认后把 `status` 改为 `verified`，填 `verifiedBy` / `lastVerifiedAt`。
4. `npm run content:validate` → `npm run build` → `npm run seo:validate && npm run links:check`。

## 新增文章

```bash
npm run new:article -- <category> <slug> "<中文标题>" "<English title>"
# category ∈ selection-guides | application-guides | standards-quality | rd-insights
```

1. 填写 `summary`、`buyerQuestion`、`body`（区块 `p|h2|list|note`，中英并列）、`faq`、`evidence`、`relatedProductIds`、`relatedApplicationIds`。
2. 走 `draft → review → published`，公司确认后 `status: verified`，可填 `technicalReviewer`。
3. 同上运行校验、构建、SEO/链接检查。文章会自动进入 `/feed.xml` 与知识分类页。

## 更新认证 / 企业信息

- 认证编号与有效期：编辑 `data/certifications.json`（`certificateNumber`、`validUntil`）。
- 企业信息：编辑 `data/company.json`（历程、地点、统计）。

## 发布中英文版本

中英文为同一记录的 `{ zh, en }` 字段——填全两种语言即同时上线两语言页面，`translationKey` 保证互链与 hreflang 自动生成。**不允许只有导航/页脚英文、正文仍为中文**：`content:validate` 会对空字段报错。

## 每次改动前后必跑

```bash
npm run content:validate      # 字段与引用完整性
npm run build                 # 权威构建 + 类型（vinext）
npm run seo:validate          # canonical/hreflang/JSON-LD/robots/feed（需先 build）
npm run links:check           # 内链无断链、无孤立页
npm run lint                  # 0 error
```

## 旧站迁移 / 重定向

编辑 `data/redirects.json` 增补 301（`from` → `to`，尾斜杠会自动归一）。上线前完成现官网 URL 全量盘点，为每个有价值旧 URL 指定最相关新 URL，勿统一指向首页。同步 `node scripts/…` 或手动更新 `docs/REDIRECTS.csv`。
