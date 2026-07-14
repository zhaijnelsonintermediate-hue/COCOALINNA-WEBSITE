import { ProductCategoryPage, productCategoryMeta, productCategoryParams } from "@/components/pages/ProductCategoryPage";

export function generateStaticParams() {
  return productCategoryParams();
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return productCategoryMeta("en", category);
}
export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <ProductCategoryPage locale="en" category={category} />;
}
