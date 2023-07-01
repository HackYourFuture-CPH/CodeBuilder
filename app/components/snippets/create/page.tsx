"use client";
import React from "react";
import { useState } from "react";
import SnippetForm from "../snipetForm/SnippetForm";
import { SnippetData } from "./interfaces";

const CreateSnippet = () => {
  const [title, setTitle] = useState<string>("");
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handlePublish = (): void => {
    const snippetData: SnippetData = {
      title: title,
      description: description,
      code: code,
      selectTags: selectTags,
      created_at: new Date(),
      updated_at: new Date(),
    };

    fetch("/api/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippetData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Snippet published!");
        } else {
          throw new Error("Error publishing snippet");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Create Snippet</h2>
      <SnippetForm
        description={description}
        code={code}
        title={title}
        setTitle={setTitle}
        setDescription={setDescription}
        setCode={setCode}
        selectTags={selectTags}
        setSelectTags={setSelectTags}
      />
      <button onClick={handlePublish}>Publish</button>
      <button>Cancel</button>
    </div>
  );
};

export default CreateSnippet;
