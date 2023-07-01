"use client";
import useSWR from "swr";
import { getSnippets } from "../services/SnippetService";
import { snippetModel } from "../snippetModel-DB";
import SnippetGallery from "../components/shared/tags/Tag";
import FilterBar from "../components/shared/FilterBar/FilterBar";




const UserId: React.FC = () => {
  const { data: snippets } = useSWR<snippetModel[]>(
    "/api/snippets",
    getSnippets
  );

  return (
    <>
      <FilterBar />
      <SnippetGallery />
      {/* <ul>
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
      </ul> */}
    </>
  );
};
export default UserId;
