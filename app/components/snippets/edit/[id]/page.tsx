"use client";

import React from "react";
import { useState, useEffect } from "react";
import SnippetForm from "../../snipetForm/snippetForm";
import { SnippetData } from "./interfaces";
import useSWR, { mutate } from "swr";
import { updateSnippet, getSnippets } from "@/app/services/SnippetService";
import { useRouter } from "next/navigation";
import { snippetModel } from "../../../../snippetModel-DB";
import "../../create/create-update.css";

const EditSnippet = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const { data: snippetData, error } = useSWR<snippetModel>(
    `/api/snippets/${params.id}`,
    getSnippets
  );
  useEffect(() => {
    setTitle(snippetData ? snippetData.title : "");
    setDescription(snippetData ? snippetData.description : "");
    setSelectTags(snippetData ? snippetData.tags : []);
    setCode(snippetData ? snippetData.snippetCode : "");
  }, [snippetData]);
  const [title, setTitle] = useState<string>(snippetData?.title || "");
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>(
    snippetData?.description || ""
  );
  const [code, setCode] = useState<string>(snippetData?.snippetCode || "");

  const updatedSnippetData: SnippetData = {
    title: title,
    tags: selectTags,
    description: description,
    snippetCode: code,
  };

  const handleClick = async () => {
    const updatedSnippet = await updateSnippet(
      `/api/snippets/`,
      params.id,
      updatedSnippetData
    );

    mutate(`/api/snippets/${params.id}`, updatedSnippet, {
      optimisticData: (snippet: any) => ({
        ...snippet,
        title: updatedSnippetData,
      }),
      rollbackOnError: true,
    });

    // router.push(`/snippets/${params.id}`);
  };
  const handlerReset = (): void => {
    setTitle("");
    setSelectTags([]);
    setDescription("");
    setCode("");
  };

  return (
    <div className="container">
      <h2 className="title">Edit Snippet</h2>
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
          <button className="submitBtn" onClick={handleClick}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSnippet;

/*
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
*/
