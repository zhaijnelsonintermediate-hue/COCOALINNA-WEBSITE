import { ProductsIndex, productsMeta } from "@/components/pages/ProductsIndex";

export const generateMetadata = () => productsMeta("zh");
export default function Page() {
  return <ProductsIndex locale="zh" />;
}
