"use client";
import useSWR from "swr";
import { getSnippets } from "../services/SnippetService";
import { snippetModel } from "../snippetModel-DB";
import Link from "next/link";

const UserId: React.FC = () => {
  const { data: snippets } = useSWR<snippetModel[]>(
    "/api/snippets",
    getSnippets
  );

  return (
    <>
      <p>
        This component(route) we will use as the page after the user logs in
        Here we gonna show all snippets, created by logged in user
      </p>
      <ul>
        {snippets ? (
          snippets.map((snippet) => (
            <li key={snippet._id}>
              <Link href={`/snippets/${snippet._id}`}>
                <h2>{snippet.title}</h2>
                <p>{snippet._id}</p>
                <p>{snippet.snippetCode}</p>
              </Link>
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </>
  );
};
export default UserId;
