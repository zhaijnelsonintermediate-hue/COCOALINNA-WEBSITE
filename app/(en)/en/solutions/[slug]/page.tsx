import { SolutionDetail, solutionMeta, solutionParams } from "@/components/pages/SolutionDetail";

export function generateStaticParams() {
  return solutionParams();
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return solutionMeta("en", slug);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SolutionDetail locale="en" slug={slug} />;
}
