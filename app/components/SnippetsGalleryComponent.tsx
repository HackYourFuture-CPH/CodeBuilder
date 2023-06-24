"use client";
// import SnippetCard from "./SnippetCard";
import { useState, useEffect } from "react";
import { snippetModel } from "../snippetModel-DB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { useSession } from "next-auth/react";
library.add(faHeart);

const SnippetGallery = () => {
  const [snippets, setSnippets] = useState<snippetModel[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/snippets"
        );
        const snippets = await response.json();
        setSnippets(snippets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSnippets();
  }, []);

  const markAsFavorite = async (snippetId: string) => {
    console.log("markAsFavorite is working");
    console.log(snippetId);
    if (session?.user) {
      try {
        const updatedSnippet = snippets.find(
          (snippet: snippetModel) => snippet._id === snippetId
        );
  
        if (!updatedSnippet) {
          throw new Error("Snippet not found");
        }
  
        const filteredIds = updatedSnippet.favoriteByIds.filter(
          (id) => id !== null && id !== undefined
        );
        const addOrRemoveIds = filteredIds.includes(session?.user?.name)
          ? filteredIds.filter((id) => id !== session?.user?.name)
          : [...filteredIds, session?.user?.name];
  
        const response = await fetch(`/api/snippets/${snippetId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favoriteByIds: addOrRemoveIds }),
        });
  
        if (response.ok) {
          const updatedSnippets = snippets.map((snippet: snippetModel) =>
            snippet._id === snippetId
              ? { ...snippet, favoriteByIds: addOrRemoveIds }
              : snippet
          );
  
          console.log("success");
          setSnippets(updatedSnippets);
          console.log(updatedSnippets);
        } else {
          throw new Error("Failed to update favorite status.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  console.log(session)
  return (
    <ul
      style={{
        padding: "3em",
        display: "grid",
        gridGap: "3em",
        gridTemplateColumns: "repeat(auto-fit, minmax(600px, 1fr))",
      }}
    >
      {snippets?.map((snippet) => {
        return (
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "2em",
              borderRadius: ".3em",
              boxShadow: "10px 10px 30px rgba(0,0,0,0.1)",
              listStyle: "none",
              position: "relative",
            }}
            key={snippet._id}
          >
            <button
              className="favorite-button"
              style={{
                border: "none",
                background: "transparent",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={() => markAsFavorite(snippet._id)}
            >
              {snippet.favoriteByIds?.includes(session?.user?.name || "") ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "#ff0000" }}
                  size="2xl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "#000000" }}
                  size="2xl"
                />
              )}
            </button>

            <div style={{ height: "573px" }}>
              {/* Replace with your snippet card component */}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                position: "absolute",
                bottom: "10px",
                left: "10px",
              }}
            >
              <img src="" alt="user profile pic" />
              <p style={{ margin: "0" }}>
                by {snippet.authorId} {formatDate(new Date(snippet.createdAt))}
              </p>
            </div>

            <Link
              style={{
                textDecoration: "none",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
              href="/learn-more"
            >
              Learn more..
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SnippetGallery;
