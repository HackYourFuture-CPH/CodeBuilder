"use client";
import React from "react";
import { useState } from "react";
import { SnippetData } from "./interfaces";
import "./create-update.css";
import SnippetForm from "../snipetForm/snippetForm";
import { useRouter } from "next/navigation";

const CreateSnippet = () => {
  const [title, setTitle] = useState<string>("");
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const router = useRouter();

  const handlePublish = (): void => {
    const snippetData: SnippetData = {
      title: title,
      description: description,
      snippetCode: code,
      tags: selectTags,
      createdAt: new Date(),
      updatedAt: new Date(),
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
          return response.json();
        } else {
          throw new Error("Error publishing snippet");
        }
      })
      .then((data) => {
        router.push(`/snippets/${data.insertedId}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlerReset = (): void => {
    setTitle("");
    setSelectTags([]);
    setDescription("");
    setCode("");
  };

  return (
    <div className="container">
      <h2 className="title">Create Snippet</h2>
      <div className="form">
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
        <div className="wrapperBtns">
          <button className="cancelBtn" onClick={handlerReset}>
            Cancel
          </button>
          <button className="submitBtn" onClick={handlePublish}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSnippet;
