import { RdManufacturingPage, rdMeta } from "@/components/pages/company";

export const generateMetadata = () => rdMeta("zh");
export default function Page() {
  return <RdManufacturingPage locale="zh" />;
}
