import { ContactPage, contactMeta } from "@/components/pages/company";

export const generateMetadata = () => contactMeta("en");
export default function Page() {
  return <ContactPage locale="en" />;
}
