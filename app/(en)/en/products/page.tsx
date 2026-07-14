import { ProductsIndex, productsMeta } from "@/components/pages/ProductsIndex";

export const generateMetadata = () => productsMeta("en");
export default function Page() {
  return <ProductsIndex locale="en" />;
}
