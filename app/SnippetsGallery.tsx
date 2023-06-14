"use client"
// import SnippetCard from "./SnippetCard";
import { useState, useEffect } from "react";
import { snippetModel } from "./snippetModel-DB";

const SnippetGallery = () => {
  const [snippets, setSnippets] = useState<snippetModel[]>([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/snippets/filter");
        const snippets = await response.json();
        setSnippets(snippets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSnippets();
  }, []);

  return (
    <ul className="grid-snippets">
      {snippets?.map((snippet) => {
        return (
          <li key={snippet._id}>
            snippet card
            {/* <SnippetCard snippet={snippet} /> */}
          </li>
        );
      })}
    </ul>
  );
};

export default SnippetGallery;
