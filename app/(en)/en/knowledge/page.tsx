import { KnowledgeIndex, knowledgeMeta } from "@/components/pages/KnowledgeIndex";

export const generateMetadata = () => knowledgeMeta("en");
export default function Page() {
  return <KnowledgeIndex locale="en" />;
}
