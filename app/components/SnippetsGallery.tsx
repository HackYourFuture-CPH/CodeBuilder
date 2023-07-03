"use client";
import { snippetModel } from "../snippetModel-DB";
import SnippetCard from "./SnippetCard";
import "./snippetsGallery.css";

interface SnippetGalleryProps {
  filteredSnippets: snippetModel[];
  mutate: () => void;
}

const SnippetGallery = (props: SnippetGalleryProps) => {
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
        {props.filteredSnippets?.map((snippet) => {
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
                  mutate={props.mutate}
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
