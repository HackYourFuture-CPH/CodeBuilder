"use client";
import React from "react";
import useSWR from "swr";
import styles from "./page.module.css";
import { snippetModel } from "../snippetModel-DB";
import CodeEditor from "../components/shared/codeEditor/code-editor";
import SnippetGallery from "../components/SnippetsGalleryComponent";
import Header from "../components/shared/header/header";

const TagsPage: React.FC = () => {
  const { data: snippets } = useSWR<snippetModel[]>(
    "/api/snippets",
    async (url) => {
      try {
        const response = await fetch(url);
        const dataSnippets = await response.json();
        return dataSnippets;
      } catch (error) {
        console.log(error);
      }
    }
  );

  return (
    <div>
      <header>
        <Header />
      </header>
      <SnippetGallery />
    </div>
  );
};

export default TagsPage;
