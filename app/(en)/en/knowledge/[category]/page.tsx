import { KnowledgeCategoryPage, knowledgeCategoryMeta, knowledgeCategoryParams } from "@/components/pages/KnowledgeCategoryPage";

export function generateStaticParams() {
  return knowledgeCategoryParams();
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return knowledgeCategoryMeta("en", category);
}
export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <KnowledgeCategoryPage locale="en" category={category} />;
}
