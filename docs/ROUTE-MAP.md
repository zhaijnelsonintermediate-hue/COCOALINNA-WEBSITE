# 路由图 / Route map

URL 规则：中文（默认语言）在根路径；英文在 `/en`；页面路径 **无尾斜杠**（根为 `/`），带尾斜杠的变体 308 重定向到规范 URL；静态资源（`/company/*` 等）因此不会被重定向。分类/文章 slug 为稳定小写 ASCII + 连字符。每组中英文页面拥有独立自引用 canonical、双向 `hreflang="zh-CN"/"en"` 与 `x-default`（指向中文）。下表 URL 省略尾斜杠。

## 页面路由

| 用途 | 中文 (zh-CN) | 英文 (en) | 渲染 | 数据来源 |
|---|---|---|---|---|
| 首页 | `/` | `/en` | SSR | company/products/applications/articles |
| 产品中心 | `/products` | `/en/products` | SSR | taxonomy + products |
| 产品分类 | `/products/[category]` | `/en/products/[category]` | SSG（4） | taxonomy + products |
| 产品详情 | `/products/[category]/[slug]` | `/en/products/[category]/[slug]` | SSG（12） | products |
| 应用方案 | `/solutions` | `/en/solutions` | SSR | applications |
| 应用详情 | `/solutions/[slug]` | `/en/solutions/[slug]` | SSG（4） | applications |
| 知识中心 | `/knowledge` | `/en/knowledge` | SSR | taxonomy + articles |
| 知识分类 | `/knowledge/[category]` | `/en/knowledge/[category]` | SSG（4） | taxonomy + articles |
| 技术文章 | `/knowledge/[category]/[slug]` | `/en/knowledge/[category]/[slug]` | SSG（4） | articles |
| 关于我们 | `/about` | `/en/about` | SSR | company |
| 研发与制造 | `/rd-manufacturing` | `/en/rd-manufacturing` | SSR | company/evidence |
| 质量与认证 | `/quality-certifications` | `/en/quality-certifications` | SSR | certifications/evidence |
| 资料下载 | `/resources` | `/en/resources` | SSR | （待公司提供下载文件） |
| 联系 / RFQ | `/contact` | `/en/contact` | SSR | company/products |

共 **37 个逻辑页面 × 2 语言 = 74 个可索引 URL**（与 sitemap 一致）。

## 分类 slug（稳定，不随标题变化）

- 产品：`couverture`、`compound-chocolate`、`chocolate-sauce`、`functional-decoration`
- 应用：`bakery`、`ice-cream-frozen-dessert`、`beverage-dairy`、`food-manufacturing`
- 知识：`selection-guides`、`application-guides`、`standards-quality`、`rd-insights`

## 非页面端点（由 Worker 直接返回，200）

| 路径 | 内容 |
|---|---|
| `/robots.txt` | 搜索/AI 爬虫规则 + Sitemap 声明 |
| `/sitemap.xml` | 74 个 URL，含 `xhtml:link` hreflang 备用 |
| `/feed.xml` | Atom：已发布文章（中英文） |
| `/llms.txt` | 由内容库生成的 AI 导航文件 |

## noindex（默认 `noindex,follow`，本轮暂无实体页面，规则已预留）

站内搜索结果、组合筛选参数页、表单成功页、预览页、草稿页、重复打印页。管理页/内部 API/草稿/测试路径在 `robots.txt` 中 `Disallow`。`buildMetadata({ noindex: true })` 可对任意页面输出 `noindex,follow`。
