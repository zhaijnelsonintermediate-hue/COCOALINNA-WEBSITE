# 待公司确认资料清单 / Company data TODO

下列字段目前 **留空或标记 `TODO_COMPANY_VERIFY`**，未作为事实发布。请由对应部门确认后，更新 `data/*.json` 并运行 `npm run content:validate`。**不要凭猜测补齐。**

## 1. 产品参数（`data/products.json`）— 质量部 / 研发部

| 字段 | 现状 | 待确认 |
|---|---|---|
| `cocoaSolidsPercent` | 仅对名称含百分比的产品填写（58/73/35，耐烤 38.5/44 代脂） | 其余产品的可可含量 |
| `fatSystem`（酱料） | 发酵乳/草莓/芒果酱标记 `TODO_COMPANY_VERIFY` | 流金系列各口味的脂肪体系（纯脂/代脂） |
| `ingredientsPublic` / `allergens` | 未填 | 可公开的配料与过敏原信息 |
| `minimumOrderQuantity` | 未填 | 各产品/系列 MOQ |
| `leadTime` | 未填 | 交期 |
| `shelfLife` | 未填 | 保质期 |
| `storageConditions` | 未填 | 储存条件 |
| `sku` / `mpn` | 未填 | 正式货号（利于 Product Schema） |
| `sampleAvailable` | 统一设为 `true` | 确认各产品样品政策 |
| `verifiedBy` / `lastVerifiedAt` | 占位 | 审核人与审核日期 |
| 耐烤豆建议工艺窗口 | 文章中说明“以技术资料为准” | 公开建议耐温/时间范围 |

## 2. 认证（`data/certifications.json`）— 质量部

- ISO 9001 / ISO 22000 / FSSC 22000 / SMETA / 邓白氏：确认 **证书编号** 与 **有效期**（`certificateNumber` / `validUntil`）。
- 是否可公开认证证书扫描件（用于建立可搜索 HTML 落地页 + 文件下载）。

## 3. 证据与获奖（`data/evidence.json`）— 市场部 / 质量部

- Superior Taste Award：确认 **具体获奖产品、年份、星级/水晶奖章** 的可公开表述及公开数据库链接。
- GB/T 19343—2025：确认“主要起草单位”的准确公开措辞。
- 国家标准分类阈值（可可脂/可可固形物/乳固体等具体数值）：以标准正文核对后再在文章中给出精确数字（当前文章刻意未列具体数值）。

## 4. 客户与成功案例（公司介绍 PDF 含品牌名）— 市场部 / 法务

PDF 列出瑞幸、星巴克、Blueglass、旺旺、金丝猴、桃李面包、和路雪、五羊、天润等品牌及“400+ 合作品牌 / 800+ 连锁 / 40000+ 门店 / 100–200+ 食品工厂”。**当前网站未发布具名客户**，仅在需要时可考虑发布 **聚合统计**。请确认：
- 哪些具名客户/案例 **获授权公开**；
- 聚合数字（400+/800+/40000+ 等）是否可作为公开宣传并注明口径。

## 5. 联系与公司信息（`data/company.json` / `lib/site.ts`）— 行政 / 市场部

- 公开业务邮箱（`SITE.contactEmail` 当前为占位 `info@cocoa-linna.com`）。
- RFQ 表单的正式接收渠道（邮箱 / CRM / 企业微信）——当前表单为前端原型，未接后台。
- 各地办公/工厂电话、营业时间、地图坐标（如需 LocalBusiness/地点 Schema）。

## 6. 资料下载（`/resources/`）— 研发部 / 市场部

- 产品技术资料（TDS）、规格书、第三方检测报告的可公开版本 PDF（须含可搜索文本层）。
- 每个下载文件将建立对应 HTML 落地页并标注文件类型、版本、更新时间。

## 7. 运营与监测密钥（`.env`，不入库）— 市场部 / 技术

GSC/GA4、Bing、百度资源平台/百度统计验证码；IndexNow key；百度推送 token。见 `.env.example`。
