"use client";
import React from "react";
import { useState } from "react";
import SnippetForm from "../snipetForm/snippetForm";
import { SnippetData } from "./interfaces";

const CreateSnippet = () => {
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleTagAdd = (tag: string): void => {
    setTags([...tags, tag]);
  };

  const handleTagRemove = (tag: string): void => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handlePublish = (): void => {
    const snippetData: SnippetData = {
      title: title,
      tags: tags,
      description: description,
      code: code,
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
        tags={tags}
        description={description}
        code={code}
        title={title}
        setTitle={setTitle}
        handleTagRemove={handleTagRemove}
        handleTagAdd={handleTagAdd}
        setDescription={setDescription}
        setCode={setCode}
      />
      <button onClick={handlePublish}>Publish</button>
      <button>Cancel</button>
    </div>
  );
};

export default CreateSnippet;
