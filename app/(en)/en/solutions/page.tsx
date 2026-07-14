import { SolutionsIndex, solutionsMeta } from "@/components/pages/SolutionsIndex";

export const generateMetadata = () => solutionsMeta("en");
export default function Page() {
  return <SolutionsIndex locale="en" />;
}
