"use client";
import React from "react";
import useSWR from "swr";
import "./Tag.css";
import { snippetModel } from "../../../snippetModel-DB";


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
    <div className="Tag_container">
      <h1>Tags will be rerndered here</h1> 
    </div>
  );
};

export default TagsPage;
