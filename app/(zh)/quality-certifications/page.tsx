import { QualityCertificationsPage, qualityMeta } from "@/components/pages/company";

export const generateMetadata = () => qualityMeta("zh");
export default function Page() {
  return <QualityCertificationsPage locale="zh" />;
}
