"use client";
import React from "react";
import { useState } from "react";
import { SnippetData } from "./interfaces";
import styles from "./styles.module.css";
import SnippetForm from "../snipetForm/snippetForm";

const CreateSnippet = () => {
  const [title, setTitle] = useState<string>("");
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const favoriteByIds: string[] = [];

  const handlePublish = (): void => {
    const snippetData: SnippetData = {
      title: title,
      description: description,
      snippetCode: code,
      tags: selectTags,
      createdAt: new Date(),
      updatedAt: new Date(),
      favoriteByIds: favoriteByIds,
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
        window.location.href = `/snippets/${data.insertedId}`;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Snippet</h2>
      <div className={styles.form}>
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
        <div className={styles.wrapperBtns}>
          <button className={styles.cancelBtn}>Cancel</button>
          <button className={styles.submitBtn} onClick={handlePublish}>
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSnippet;
