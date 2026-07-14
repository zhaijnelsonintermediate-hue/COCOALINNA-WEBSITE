import { AboutPage, aboutMeta } from "@/components/pages/company";

export const generateMetadata = () => aboutMeta("zh");
export default function Page() {
  return <AboutPage locale="zh" />;
}
