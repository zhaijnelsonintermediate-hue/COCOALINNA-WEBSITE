import { SolutionsIndex, solutionsMeta } from "@/components/pages/SolutionsIndex";

export const generateMetadata = () => solutionsMeta("zh");
export default function Page() {
  return <SolutionsIndex locale="zh" />;
}
