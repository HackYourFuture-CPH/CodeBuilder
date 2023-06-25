"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { getSnippets, updateSnippet } from "../services/SnippetService";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { snippetModel } from "../snippetModel-DB";
import CodeEditor from "../components/shared/codeEditor/code-editor";
import UserIcon from "@/app/icons/user";
import { useState } from "react";

interface RouteParams {
  id: string;
}

const SnippetDetails: React.FC = () => {
  const searchParams = useSearchParams();
  const [trigger, setTrigger] = useState("true");
  const snippetId = searchParams?.get("fetchedId");
  console.log(snippetId);

  const { data: snippet, mutate } = useSWR<snippetModel>(
    `/api/snippets/${snippetId}`,
    getSnippets
  );
  const { data: session } = useSession();
  console.log(session);
  const userId = session?.user?.email?.toString();
  // const addToFavorite = async () => {
  //   await fetch(`/api/snippets/${snippetId}`, {
  //     method: "PUT",
  //     credentials: "include",
  //   });
  //   mutate();
  // };

  const addToFavorite = (idSnippet: string) => {
    const users: string[] = [...snippet?.favoriteByIds];
    console.log(users);
    if (!snippet?.favoriteByIds.includes(userId)) {
      const updateFavorites: string[] = [...users, userId];
      console.log(updateFavorites);
      updateSnippet("http://localhost:3000/api/snippets", idSnippet, {
        favoriteByIds: updateFavorites,
      });
      setTrigger("false");
      console.log("was added");
    }
    if (snippet?.favoriteByIds.includes(userId)) {
      const index = users.indexOf(userId);
      console.log(index);
      const updateFavorites = users.splice(index, 1);
      updateSnippet("http://localhost:3000/api/snippets", idSnippet, {
        favoriteByIds: updateFavorites,
      });
      setTrigger("true");
      console.log("was removed");
    }
    // if (snippet?.favoriteByIds.includes(authorId)) {
    //   updatedSnippet?.favoriteByIds.push(authorId);
    //   return console.log("it already include");
    // }
  };
  // const markAsFavorite = async (snippetId: string) => {
  //   console.log("markAsFavorite is working");
  //   console.log(snippetId);
  //   if (session?.user) {
  //     try {
  //       // const updatedSnippet = snippets.find(
  //       //   (snippet: snippetModel) => snippet._id === snippetId
  //       // );
  //       // if (!updatedSnippet) {
  //       //   throw new Error("Snippet not found");
  //       // }
  //       const filteredIds = snippet?.favoriteByIds.filter(
  //         (id) => id !== null && id !== undefined
  //       );
  //       const addOrRemoveIds = filteredIds?.includes(userId ? userId : "")
  //         ? filteredIds.filter((id) => id !== userId)
  //         : [...filteredIds, userId];
  //       const response = await fetch(`/api/snippets/${snippetId}`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ favoriteByIds: addOrRemoveIds }),
  //       });
  //       if (response.ok) {
  //         // const updatedSnippets = snippets.map((snippet: snippetModel) =>
  //         //   snippet._id === snippetId
  //         //     ? { ...snippet, favoriteByIds: addOrRemoveIds }
  //         //     : snippet
  //         // );
  //         // console.log("success");
  //         // setSnippets(updatedSnippets);
  //         setTrigger("true");
  //         console.log(trigger);
  //       } else {
  //         throw new Error("Failed to update favorite status.");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };
  // console.log("done ");

  const normalizeDate = (dateString: Date) => {
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
                <Link href={`/snippet/${snippetId}/edit`}>
                  <button type="button">Edit</button>
                </Link>
                <button type="button" onClick={() => addToFavorite(userId)}>
                  ❤️
                  {/* here will be heart icon */}
                </button>
              </div>
              <UserIcon />
              <p>
                {snippet.authorId} {normalizeDate(new Date(snippet.updatedAt))}
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
