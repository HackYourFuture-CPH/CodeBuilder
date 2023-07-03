"use client";
import useSWR from "swr";
import SnippetGallery from "../components/SnippetsGallery";
import { snippetModel } from "../snippetModel-DB";
import { getSnippets } from "../services/SnippetService";

const Snippets: React.FC = () => {
  const {
    data: snippetsData,
    mutate,
    error: snippetError,
    isLoading: isLoadingSnippets,
  } = useSWR<snippetModel[]>("/api/snippets", getSnippets);

  if (snippetError) {
    return <div>Error fetching data</div>;
  }

  if (isLoadingSnippets) {
    return <div>Loading...</div>;
  }

  return <SnippetGallery filteredSnippets={snippetsData!} mutate={mutate} />;
};
export default Snippets;
