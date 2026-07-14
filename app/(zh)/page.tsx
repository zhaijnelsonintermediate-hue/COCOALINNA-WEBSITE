import { HomePage, homeMeta } from "@/components/pages/HomePage";

export const generateMetadata = () => homeMeta("zh");
export default function Page() {
  return <HomePage locale="zh" />;
}
