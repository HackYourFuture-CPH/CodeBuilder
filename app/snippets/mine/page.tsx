"use client";
import SnippetGallery from "@/app/components/SnippetsGallery";
import { getSnippets } from "@/app/services/SnippetService";
import { snippetModel } from "@/app/snippetModel-DB";
import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";

const Snippets: React.FC = () => {
  const { data: snippets } = useSWR("/api/snippets", getSnippets);
  const { data: session } = useSession();
  const userId: any = session?.user?.email;

  if (!snippets) {
    return <div>Loading snippets...</div>;
  }

  const filteredSnippets = snippets.filter(
    (snippet: snippetModel) => snippet.authorId === userId
  );

  return <SnippetGallery snippets={filteredSnippets} mutate={mutate} />;
};

export default Snippets;
