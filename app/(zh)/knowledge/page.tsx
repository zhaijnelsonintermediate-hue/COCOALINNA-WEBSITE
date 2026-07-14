import { KnowledgeIndex, knowledgeMeta } from "@/components/pages/KnowledgeIndex";

export const generateMetadata = () => knowledgeMeta("zh");
export default function Page() {
  return <KnowledgeIndex locale="zh" />;
}
