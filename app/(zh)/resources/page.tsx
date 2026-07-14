import { ResourcesPage, resourcesMeta } from "@/components/pages/company";

export const generateMetadata = () => resourcesMeta("zh");
export default function Page() {
  return <ResourcesPage locale="zh" />;
}
