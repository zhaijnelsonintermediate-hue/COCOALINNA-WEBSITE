import { ProductDetail, productMeta, productParams } from "@/components/pages/ProductDetail";

export function generateStaticParams() {
  return productParams();
}
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  return productMeta("en", category, slug);
}
export default async function Page({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  return <ProductDetail locale="en" category={category} slug={slug} />;
}
