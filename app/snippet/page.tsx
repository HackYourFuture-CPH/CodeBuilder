"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { getSnippets, updateSnippet } from "../services/SnippetService";
import { useSession } from "next-auth/react";
import { snippetModel } from "../snippetModel-DB";
import CodeEditor from "../components/shared/codeEditor/code-editor";
import { useState } from "react";
import "./page.css";

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

  const addToFavorite = (idSnippet: string) => {
    const users: string[] = [...(snippet?.favoriteByIds || [])];
    console.log(users);
    if (userId && !snippet?.favoriteByIds.includes(userId)) {
      const updateFavorites: string[] = [...users, userId];
      console.log(updateFavorites);
      updateSnippet("http://localhost:3000/api/snippets", idSnippet, {
        favoriteByIds: updateFavorites,
      });
      setTrigger("false");
      console.log("was added");
    }
    if (userId && snippet?.favoriteByIds.includes(userId)) {
      const updateFavorites = users.filter((user) => user !== userId);
      updateSnippet("http://localhost:3000/api/snippets", idSnippet, {
        favoriteByIds: updateFavorites,
      });
      setTrigger("true");
      console.log("was removed");
    }
  };

  const normalizeDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <div className="big-container">
      {snippet ? (
        <div className="container">
          <div className="details">
            <div className="details-left">
              <h1 className="title">{snippet.title}</h1>
              <ul>
                {snippet.tags.map((tag: string) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p className="description">{snippet.description}</p>
            </div>
            <div className="details-right">
              <div className="buttons-container">
                <Link href={`/snippet/${snippetId}/edit`}>
                  <button className="edit-button" type="button">
                    Edit
                  </button>
                </Link>
                <button
                  className="favorite-button"
                  type="button"
                  onClick={() => addToFavorite(snippetId ? snippetId : "")}
                >
                  ❤️
                  {/* here will be heart icon */}
                </button>
              </div>
              <p className="user-date">
                {snippet.authorId} {normalizeDate(new Date(snippet.updatedAt))}
              </p>{" "}
              {/* <UserIcon /> */}
            </div>
          </div>
          <div className="card-container">
            <CodeEditor
              initialValue={snippet.snippetCode}
              readOnly={true}
              tags={snippet.tags}
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SnippetDetails;
