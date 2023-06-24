"use client";
import { useState, useEffect } from "react";
import { snippetModel } from "../snippetModel-DB";
import SnippetCardComponent from "./SnippetCardComponent";
import Navbar from "../navbar";

type favoriteSnippet = snippetModel & { favorite: boolean };

const SnippetGalleryComponent = () => {
  const [snippets, setSnippets] = useState<favoriteSnippet[]>([]);
  const [changes, setChanges] = useState(false);

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
  }, [changes]);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <>
      <header>
        {/* Navbar */}
        <Navbar />
      </header>
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
              <div
                style={{
                  height: "573px",
                }}
              >
                <SnippetCardComponent
                  snippet={snippet}
                  key={snippet._id}
                  title={snippet.title}
                  description={snippet.description}
                  tags={snippet.tags}
                  snippetCode={snippet.snippetCode}
                  formatDate={formatDate}
                  changes={changes}
                  setChanges={setChanges}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SnippetGalleryComponent;
