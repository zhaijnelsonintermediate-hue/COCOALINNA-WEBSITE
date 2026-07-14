import { AboutPage, aboutMeta } from "@/components/pages/company";

export const generateMetadata = () => aboutMeta("en");
export default function Page() {
  return <AboutPage locale="en" />;
}
