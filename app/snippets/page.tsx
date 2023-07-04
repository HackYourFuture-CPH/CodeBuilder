"use client";
import SnippetGallery from "../components/SnippetsGallery";
import { getSnippets } from "../services/SnippetService";
import useSWR, { mutate } from "swr";

const Snippets: React.FC = () => {
  const { data: snippets, error } = useSWR("/api/snippets", getSnippets);

  if (error) {
    return <div>Error fetching snippets</div>;
  }

  if (!snippets) {
    return <div>Loading snippets...</div>;
  }

  return <SnippetGallery snippets={snippets} mutate={mutate} />;
};

export default Snippets;
