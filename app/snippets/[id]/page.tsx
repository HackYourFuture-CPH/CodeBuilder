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

  console.log(snippets);
  return (
    <>
      <div>Here we have snippets by id</div>
      {snippets ? (
        <div>
          <h1>{snippets.title}</h1>
          <p>{snippets.description}</p>
          <p>{snippets.snippetCode}</p>
          <p>{snippets.createdAt}</p>
          <p>{snippets.updatedAt}</p>
          <p>{snippets.authorId}</p>
          <Link href={`/snippets/${id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
export default SnippetsId;
