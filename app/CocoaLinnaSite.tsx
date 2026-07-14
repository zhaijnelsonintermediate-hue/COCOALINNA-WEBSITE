"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Lang = "zh" | "en";
type Localized = { zh: string; en: string };

type Product = {
  id: string;
  category: "pure" | "compound" | "sauce" | "functional";
  name: Localized;
  eyebrow: Localized;
  description: Localized;
  applications: Localized;
  image: string;
  imageAlt: Localized;
  tone: string;
};

const copy = {
  zh: {
    nav: [
      ["products", "产品系列"],
      ["solutions", "应用方案"],
      ["evidence", "技术与证据"],
      ["about", "关于我们"],
    ],
    heroEyebrow: "CHOCOLATE EXPERT · SINCE 1995",
    heroTitle: "从原料到应用，\n让巧克力成为\n产品竞争力",
    heroBody:
      "纯脂、代脂、巧克力酱与功能型解决方案，服务烘焙、冰淇淋、饮品与食品工业。",
    heroPrimary: "按应用选产品",
    heroSecondary: "申请样品 / RFQ",
    trust: [
      ["1995", "专业巧克力事业起点"],
      ["GB/T 19343—2025", "主要起草单位"],
      ["三地协同", "上海研发 · 海门制造 · 沈阳研发"],
    ],
    solutionEyebrow: "START WITH THE APPLICATION",
    solutionTitle: "先说你要做什么，\n再选择哪一种巧克力",
    solutionBody:
      "B2B选型不应只从可可含量开始。温度、含水量、设备、货架期和目标口感，都会改变最合适的答案。",
    solutionCta: "查看适配方向",
    productEyebrow: "PRODUCT SYSTEMS",
    productTitle: "四套产品系统，覆盖从配方到呈现",
    productBody:
      "这里展示的是产品入口。正式产品页将继续补充配料、规格、储存、工艺条件、适配设备与可下载技术资料。",
    productTabs: {
      pure: "纯脂巧克力",
      compound: "代脂巧克力",
      sauce: "巧克力酱",
      functional: "功能与装饰",
    },
    productDetail: "查看用途",
    productSample: "申请该产品样品",
    close: "关闭",
    useLabel: "适用场景",
    craftEyebrow: "BEAN TO DESSERT",
    craftTitle: "把原料、感官与工艺放在同一张桌上",
    craftBody:
      "从可可豆筛选、风味评价、配方试验，到生产与应用验证，可可琳纳围绕客户最终产品组织研发，而不是把原料交付作为终点。",
    craftSteps: [
      ["01", "原料与风味", "可可原料、乳品与风味体系共同决定香气、甜感和口融。"],
      ["02", "配方与应用", "围绕烘焙稳定、流动性、脆度、包衣与冷冻场景进行验证。"],
      ["03", "制造与交付", "研发、生产、品质与技术服务协同，推动方案从试样走向量产。"],
    ],
    evidenceEyebrow: "EVIDENCE, NOT SLOGANS",
    evidenceTitle: "让采购、研发与AI都能读懂的证据",
    evidenceBody:
      "把标准、专利、获奖产品和适用边界写成可验证的信息，能缩短客户的初步筛选和技术沟通路径。",
    evidenceItems: [
      [
        "国家标准",
        "GB/T 19343—2025",
        "可可琳纳食品海门有限公司列为《巧克力及巧克力制品、代可可脂巧克力及代可可脂巧克力制品质量要求》主要起草单位。",
      ],
      [
        "公开专利",
        "围绕真实应用问题",
        "公开专利成果覆盖冷冻甜品巧克力、耐烘焙巧克力豆与流动夹心酱等应用方向。",
      ],
      [
        "感官认可",
        "58%黑巧克力",
        "该产品可在公开获奖数据库中查到2023年 Superior Taste Award 记录。",
      ],
    ],
    evidenceNote: "上线前，证书有效期与所有产品参数仍需由公司质量部门逐项确认。",
    historyEyebrow: "COCOA-LINNA SINCE 1995",
    historyTitle: "三十余年，只围绕一件事持续深入",
    historyBody:
      "从沈阳起步，建立上海销售与研发中心、海门生产基地，并持续把研发能力延伸到客户应用现场。",
    history: [
      ["1995", "沈阳华飞食品有限公司成立"],
      ["2001", "上海可可琳纳食品有限公司成立"],
      ["2012", "海门生产基地成立"],
      ["2019", "引进IPCO滴浇巧克力生产线"],
      ["2022", "海门工厂二期竣工投产"],
      ["2025", "上海研发中心持续升级"],
    ],
    knowledgeEyebrow: "APPLICATION KNOWLEDGE",
    knowledgeTitle: "把选型经验写成可以被找到的知识",
    knowledgeBody:
      "应用文章不做泛泛的品牌宣传，而是回答采购、研发和主理人在真实项目中会问的问题。",
    knowledgeRead: "阅读主题",
    knowledgeItems: [
      ["选型基础", "纯脂巧克力与代脂巧克力，应该从哪些条件判断？", "原料定义、口融、调温、成本与应用边界"],
      ["烘焙应用", "耐烤巧克力豆为什么会变形？", "烘焙温度、时间、面团含水量与粒径"],
      ["巧克力酱", "淋面、夹心、甘纳许与注芯，流动性要求有何不同？", "温度、剪切、黏度与终产品口感"],
    ],
    contactEyebrow: "SAMPLE & RFQ",
    contactTitle: "把你的应用条件告诉我们",
    contactBody:
      "提供终产品、工艺温度、设备、目标口感和预计用量，应用团队才能更快缩小试样范围。",
    form: {
      company: "公司名称",
      contact: "联系人",
      contactWay: "手机或邮箱",
      application: "应用场景",
      product: "意向产品",
      volume: "预计用量 / 项目阶段",
      message: "工艺条件与目标口感",
      choose: "请选择",
      submit: "提交样品需求",
      note: "当前为网站交互原型，表单暂不发送至后台。正式上线后可接入邮箱、CRM或企业微信。",
      success: "需求已记录在当前页面原型中。正式接入后台后，这里会自动生成销售线索。",
    },
    applications: ["连锁烘焙", "食品工业", "冰淇淋与冷冻甜品", "饮品与乳品", "休闲食品", "其他"],
    contactInfo: "业务咨询",
    shanghai: "上海销售与研发",
    haimen: "海门制造基地",
    shenyang: "沈阳研发与制造",
    footerTagline: "Bean to Dessert with Love",
    footerLegal: "可可琳纳食品贸易（上海）股份有限公司",
    footerDisclaimer: "本网站为新版视觉与内容原型，最终资料以公司审核版本为准。",
    menu: "打开菜单",
  },
  en: {
    nav: [
      ["products", "Products"],
      ["solutions", "Applications"],
      ["evidence", "Technology & Proof"],
      ["about", "About"],
    ],
    heroEyebrow: "CHOCOLATE EXPERT · SINCE 1995",
    heroTitle: "From ingredient\nto application,\nengineered to compete",
    heroBody:
      "Couverture, compound, chocolate sauces and functional solutions for bakery, ice cream, beverages and food manufacturing.",
    heroPrimary: "Find by application",
    heroSecondary: "Request samples / RFQ",
    trust: [
      ["1995", "Our chocolate journey began"],
      ["GB/T 19343—2025", "Major drafting organization"],
      ["Three-site network", "Shanghai · Haimen · Shenyang"],
    ],
    solutionEyebrow: "START WITH THE APPLICATION",
    solutionTitle: "Tell us what you make.\nThen choose the chocolate.",
    solutionBody:
      "B2B selection is more than cocoa percentage. Temperature, water activity, equipment, shelf life and target texture all shape the right answer.",
    solutionCta: "Explore fit",
    productEyebrow: "PRODUCT SYSTEMS",
    productTitle: "Four systems, from formulation to finish",
    productBody:
      "This is the catalogue entry point. Production pages will add ingredients, pack size, storage, process windows, equipment fit and downloadable technical documents.",
    productTabs: {
      pure: "Couverture",
      compound: "Compound",
      sauce: "Chocolate sauces",
      functional: "Functional & decoration",
    },
    productDetail: "View applications",
    productSample: "Request this sample",
    close: "Close",
    useLabel: "Best for",
    craftEyebrow: "BEAN TO DESSERT",
    craftTitle: "Ingredients, sensory and process — at one table",
    craftBody:
      "From bean selection and sensory mapping to formulation, manufacturing and application trials, Cocoa-Linna organizes R&D around the customer’s finished product.",
    craftSteps: [
      ["01", "Ingredients & flavour", "Cocoa, dairy and flavour systems shape aroma, sweetness and melt."],
      ["02", "Formula & application", "Trials focus on bake stability, flow, snap, coating and frozen use."],
      ["03", "Manufacture & delivery", "R&D, production, quality and service move a sample toward scale-up."],
    ],
    evidenceEyebrow: "EVIDENCE, NOT SLOGANS",
    evidenceTitle: "Proof procurement, R&D and AI can interpret",
    evidenceBody:
      "Structured standards, patents, awards and operating boundaries shorten early supplier screening and technical conversations.",
    evidenceItems: [
      [
        "National standard",
        "GB/T 19343—2025",
        "Cocoa-Linna Food Haimen Co., Ltd. is listed as a major drafting organization for China’s updated chocolate quality standard.",
      ],
      [
        "Published patents",
        "Built around application needs",
        "Public patent records cover chocolate for frozen desserts, bake-stable chips and flowing centre sauces.",
      ],
      [
        "Sensory recognition",
        "58% dark chocolate",
        "A 2023 Superior Taste Award record for this product can be found in the public award database.",
      ],
    ],
    evidenceNote: "Certificate validity and product parameters must still be confirmed by Quality before launch.",
    historyEyebrow: "COCOA-LINNA SINCE 1995",
    historyTitle: "Three decades of focus on chocolate",
    historyBody:
      "From Shenyang to Shanghai and Haimen, the company has kept extending chocolate R&D into customer applications.",
    history: [
      ["1995", "Shenyang Huafei Food Co., Ltd. established"],
      ["2001", "Shanghai Cocoa-Linna Food Co., Ltd. established"],
      ["2012", "Haimen manufacturing base established"],
      ["2019", "IPCO chocolate drop line introduced"],
      ["2022", "Haimen Phase II entered production"],
      ["2025", "Shanghai R&D centre continued to expand"],
    ],
    knowledgeEyebrow: "APPLICATION KNOWLEDGE",
    knowledgeTitle: "Turn selection experience into findable knowledge",
    knowledgeBody:
      "Application articles answer real procurement and R&D questions instead of repeating generic brand claims.",
    knowledgeRead: "Open topic",
    knowledgeItems: [
      ["Selection basics", "Couverture or compound: what conditions should decide?", "Definitions, melt, tempering, cost and application boundaries"],
      ["Bakery", "Why do bake-stable chocolate chips lose their shape?", "Temperature, time, dough moisture and particle size"],
      ["Chocolate sauce", "How should flow differ for glazing, filling, ganache and injection?", "Temperature, shear, viscosity and finished texture"],
    ],
    contactEyebrow: "SAMPLE & RFQ",
    contactTitle: "Tell us your process conditions",
    contactBody:
      "Finished product, temperature, equipment, target texture and expected volume help the applications team narrow the sample set.",
    form: {
      company: "Company",
      contact: "Contact person",
      contactWay: "Phone or email",
      application: "Application",
      product: "Product interest",
      volume: "Expected volume / project stage",
      message: "Process conditions and target texture",
      choose: "Select",
      submit: "Submit sample request",
      note: "This is an interactive prototype; the form is not yet connected. Production can route leads to email, CRM or WeCom.",
      success: "Saved in this prototype. Once connected, this action will create a qualified sales lead.",
    },
    applications: ["Bakery chain", "Food manufacturing", "Ice cream & frozen desserts", "Beverage & dairy", "Snacks", "Other"],
    contactInfo: "Business enquiries",
    shanghai: "Shanghai sales & R&D",
    haimen: "Haimen manufacturing",
    shenyang: "Shenyang R&D & manufacturing",
    footerTagline: "Bean to Dessert with Love",
    footerLegal: "Cocoa-Linna Food Trading (Shanghai) Co., Ltd.",
    footerDisclaimer: "New visual and content prototype. Final information is subject to company approval.",
    menu: "Open menu",
  },
};

const solutions = [
  {
    id: "bakery",
    title: { zh: "烘焙与连锁饼店", en: "Bakery & chains" },
    body: { zh: "夹心、淋面、耐烤、装饰与慕斯", en: "Filling, glazing, baking, decoration and mousse" },
    image: "/company/27ebce6b49d0f39aa80376be02230c2e.jpg",
    size: "wide",
  },
  {
    id: "icecream",
    title: { zh: "冰淇淋与冷冻甜品", en: "Ice cream & frozen desserts" },
    body: { zh: "脆皮、涂层、内馅与冷冻稳定", en: "Shells, coating, inclusions and frozen stability" },
    image: "/company/image-248.webp",
    size: "standard",
  },
  {
    id: "beverage",
    title: { zh: "饮品与乳品", en: "Beverage & dairy" },
    body: { zh: "风味酱、调饮、酸乳与创意融合", en: "Flavour sauces, drinks, yoghurt and fusion" },
    image: "/company/image-595.webp",
    size: "standard",
  },
  {
    id: "industry",
    title: { zh: "食品工业", en: "Food manufacturing" },
    body: { zh: "批次稳定、设备适配与量产支持", en: "Batch consistency, equipment fit and scale-up" },
    image: "/company/image-456.webp",
    size: "wide",
  },
];

const knowledgeDetails = [
  {
    image: "/company/image-277.webp",
    zh: [
      "先依据产品定义与配方目标，确认需要真实可可脂体系还是更强调加工便利的代脂体系。",
      "再核对调温设备、环境温度、包衣或夹心工艺，以及对口融和风味强度的要求。",
      "最终把单价放回终产品成本、成品率和现场操作难度中比较，而不是只比较原料报价。",
    ],
    en: [
      "Start with the legal product definition and formula objective: a true cocoa-butter system or a compound system focused on processing convenience.",
      "Then check tempering capability, ambient conditions, coating or filling process, and the required melt and flavour intensity.",
      "Compare price inside total finished-product cost, yield and line complexity — not as an isolated ingredient quote.",
    ],
  },
  {
    image: "/company/image-110.webp",
    zh: [
      "耐烤表现不是单一温度数字，还受到烘焙时间、面团含水量、糖油体系和巧克力颗粒尺寸影响。",
      "同一颗巧克力豆在曲奇、面包和玛芬中的受热路径不同，应分别做小试并记录形态与风味。",
      "正式产品页需要公开建议工艺窗口，同时明确它不是对所有配方都成立的绝对承诺。",
    ],
    en: [
      "Bake stability is not one temperature number; time, dough moisture, fat-sugar system and chip size all matter.",
      "The same chip follows different heat paths in cookies, bread and muffins, so each matrix needs a recorded trial.",
      "A production data sheet should publish a recommended process window without presenting it as a universal guarantee.",
    ],
  },
  {
    image: "/company/image-595.webp",
    zh: [
      "淋面强调表面流平和凝固后的光泽，夹心更关注切面稳定与储存期间的迁移。",
      "注芯还要匹配泵送、管径和剪切条件；甘纳许则需要把乳脂、水分与巧克力比例一起考虑。",
      "询样时提供操作温度和设备信息，通常比只说‘想要稀一点’更快得到正确样品。",
    ],
    en: [
      "Glazing prioritises levelling and set gloss, while fillings prioritise cut stability and migration during storage.",
      "Injection must also match pumps, pipe diameter and shear; ganache requires dairy fat and water to be considered with chocolate ratio.",
      "Process temperature and equipment data lead to a better sample faster than a request for something simply ‘thinner’.",
    ],
  },
];

const products: Product[] = [
  {
    id: "58-dark",
    category: "pure",
    name: { zh: "浓醇 58% 黑巧克力", en: "Concentrated 58% Dark Chocolate" },
    eyebrow: { zh: "纽扣型 · 纯脂", en: "Buttons · Couverture" },
    description: { zh: "平衡的可可强度与顺滑口融，适合作为多场景基础黑巧。", en: "Balanced cocoa intensity and a smooth melt for versatile dark chocolate applications." },
    applications: { zh: "甘纳许、慕斯、调饮、夹心、手工巧克力", en: "Ganache, mousse, beverages, fillings and confectionery" },
    image: "/company/19ce51588b9340db7e37879ec0fe29c3.jpg",
    imageAlt: { zh: "可可琳纳58%黑巧克力包装", en: "Cocoa-Linna 58% dark chocolate pack" },
    tone: "blue",
  },
  {
    id: "73-dark",
    category: "pure",
    name: { zh: "浓醇 73% 黑巧克力", en: "Concentrated 73% Dark Chocolate" },
    eyebrow: { zh: "纽扣型 · 高可可", en: "Buttons · High cocoa" },
    description: { zh: "更高可可强度，适合突出黑巧主体与控制甜度的产品。", en: "Higher cocoa intensity for recipes that need a pronounced dark profile and restrained sweetness." },
    applications: { zh: "精品烘焙、黑巧甘纳许、糖果、单独调味", en: "Premium bakery, dark ganache, confectionery and flavouring" },
    image: "/company/a97e8607da5e743b8eaeae9167095ecc.jpg",
    imageAlt: { zh: "可可琳纳73%黑巧克力包装", en: "Cocoa-Linna 73% dark chocolate pack" },
    tone: "wine",
  },
  {
    id: "35-milk",
    category: "pure",
    name: { zh: "浓醇 35% 牛奶巧克力", en: "Concentrated 35% Milk Chocolate" },
    eyebrow: { zh: "纽扣型 · 牛奶", en: "Buttons · Milk" },
    description: { zh: "可可与乳香更柔和，适合需要圆润甜感的烘焙和甜品。", en: "A rounded balance of cocoa and dairy for bakery and desserts with a softer profile." },
    applications: { zh: "淋面、慕斯、夹心、奶油调味", en: "Glazing, mousse, filling and cream flavouring" },
    image: "/company/4e9d94649b7d21ec196b10d6a698ee3c.jpg",
    imageAlt: { zh: "可可琳纳35%牛奶巧克力包装", en: "Cocoa-Linna 35% milk chocolate pack" },
    tone: "rose",
  },
  {
    id: "star-white",
    category: "compound",
    name: { zh: "星钻奶香白巧克力", en: "Star Diamond Milky White Compound" },
    eyebrow: { zh: "代脂 · 白巧风味", en: "Compound · White profile" },
    description: { zh: "面向装饰、淋面和常规烘焙应用的实用型白巧风味方案。", en: "A practical white chocolate profile for decoration, coating and everyday bakery use." },
    applications: { zh: "蛋糕装饰、淋面、插件、调色调味", en: "Cake decoration, coating, inserts, colouring and flavouring" },
    image: "/company/720ca0f0a9abda9351a1c40deec23488.jpg",
    imageAlt: { zh: "可可琳纳星钻白巧克力包装", en: "Cocoa-Linna Star Diamond white compound pack" },
    tone: "cream",
  },
  {
    id: "classic-dark",
    category: "compound",
    name: { zh: "经典苦甜黑巧克力", en: "Classic Bittersweet Dark Compound" },
    eyebrow: { zh: "代脂 · 黑巧风味", en: "Compound · Dark profile" },
    description: { zh: "兼顾加工便利与黑巧风味，适合规模化烘焙和装饰。", en: "Combines processing convenience with a dark profile for scaled bakery and decoration." },
    applications: { zh: "包衣、淋面、刨花、铲花、插件", en: "Enrobing, glazing, curls, sculpting and inserts" },
    image: "/company/403e847b8961c91495d8c64fe44c42cf.jpg",
    imageAlt: { zh: "可可琳纳经典代脂黑巧克力包装", en: "Cocoa-Linna classic dark compound pack" },
    tone: "gold",
  },
  {
    id: "curls",
    category: "compound",
    name: { zh: "多巧瑞巧克力花小卷", en: "Chocolate Curls" },
    eyebrow: { zh: "即用型装饰", en: "Ready-to-use decoration" },
    description: { zh: "即开即用的巧克力装饰形态，减少门店现场制作步骤。", en: "A ready-to-use decoration that reduces in-store preparation." },
    applications: { zh: "蛋糕围边、表面装饰、甜品杯、冰淇淋", en: "Cake sides, toppings, dessert cups and ice cream" },
    image: "/company/image-099.webp",
    imageAlt: { zh: "可可琳纳黑巧克力装饰小卷", en: "Cocoa-Linna dark chocolate curls" },
    tone: "cocoa",
  },
  {
    id: "yoghurt-sauce",
    category: "sauce",
    name: { zh: "流金发酵乳味巧克力酱", en: "Fermented Milk Flavoured Chocolate Sauce" },
    eyebrow: { zh: "流金系列 · 5kg", en: "Flowing Gold · 5 kg" },
    description: { zh: "以发酵乳风味扩展白巧酱的酸甜层次与搭配空间。", en: "A fermented dairy profile that adds tang and pairing range to a white chocolate sauce." },
    applications: { zh: "夹心、淋面、慕斯、调饮、烘焙馅料", en: "Filling, glazing, mousse, beverages and bakery fillings" },
    image: "/company/adeecb6a9b3c4cc2d022f62ad86e0a83.jpg",
    imageAlt: { zh: "可可琳纳发酵乳味巧克力酱桶装", en: "Cocoa-Linna fermented milk flavoured sauce tub" },
    tone: "ivory",
  },
  {
    id: "strawberry-sauce",
    category: "sauce",
    name: { zh: "流金草莓味巧克力酱", en: "Strawberry Flavoured Chocolate Sauce" },
    eyebrow: { zh: "流金系列 · 5kg", en: "Flowing Gold · 5 kg" },
    description: { zh: "草莓风味与巧克力质感结合，用于快速构建粉色系甜品。", en: "Strawberry flavour with chocolate texture for fast development of pink dessert concepts." },
    applications: { zh: "夹心、淋面、甜品杯、节令烘焙", en: "Fillings, glazing, dessert cups and seasonal bakery" },
    image: "/company/1d7f4c7d49bd0d9611d018ee7c4532d4.jpg",
    imageAlt: { zh: "可可琳纳草莓味巧克力酱桶装", en: "Cocoa-Linna strawberry flavoured sauce tub" },
    tone: "berry",
  },
  {
    id: "mango-sauce",
    category: "sauce",
    name: { zh: "流金芒果味巧克力酱", en: "Mango Flavoured Chocolate Sauce" },
    eyebrow: { zh: "流金系列 · 5kg", en: "Flowing Gold · 5 kg" },
    description: { zh: "明亮热带果香，适合乳品、冰品和夏季烘焙组合。", en: "A bright tropical profile for dairy, frozen desserts and summer bakery concepts." },
    applications: { zh: "冰淇淋、酸奶、淋面、夹心、饮品", en: "Ice cream, yoghurt, glazing, fillings and beverages" },
    image: "/company/7780b029389655d9037468a783b25895.jpg",
    imageAlt: { zh: "可可琳纳芒果味巧克力酱桶装", en: "Cocoa-Linna mango flavoured sauce tub" },
    tone: "mango",
  },
  {
    id: "bake-stable",
    category: "functional",
    name: { zh: "耐烤巧克力豆", en: "Bake-Stable Chocolate Chips" },
    eyebrow: { zh: "功能型 · 烘焙", en: "Functional · Bakery" },
    description: { zh: "针对烘焙过程中的形态保持与风味释放设计，具体耐温条件以技术资料为准。", en: "Designed for shape retention and flavour release during baking; confirmed process windows belong in the technical sheet." },
    applications: { zh: "曲奇、面包、蛋糕、玛芬、工业烘焙", en: "Cookies, bread, cakes, muffins and industrial bakery" },
    image: "/company/image-110.webp",
    imageAlt: { zh: "可可琳纳耐烤巧克力产品包装", en: "Cocoa-Linna bake-stable chocolate product pack" },
    tone: "orange",
  },
  {
    id: "white-curls",
    category: "functional",
    name: { zh: "白巧克力装饰小卷", en: "White Chocolate Curls" },
    eyebrow: { zh: "装饰型 · 即用", en: "Decoration · Ready-to-use" },
    description: { zh: "轻盈的白巧装饰形态，为门店提供更高效的成品呈现。", en: "A light white chocolate decoration for efficient in-store finishing." },
    applications: { zh: "蛋糕、慕斯、甜品杯、节令产品", en: "Cakes, mousse, dessert cups and seasonal products" },
    image: "/company/image-103.webp",
    imageAlt: { zh: "可可琳纳白巧克力装饰小卷", en: "Cocoa-Linna white chocolate curls" },
    tone: "white",
  },
  {
    id: "flavour-colour",
    category: "functional",
    name: { zh: "风味与色彩定制", en: "Flavour & Colour Customisation" },
    eyebrow: { zh: "定制型 · 创新", en: "Custom · Innovation" },
    description: { zh: "围绕茶、莓果、热带水果与本土风味开发差异化呈现。", en: "Differentiated concepts built around tea, berries, tropical fruit and local flavour cues." },
    applications: { zh: "新品开发、节令限定、品牌联名、终端巧克力", en: "New products, seasonal editions, collaborations and consumer chocolate" },
    image: "/company/image-594.webp",
    imageAlt: { zh: "可可琳纳多色风味巧克力", en: "Cocoa-Linna coloured flavoured chocolate" },
    tone: "green",
  },
];

function local(value: Localized, lang: Lang) {
  return value[lang];
}

export default function CocoaLinnaSite() {
  const [lang, setLang] = useState<Lang>("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Product["category"]>("pure");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedKnowledge, setSelectedKnowledge] = useState<number | null>(null);
  const [inquiryProduct, setInquiryProduct] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    document.body.style.overflow = selectedProduct || selectedKnowledge !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct, selectedKnowledge]);

  const visibleProducts = useMemo(
    () => products.filter((product) => product.category === activeCategory),
    [activeCategory],
  );

  function jumpTo(id: string) {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function requestProduct(product: Product) {
    setInquiryProduct(product.id);
    setSelectedProduct(null);
    window.setTimeout(() => jumpTo("contact"), 60);
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Cocoa-Linna home">
          <span>COCOA-LINNA</span>
          <small>可 可 琳 纳</small>
        </a>
        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Primary navigation">
          {t.nav.map(([id, label]) => (
            <button key={id} type="button" onClick={() => jumpTo(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Language selector">
            <button className={lang === "zh" ? "active" : ""} type="button" onClick={() => setLang("zh")}>中文</button>
            <span>/</span>
            <button className={lang === "en" ? "active" : ""} type="button" onClick={() => setLang("en")}>EN</button>
          </div>
          <button className="sample-mini" type="button" onClick={() => jumpTo("contact")}>RFQ <span>↗</span></button>
          <button
            className={menuOpen ? "menu-button active" : "menu-button"}
            type="button"
            aria-label={t.menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="hero-body">{t.heroBody}</p>
          <div className="hero-actions">
            <button className="button button-dark" type="button" onClick={() => jumpTo("solutions")}>{t.heroPrimary}<span>↘</span></button>
            <button className="button button-line" type="button" onClick={() => jumpTo("contact")}>{t.heroSecondary}<span>↗</span></button>
          </div>
        </div>
        <div className="hero-visual">
          <img src="/company/image-277.webp" alt={lang === "zh" ? "可可豆与黑巧克力" : "Cocoa beans and dark chocolate"} fetchPriority="high" decoding="async" />
          <div className="hero-visual-label">
            <span>01</span>
            <p>{lang === "zh" ? "可可原料与巧克力应用" : "Cocoa ingredients & applications"}</p>
          </div>
        </div>
        <div className="trust-strip">
          {t.trust.map(([value, label], index) => (
            <div className="trust-item" key={value}>
              <span>0{index + 1}</span>
              <strong>{value}</strong>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section solutions-section" id="solutions">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">{t.solutionEyebrow}</p>
            <h2>{t.solutionTitle.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>
          </div>
          <p>{t.solutionBody}</p>
        </div>
        <div className="solution-grid">
          {solutions.map((solution, index) => (
            <article className={`solution-card ${solution.size}`} key={solution.id}>
              <img src={solution.image} alt={local(solution.title, lang)} loading="lazy" decoding="async" />
              <div className="solution-overlay" />
              <div className="solution-index">0{index + 1}</div>
              <div className="solution-copy">
                <h3>{local(solution.title, lang)}</h3>
                <p>{local(solution.body, lang)}</p>
                <button type="button" onClick={() => jumpTo("products")}>{t.solutionCta}<span>↘</span></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section products-section" id="products">
        <div className="section-heading product-heading">
          <p className="eyebrow">{t.productEyebrow}</p>
          <h2>{t.productTitle}</h2>
          <p>{t.productBody}</p>
        </div>
        <div className="product-tabs" role="tablist" aria-label={t.productEyebrow}>
          {(Object.keys(t.productTabs) as Product["category"][]).map((category, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              className={activeCategory === category ? "active" : ""}
              key={category}
              onClick={() => setActiveCategory(category)}
            >
              <span>0{index + 1}</span>{t.productTabs[category]}
            </button>
          ))}
        </div>
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className={`product-card tone-${product.tone}`} key={product.id}>
              <div className="product-image">
                <img src={product.image} alt={local(product.imageAlt, lang)} loading="lazy" decoding="async" />
              </div>
              <div className="product-copy">
                <p>{local(product.eyebrow, lang)}</p>
                <h3>{local(product.name, lang)}</h3>
                <span>{local(product.description, lang)}</span>
                <button type="button" onClick={() => setSelectedProduct(product)}>{t.productDetail}<b>↗</b></button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="craft-section" id="about">
        <div className="craft-copy">
          <p className="eyebrow light">{t.craftEyebrow}</p>
          <h2>{t.craftTitle}</h2>
          <p className="craft-lead">{t.craftBody}</p>
          <div className="craft-steps">
            {t.craftSteps.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
        <div className="craft-gallery">
          <figure className="gallery-bean"><img src="/company/image-001.webp" alt={lang === "zh" ? "可可果" : "Cocoa pods"} loading="lazy" decoding="async" /><figcaption>{lang === "zh" ? "原料" : "Ingredients"}</figcaption></figure>
          <figure className="gallery-lab"><img src="/company/image-372.webp" alt={lang === "zh" ? "研发人员进行可可豆感官评价" : "R&D sensory evaluation of cocoa beans"} loading="lazy" decoding="async" /><figcaption>{lang === "zh" ? "研发" : "R&D"}</figcaption></figure>
          <figure className="gallery-taste"><img src="/company/image-375.webp" alt={lang === "zh" ? "巧克力样品品评" : "Chocolate sample evaluation"} loading="lazy" decoding="async" /><figcaption>{lang === "zh" ? "品评" : "Sensory"}</figcaption></figure>
          <figure className="gallery-line"><img src="/company/image-456.webp" alt={lang === "zh" ? "巧克力生产线" : "Chocolate production line"} loading="lazy" decoding="async" /><figcaption>{lang === "zh" ? "制造" : "Manufacturing"}</figcaption></figure>
        </div>
      </section>

      <section className="section evidence-section" id="evidence">
        <div className="evidence-intro">
          <p className="eyebrow">{t.evidenceEyebrow}</p>
          <h2>{t.evidenceTitle}</h2>
          <p>{t.evidenceBody}</p>
        </div>
        <div className="evidence-layout">
          <div className="standard-visual">
            <img src="/company/image-537.webp" alt={lang === "zh" ? "可可琳纳参与巧克力国家标准起草资料" : "Cocoa-Linna participation in China's chocolate standard"} loading="lazy" decoding="async" />
            <span>{lang === "zh" ? "公司资料原图" : "Company source image"}</span>
          </div>
          <div className="evidence-list">
            {t.evidenceItems.map(([label, title, body], index) => (
              <article key={label}>
                <span>0{index + 1}</span>
                <div><p>{label}</p><h3>{title}</h3><div>{body}</div></div>
              </article>
            ))}
          </div>
        </div>
        <p className="evidence-note">* {t.evidenceNote}</p>
      </section>

      <section className="history-section">
        <div className="history-photo">
          <img src="/company/image-536.webp" alt={lang === "zh" ? "可可豆与可可粉" : "Cocoa beans and cocoa powder"} loading="lazy" decoding="async" />
        </div>
        <div className="history-content">
          <p className="eyebrow light">{t.historyEyebrow}</p>
          <h2>{t.historyTitle}</h2>
          <p>{t.historyBody}</p>
          <div className="timeline">
            {t.history.map(([year, event]) => (
              <article key={year}><strong>{year}</strong><span>{event}</span></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section knowledge-section">
        <div className="section-heading split-heading knowledge-heading">
          <div><p className="eyebrow">{t.knowledgeEyebrow}</p><h2>{t.knowledgeTitle}</h2></div>
          <p>{t.knowledgeBody}</p>
        </div>
        <div className="knowledge-grid">
          {t.knowledgeItems.map(([tag, title, body], index) => (
            <article key={title}>
              <div className="knowledge-number">0{index + 1}</div>
              <p>{tag}</p>
              <h3>{title}</h3>
              <span>{body}</span>
              <button type="button" onClick={() => setSelectedKnowledge(index)}>{t.knowledgeRead}<b>↗</b></button>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow light">{t.contactEyebrow}</p>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
          <div className="contact-image"><img src="/company/image-566.webp" alt={lang === "zh" ? "巧克力与坚果产品应用" : "Chocolate and nut application"} loading="lazy" decoding="async" /></div>
          <div className="contact-details">
            <p>{t.contactInfo}</p><a href="tel:+862132521650">+86 21 3252 1650</a>
            <span>{t.shanghai} · {lang === "zh" ? "上海市普陀区金沙江路2009弄1号201室" : "Room 201, No. 1, Lane 2009 Jinshajiang Road, Shanghai"}</span>
          </div>
        </div>
        <form className="rfq-form" onSubmit={submitForm}>
          <div className="form-row">
            <label><span>{t.form.company}</span><input required name="company" autoComplete="organization" /></label>
            <label><span>{t.form.contact}</span><input required name="contact" autoComplete="name" /></label>
          </div>
          <label><span>{t.form.contactWay}</span><input required name="contactWay" autoComplete="email" /></label>
          <div className="form-row">
            <label><span>{t.form.application}</span><select required defaultValue=""><option value="" disabled>{t.form.choose}</option>{t.applications.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label><span>{t.form.product}</span><select value={inquiryProduct} onChange={(event) => setInquiryProduct(event.target.value)}><option value="">{t.form.choose}</option>{products.map((product) => <option value={product.id} key={product.id}>{local(product.name, lang)}</option>)}</select></label>
          </div>
          <label><span>{t.form.volume}</span><input name="volume" /></label>
          <label><span>{t.form.message}</span><textarea required name="message" rows={4} /></label>
          <button className="button button-copper" type="submit">{t.form.submit}<span>↗</span></button>
          <p className="form-note">{t.form.note}</p>
          {submitted && <div className="form-success" role="status">{t.form.success}</div>}
        </form>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><strong>COCOA-LINNA</strong><span>可 可 琳 纳</span></div>
        <p>{t.footerTagline}</p>
        <div className="footer-locations"><span>{t.shanghai}</span><span>{t.haimen}</span><span>{t.shenyang}</span></div>
        <div className="footer-bottom"><span>© 2026 {t.footerLegal}</span><span>{t.footerDisclaimer}</span></div>
      </footer>

      {selectedKnowledge !== null && (
        <div className="product-modal knowledge-modal" role="dialog" aria-modal="true" aria-labelledby="knowledge-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedKnowledge(null); }}>
          <article>
            <button className="modal-close" type="button" onClick={() => setSelectedKnowledge(null)} aria-label={t.close}>×</button>
            <div className="knowledge-modal-image"><img src={knowledgeDetails[selectedKnowledge].image} alt={t.knowledgeItems[selectedKnowledge][0]} decoding="async" /></div>
            <div className="modal-copy">
              <p>{t.knowledgeItems[selectedKnowledge][0]}</p>
              <h2 id="knowledge-modal-title">{t.knowledgeItems[selectedKnowledge][1]}</h2>
              <div>{t.knowledgeItems[selectedKnowledge][2]}</div>
              <ul>
                {knowledgeDetails[selectedKnowledge][lang].map((point) => <li key={point}>{point}</li>)}
              </ul>
              <button className="button button-dark" type="button" onClick={() => { setSelectedKnowledge(null); window.setTimeout(() => jumpTo("contact"), 60); }}>{lang === "zh" ? "围绕此问题咨询" : "Discuss this question"}<b>↗</b></button>
            </div>
          </article>
        </div>
      )}

      {selectedProduct && (
        <div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}>
          <article>
            <button className="modal-close" type="button" onClick={() => setSelectedProduct(null)} aria-label={t.close}>×</button>
            <div className={`modal-image tone-${selectedProduct.tone}`}><img src={selectedProduct.image} alt={local(selectedProduct.imageAlt, lang)} decoding="async" /></div>
            <div className="modal-copy">
              <p>{local(selectedProduct.eyebrow, lang)}</p>
              <h2 id="product-modal-title">{local(selectedProduct.name, lang)}</h2>
              <div>{local(selectedProduct.description, lang)}</div>
              <span>{t.useLabel}</span>
              <strong>{local(selectedProduct.applications, lang)}</strong>
              <button className="button button-dark" type="button" onClick={() => requestProduct(selectedProduct)}>{t.productSample}<b>↗</b></button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
