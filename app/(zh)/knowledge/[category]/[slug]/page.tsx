import { ArticlePage, articleMeta, articleParams } from "@/components/pages/ArticlePage";

export function generateStaticParams() {
  return articleParams();
}
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  return articleMeta("zh", category, slug);
}
export default async function Page({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  return <ArticlePage locale="zh" category={category} slug={slug} />;
}
