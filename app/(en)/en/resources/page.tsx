import { ResourcesPage, resourcesMeta } from "@/components/pages/company";

export const generateMetadata = () => resourcesMeta("en");
export default function Page() {
  return <ResourcesPage locale="en" />;
}
