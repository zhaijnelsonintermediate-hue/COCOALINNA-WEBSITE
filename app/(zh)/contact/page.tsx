import { ContactPage, contactMeta } from "@/components/pages/company";

export const generateMetadata = () => contactMeta("zh");
export default function Page() {
  return <ContactPage locale="zh" />;
}
