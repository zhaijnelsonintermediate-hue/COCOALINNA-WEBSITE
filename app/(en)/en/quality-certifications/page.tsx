import { QualityCertificationsPage, qualityMeta } from "@/components/pages/company";

export const generateMetadata = () => qualityMeta("en");
export default function Page() {
  return <QualityCertificationsPage locale="en" />;
}
