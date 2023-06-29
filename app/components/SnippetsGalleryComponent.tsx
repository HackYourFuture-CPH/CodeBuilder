"use client";
import { useState, useEffect } from "react";
import { snippetModel } from "../snippetModel-DB";
import SnippetCardComponent from "./SnippetCardComponent";
import Navbar from "../navbar";
import "./snippetsGallery.css";

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
      <ul className="gallery-container">
        {snippets?.map((snippet) => {
          return (
            <li className="gallery-item" key={snippet._id}>
              <div className="card">
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
