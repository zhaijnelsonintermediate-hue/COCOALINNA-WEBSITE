# 内容模型 / Content model

单一事实来源为 Git 版本控制的文件型内容库。**共享技术事实** 放在 `data/*.json`（中英文只维护一份参数）；**营销文案 / 解释 / FAQ / 正文** 以中英字段并列存放。类型定义见 `lib/types.ts`，访问层见 `lib/content.ts`，校验见 `scripts/content-validate.mjs`。

## 与 CMS 的关系（实现说明）

Cloudflare Workers 运行时无文件系统，内容必须在构建期静态打包。故采用 **单文件集合**（`data/products.json` 等数组）而非每产品一个文件——语义等价于 `products/*.json`，但保证边缘构建可靠。`lib/content.ts` 即适配层：未来接入 Headless CMS 时，只需替换该层的数据来源，页面模板无需改动。

## 状态与可见性

每条记录含 `status: verified | pending | internal`。`lib/content.ts` 只向公共页面暴露 **`verified`** 记录（`publicProducts / publicApplications / publicArticles`）。`new:product` / `new:article` 脚手架默认写入 `pending`，须经审核后手动改为 `verified` 才会上线。

## 不可违背原则

- 不编造产品参数、认证、获奖、客户、产能、价格、MOQ、交期、专利或检测结论。
- 未经公司确认的字段留空 / 省略 / 标记 `TODO_COMPANY_VERIFY`，不渲染为事实。
- 没有公开价格时，`Product` JSON-LD **不输出** `Offer`/价格/库存。
- 稳定 `id` + `translationKey` 连接中英文内容。

## 产品 `data/products.json`（`lib/types.ts` → `Product`）

预留字段：`id, slug, status, category, translationKey, sku?, mpn?, brand, manufacturerLegalName, name, eyebrow, shortDescription, productForm, cocoaSolidsPercent?, fatSystem, flavorProfile?, applicationTags[], recommendedApplications, attributes[], packagingOptions[], minimumOrderQuantity?, sampleAvailable, leadTime?, shelfLife?, storageConditions?, certificationIds[], relatedArticleIds[], images[], evidenceIds[], tone, lastVerifiedAt?, verifiedBy?, publishedAt, updatedAt`。

- `attributes[]`：`{ key, label{zh,en}, value{zh,en} }`，仅放 **已确认** 的公开技术属性；同时用于 `Product.additionalProperty`。值为 `TODO_COMPANY_VERIFY` 的属性不渲染、不进 Schema。
- `images[]`：`{ src, alt{zh,en}, width, height }`（强制 alt 与宽高，避免 CLS）。
- 详情页模块：一句话定义、关键参数表、适用应用、包装、适用认证、依据来源、相关应用/文章、样品/RFQ 入口、最后审核说明。

## 应用 `data/applications.json`（`Application`）

`slug, status, translationKey, title, eyebrow, summary, image, finishedProducts, processNotes, commonIssues, trialInputs, recommendedProductIds[], relatedArticleIds[]`。回答采购/研发问题（最终产品、典型工艺、常见失败与原因、试样需提供条件、推荐产品与理由），与产品/文章互链形成主题集群。

## 文章 `data/articles.json`（`Article`）

`id, slug, category, translationKey, status, title, summary, buyerQuestion, author, technicalReviewer?, relatedProductIds[], relatedApplicationIds[], evidence[], faq[], body[], heroImage?, publishedAt, updatedAt, lastReviewedAt?`。

- `body[]`：区块联合类型 `p | h2 | list | note`，服务端渲染为语义 HTML。
- 发布流程 `draft(pending) → review → published(verified)`；AI 可起草，发布前需公司确认。

## 企业 / 认证 / 证据 / 分类

- `data/company.json`：法定名称、成立年份、三地布局、发展历程、统计数据（均来自公司资料）。
- `data/certifications.json`：ISO 9001 / ISO 22000 / FSSC 22000 / SMETA / 邓白氏；证书编号与有效期为 `TODO`。
- `data/evidence.json`：国家标准起草、Superior Taste Award、全链路品控（109 道/2 CCP/19 步过滤）。
- `data/taxonomy.json`：产品与知识分类的标题、定义、选择条件。

## 校验规则（`npm run content:validate`，CI 应阻断错误）

唯一 `id`/`slug`；必填中英文字段非空；分类/关联 id/认证/证据/应用标签的引用完整性；图片必须有 alt（中英）与宽高；日期为合法 ISO；`cocoaSolidsPercent` 范围合法；`TODO_COMPANY_VERIFY` 记为警告。
