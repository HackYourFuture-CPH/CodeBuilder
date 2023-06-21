"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { getSnippets, updateSnippet } from "../../services/SnippetService";
import { snippetModel } from "../../snippetModel-DB";
import CodeEditor from "../../components/shared/codeEditor/code-editor";
import UserIcon from "@/app/icons/user";

interface RouteParams {
  id: string;
}

const SnippetDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const fetchedId = searchParams?.get("fetchedId");

  const { data: snippet } = useSWR<snippetModel>(
    `/api/snippets/${fetchedId}`,
    getSnippets
  );

  console.log(snippet);

  // const addToFavorite = (authorId: string) => {
  //   snippet?.favoriteByIds.push(authorId);
  //   const updatedSnippet = {
  //     ...snippet,
  //   };

  //   if (snippet?.favoriteByIds.includes(authorId)) {
  //     return console.log("it already include");
  //   }
  //   updateSnippet(`/api/snippet/${id}`, id, updatedSnippet);
  //   console.log("done ");
  // };

  const normalizeDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <>
      {snippet ? (
        <div>
          <div>
            <div>
              <h1>{snippet.title}</h1>
              <ul>
                {snippet.tags.map((tag: string) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p>{snippet.description}</p>
            </div>
            <div>
              <div>
                {" "}
                <Link href={`/snippet/${fetchedId}/edit`}>
                  <button type="button">Edit</button>
                </Link>
                <button
                  type="button"
                  // onClick={() => addToFavorite(snippet.authorId)}
                >
                  ❤️
                  {/* here will be heart icon */}
                </button>
              </div>
              <UserIcon />
              <p>
                {snippet.authorId} {normalizeDate(snippet.updatedAt)}
              </p>
            </div>
          </div>
          <CodeEditor
            initialValue={snippet.snippetCode}
            readOnly={true}
            tags={snippet.tags}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
export default SnippetDetails;
