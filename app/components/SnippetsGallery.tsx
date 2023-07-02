"use client";
import useSWR from "swr";
import { getSnippets } from "../services/SnippetService";
import { snippetModel } from "../snippetModel-DB";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import SnippetCard from "./SnippetCard";
library.add(faHeart);
import "./snippetsGallery.css";

const SnippetGallery = () => {
  const { data: snippets, mutate } = useSWR<snippetModel[]>(
    "/api/snippets",
    getSnippets
  );

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <ul className="gallery-container">
      {snippets?.map((snippet) => {
        return (
          <li className="gallery-item" key={snippet._id}>
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
          </li>
        );
      })}
    </ul>
  );
};

export default SnippetGallery;
