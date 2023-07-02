"use client";
import React from "react";
import { useState } from "react";
import SnippetForm from "../../snipetForm/snippetForm";
import { SnippetData } from "./interfaces";
import useSWR from "swr";
import { Tag } from "@/app/api/tags/route";
import styles from "./styles.module.css";

const EditSnippet = ({ params }: { params: { id: string } }) => {
  //use SWR to fetch the snipet with id params.id

  const { data: snippetData, error } = useSWR(`/api/snippets/${params.id}`);
  const [title, setTitle] = useState<string>(snippetData?.title || "");
  const [tags, setTags] = useState<string[]>(snippetData?.tags || []);
  const [description, setDescription] = useState<string>(
    snippetData?.description || ""
  );
  const [code, setCode] = useState<string>(snippetData?.code || "");
  const [selectTags, setSelectTags] = useState<string[]>([]);

  const handlePublish = (): void => {
    const snippetData: SnippetData = {
      title: title,
      tags: tags,
      description: description,
      code: code,
    };

    fetch(`/api/snippets/${params.id}`, {
      // Corrected URL using template literal
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippetData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Snippet updated!");
        } else {
          throw new Error("Error updating the snippet");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /*const handlePublish = (): void => {
    const snippetData: SnippetData = {
      title: title,
      tags: tags,
      description: description,
      code: code,
    };

    fetch("/api/snippets/${params.id}", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippetData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Snippet updated!");
        } else {
          throw new Error("Error updating the snippet");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
*/
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Edit Snippet</h2>
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
          <button className={styles.submitBtn}>Cancel</button>
          <button className={styles.cancelBtn} onClick={handlePublish}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSnippet;
