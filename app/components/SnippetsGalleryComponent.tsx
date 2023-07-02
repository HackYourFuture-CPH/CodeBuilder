"use client";
// import { useState } from "react";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { getSnippets } from "../services/SnippetService";
import { addToFavorite, normalizeDate } from "../snippets/[id]/handlers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

import "./snippetsGallery.css";
import SnippetCardComponent from "./SnippetCardComponent";
import { snippetModel } from "../snippetModel-DB";
library.add(faHeart);

const SnippetGallery = () => {
  // const [changes, setChanges] = useState(false);
  const { data: snippets } = useSWR<snippetModel[]>(
    "/api/snippets",
    getSnippets
  );
  const { data: session } = useSession();
  const userId = session?.user?.email?.toString();

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <ul className="gallery-container ">
      {snippets?.map((snippet) => {
        return (
          <li className="gallery-item" key={snippet._id}>
            <SnippetCardComponent
              snippet={snippet}
              key={snippet._id}
              title={snippet.title}
              description={snippet.description}
              tags={snippet.tags}
              snippetCode={snippet.snippetCode}
              formatDate={formatDate}
              // changes={changes}
              // setChanges={setChanges}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default SnippetGallery;
