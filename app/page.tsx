import CocoaLinnaSite from "./CocoaLinnaSite";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "可可琳纳",
  alternateName: "COCOA-LINNA",
  url: "https://www.cocoa-linna.com/",
  logo: "https://www.cocoa-linna.com/i/i2.jpg",
  foundingDate: "1995",
  description:
    "面向烘焙、冰淇淋、饮品与食品工业提供纯脂巧克力、代脂巧克力、巧克力酱和功能型巧克力应用解决方案。",
  telephone: "+86-21-32521650",
  address: {
    "@type": "PostalAddress",
    streetAddress: "金沙江路2009弄1号201室",
    addressLocality: "上海市",
    addressCountry: "CN",
  },
  department: [
    {
      "@type": "Organization",
      name: "可可琳纳食品海门有限公司",
      address: {
        "@type": "PostalAddress",
        streetAddress: "包场镇发展大道2518号",
        addressLocality: "南通市海门区",
        addressCountry: "CN",
      },
    },
    {
      "@type": "Organization",
      name: "沈阳可可琳纳食品有限公司",
      address: {
        "@type": "PostalAddress",
        streetAddress: "黄河北大街206-600号",
        addressLocality: "沈阳市",
        addressCountry: "CN",
      },
    },
  ],
};

const catalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "可可琳纳巧克力产品系列",
  itemListElement: [
    "纯脂巧克力",
    "代脂巧克力",
    "巧克力酱",
    "耐烤巧克力豆与装饰巧克力",
  ].map((name, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }}
      />
      <CocoaLinnaSite />
    </>
  );
}
