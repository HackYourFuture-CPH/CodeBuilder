"use client";
// import SnippetCard from "./SnippetCard";
import { useSession } from "next-auth/react";
import { getSnippets } from "../services/SnippetService";
import { addToFavorite, normalizeDate } from "../snippets/[id]/handlers";
import { snippetModel } from "../snippetModel-DB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
// import SnippetCardComponent from "./SnippetCardComponent";
import useSWR from "swr";

export interface Tag {
  displayName: string;
  shortName: string;
  _id?: string;
}

type favoriteSnippet = snippetModel & { favorite: boolean };
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
library.add(faHeart);

const SnippetGallery = () => {
  const { data: snippets } = useSWR<snippetModel[]>(
    "/api/snippets",
    getSnippets
  );
  const { data: session } = useSession();
  const userId = session?.user?.email?.toString();

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
        );
      })}
    </ul>
  );
};

export default SnippetGallery;
