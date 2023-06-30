"use client";
// import SnippetCard from "./SnippetCard";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { getSnippets } from "../services/SnippetService";
import { addToFavorite, normalizeDate } from "../snippets/[id]/handlers";
import { snippetModel } from "../snippetModel-DB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { snippetModel } from "../snippetModel-DB";
import { getSnippets } from "../services/SnippetService";

import { useState, useEffect } from "react";
// import SnippetCardComponent from "./SnippetCardComponent";
import useSWR from "swr";

export interface Tag {
  displayName: string;
  shortName: string;
  _id?: string;
}

type favoriteSnippet = snippetModel & { favorite: boolean };

const SnippetGallery = () => {
  const [snippets, setSnippets] = useState<favoriteSnippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<favoriteSnippet[]>(
    []
  );
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data: snippetsData, error: snippetError } = useSWR(
    "/api/snippets",
    getSnippets
  );

  const { data: tagsData, error: tagError } = useSWR(
    "http://localhost:3000/api/tags",
    (url) => fetch(url).then((response) => response.json())
  );

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/snippets");
        const snippets = await response.json();
        setSnippets(snippets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSnippets();
  }, []);

  const markAsFavorite = (snippetId: string) => {
    const updatedSnippets = snippets.map((snippet) => {
      if (snippet._id === snippetId) {
        return { ...snippet, favorite: !snippet.favorite };
      }
      return snippet;
    });

    setSnippets(updatedSnippets);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  if (snippetError || tagError) {
    return <div>Error fetching data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <select value="" onChange={(e) => handleSelectChange(e.target.value)}>
          <option key={0} value="">
            {"All"}
          </option>
          {Options}
        </select>

        {ShownTags}
      </div>

      <div id="search">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          placeholder="Search snippets"
          autoComplete="off"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <ul
        style={{
          padding: "3em",
          display: "grid",
          gridGap: "3em",
          gridTemplateColumns: "repeat(auto-fit, minmax(600px, 1fr))",
        }}
      >
        {filteredSnippets.map((snippet) => (
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
              disabled={userId ? false : true}
              style={{
                border: "none",
                background: "transparent",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={() =>
                addToFavorite(snippet._id, snippet, userId ? userId : "")
              }
            >
              {userId && snippet.favoriteByIds.includes(userId) ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "#D25B5B" }}
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

            <div
              style={{
                height: "573px",
              }}
            >
              snippet card
              {/* <SnippetCard snippet={snippet} /> */}
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
              {/* <img src="" alt="user profile pic" /> */}
              <p
                style={{
                  margin: "0",
                }}
              >
                by {snippet.authorId}{" "}
                {normalizeDate(new Date(snippet.createdAt))}{" "}
              </p>
            </div>

            <Link
              style={{
                textDecoration: "none",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
              href={userId ? `/snippets/${snippet._id}` : "/snippets"}
            >
              Learn more..
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SnippetGalleryComponent;
