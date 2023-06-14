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
    <ul style={{
      padding: "3em",
      display: "grid",
      gridGap: "3em",
      gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))"
    }}>
      {snippets?.map((snippet) => {
        return (
          <li style={{
            padding: "2em",
            borderRadius: ".3em",
            boxShadow: "10px 10px 30px rgba(0,0,0,0.1)",
            listStyle: "none",
          }} key={snippet._id}>
            snippet card
            {/* <SnippetCard snippet={snippet} /> */}
          </li>
        );
      })}
    </ul>
  );
};

export default SnippetGallery;
