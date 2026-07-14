# 验收报告 / Acceptance report

针对总指令“最低验收标准”的逐项证明。除人工说明外，所有结论可由脚本复现：

```bash
npm run content:validate     # 12 products, 4 applications, 4 articles, 0 errors
npm run build                # vinext build + artifact validation
npm run seo:validate         # 74 URLs: 200 + canonical + hreflang + JSON-LD + robots + feed
npm run links:check          # 74 pages crawled, 0 broken links, 0 orphans
npm run lint                 # 0 errors (仅 <img> 性能 warning，与 V1 一致)
npx tsc --noEmit             # 0 errors
npm test                     # 渲染 HTML 测试通过
```

| # | 验收标准 | 结果 | 证据 |
|---|---|---|---|
| 1 | 中文根路径与 `/en/` 均可访问 | ✅ | `/` → 200 lang=zh-CN；`/en/` → 200 lang=en（seo:validate 覆盖 74 个中英文 URL） |
| 2 | 语言对应页面拥有双向 hreflang 与独立 canonical | ✅ | 每页输出 `hreflang zh-CN / en / x-default` 三条 `<link rel="alternate">`（绝对 URL）+ 自引用 `canonical`；由 `lib/routes.ts#alternatesFor` 统一生成，中英文互指 |
| 3 | 关闭 JS / 查看源代码时主要正文与链接仍存在 | ✅ | SSR：产品页含关键参数表与“58%”、文章页含正文段落（原始 HTML 直接可见）；交互仅限移动菜单与表单 |
| 4 | 每个产品/文章有独立 URL，不只存在于弹窗 | ✅ | 12 个产品详情页、4 篇文章各有 SSG URL（原弹窗升级为真实详情页） |
| 5 | Robots / Sitemap / RSS / 404 / 301 正常 | ✅ | `/robots.txt`、`/sitemap.xml`(74)、`/feed.xml`(Atom) 均 200；`/不存在` → 404；`/product`→301→`/products/`（14 条映射，worker 执行） |
| 6 | JSON-LD 通过语法检查，字段与可见内容一致 | ✅ | seo:validate 逐页 `JSON.parse` 全部 ld+json；同源于内容层 |
| 7 | Sitemap 只含 200 / canonical / 可索引页面 | ✅ | seo:validate 断言每个 `<loc>` 返回 200 且等于该页 canonical |
| 8 | 无断链 / 坏图 / 重复 title / 重复 H1 / 孤立页 | ✅ | links:check 0 断链 0 孤立；seo:validate 断言每页恰好 1 个 `<h1>`；title 由路由动态生成唯一 |
| 9 | 移动端无横向溢出，表单标签与键盘操作正常 | ✅ | `.site-shell{overflow:clip}`、响应式栅格与媒体查询；RFQ 表单每个字段有 `<label>`；跳转链接 `.skip-link` | 
| 10 | 产品/应用/文章形成可抓取内链网络 | ✅ | 产品↔应用↔文章↔证据↔RFQ 闭环（`components/blocks.tsx`）；links:check 报告 0 孤立页 |
| 11 | 构建 / 类型检查 / 内容验证 / 测试全部通过 | ✅ | 见上方命令输出 |
| 12 | 输出仍需公司确认的数据，不猜测补齐 | ✅ | `docs/COMPANY-DATA-TODO.md`；未确认字段留空或 `TODO_COMPANY_VERIFY`，不进入渲染/Schema |

## 结构化数据抽样（产品 `58% 黑巧克力`）

- `Product` 节点：**无 `offers`**（无公开价格，未伪造）；`additionalProperty` = 3（可可含量/形态/脂肪体系，均为已确认属性）；`image` 为绝对 URL；`manufacturer` 引用 `Organization @id`。
- 同页 `@graph` 含 `Organization` + `WebSite` + `BreadcrumbList` + `Product`。
- 产品页 **无** `FAQPage`（页面无可见问答）；文章页 **有** `Article`（真实 `datePublished` 2026-01-15）+ `FAQPage`（页面有真实可见问答）。

## GEO / AI 可发现性

- `robots.txt` 明确允许 `OAI-SearchBot`、`ChatGPT-User`、`Claude-SearchBot`、`Claude-User`；训练类 `GPTBot`/`ClaudeBot` 独立配置（`SITE.allowAiTrainingBots`，默认允许，可关闭）。
- `/llms.txt` 由内容库与路由生成（辅助导航，非主体系）。
- 主体系为标准 HTML + Sitemap + Feed + Schema + 内链 + 真实内容。

## 已知事项 / 后续

- `<img>` 未使用 `next/image`（沿用 V1，Cloudflare 图片优化端点 `/_vinext/image` 已在 worker 就绪；可后续接入 `srcset`）。
- 图片 sitemap、IndexNow / 百度提交、公共产品 API、Agent 询盘接口均已在文档与代码中预留扩展点，按需启用。
- 本轮为“生产架构 + 模板 + 内容模型 + SEO/GEO 基础设施”，产品与文章的全量填充由后续按公司审核资料持续进行（见 `docs/MAINTENANCE.md`）。
