"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { getSnippets } from "../services/SnippetService";
import { snippetModel } from "../snippetModel-DB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import SnippetCard from "./SnippetCard";
import "./snippetsGallery.css";

interface SnippetGalleryProps {
  filteredSnippets: snippetModel[];
  mutate: () => void;
}

const SnippetGallery = ({ filteredSnippets }: { filteredSnippets: snippetModel[] }) => {
  
  const { data, mutate } = useSWR<snippetModel[]>("/api/snippets", getSnippets);
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <div
      className="snippet-gallery-container"
      style={{
        height: "100vh",
        marginTop: "300px",
        marginBottom: "300px",
      }}
    >
      <ul className="gallery-container">
        {filteredSnippets?.map((snippet) => {
          return (
            <li className="gallery-item" key={snippet._id}>
              <div
                style={{
                  height: "573px",
                }}
              >
                <SnippetCard
                  snippet={snippet}
                  key={snippet._id}
                  title={snippet.title}
                  description={snippet.description}
                  tags={snippet.tags}
                  snippetCode={snippet.snippetCode}
                  formatDate={formatDate}
                  mutate={mutate}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SnippetGallery;

