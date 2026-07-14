import { HomePage, homeMeta } from "@/components/pages/HomePage";

export const generateMetadata = () => homeMeta("en");
export default function Page() {
  return <HomePage locale="en" />;
}
