"use client";
import useSWR from "swr";
import { getSnippets } from "../services/SnippetService";
import { snippetModel } from "../snippetModel-DB";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import SnippetCard from "./SnippetCard";
library.add(faHeart);
import { SnippetCardModel } from "./SnippetCard";

const SnippetGallery = (filteredSnippets: snippetModel[]) => {
  const { data, mutate } = useSWR<snippetModel[]>("/api/snippets", getSnippets);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <ul
      style={{
        padding: "3em",
        display: "grid",
        gridGap: "3em",
        gridTemplateColumns: "repeat(auto-fit, minmax(600px, 1fr))",
      }}
    >
      {filteredSnippets?.map((snippet) => {
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
  );
};

export default SnippetGallery;
