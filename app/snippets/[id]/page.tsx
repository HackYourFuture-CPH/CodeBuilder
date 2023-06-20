"use client";
import useSWR from "swr";
import { getSnippets } from "../../services/SnippetService";
import { snippetModel } from "../../snippetModel-DB";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

const SnippetsId: React.FC<Props> = ({ params: { id } }) => {
  const { data: snippets } = useSWR<snippetModel>(
    `/api/snippets/${id}`,
    getSnippets
  );

  return <div>Here we have snippets by id</div>;
};
export default SnippetsId;
