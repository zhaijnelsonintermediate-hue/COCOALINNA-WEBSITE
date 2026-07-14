import { RdManufacturingPage, rdMeta } from "@/components/pages/company";

export const generateMetadata = () => rdMeta("en");
export default function Page() {
  return <RdManufacturingPage locale="en" />;
}
