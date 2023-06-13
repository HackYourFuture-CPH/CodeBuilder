"use client";
import React from "react";
import { useState } from "react";
import SnippetForm from "../../snipetForm/snippetForm";
import { SnippetData } from "./interfaces";

const EditSnippet = ({ params }: { params: { id: string } }) => {
  //use SWR to fetch the snipet with id params.id

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

    //fetch snippets edit route
  };

  return (
    <div>
      <h2>Edit Snippet</h2>
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
      <button onClick={handlePublish}>Update</button>
      <button>Cancel</button>
    </div>
  );
};

export default EditSnippet;
