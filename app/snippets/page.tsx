"use client";
import SnippetGallery from "../components/SnippetsGallery";
import useSWR from "swr";
import { snippetModel } from "../snippetModel-DB";
import { getSnippets } from "../services/SnippetService";
import FilterBar from "../components/shared/FilterBar/FilterBar";

const Snippets: React.FC = () => {
  const { data: snippets } = useSWR<snippetModel[]>(
    `/api/snippets/`,
    getSnippets
  );
  return (
    <>
      <FilterBar snippets={snippets} />
      {/* <SnippetGallery /> */}
    </>
  );
};
export default Snippets;
