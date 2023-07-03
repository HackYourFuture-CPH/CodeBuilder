"use client";
import useSWR from "swr";
import { snippetModel } from "../snippetModel-DB";
import { getSnippets } from "../services/SnippetService";
import FilterBar from "../components/shared/FilterBar/FilterBar";

const Snippets: React.FC = () => {
  const { data: snippets } = useSWR<snippetModel[]>(
    `/api/snippets/`,
    getSnippets
  );

  if (!snippets) {
    return <div>Loading snippets...</div>;
  }

  return (
    <>
      <FilterBar snippets={snippets} />
      
    </>
  );
};
export default Snippets;
