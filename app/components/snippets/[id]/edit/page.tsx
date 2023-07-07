"use client";

import React from "react";
import { useState, useEffect } from "react";
import SnippetForm from "../../snipetForm/snippetForm";
import { SnippetData } from "./interfaces";
import useSWR, { mutate } from "swr";
import { updateSnippet, getSnippets } from "@/app/services/SnippetService";
import { useRouter } from "next/navigation";
import { snippetModel } from "../../../../snippetModel-DB";
import styles from "./styles.module.css";

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
  return (
    <div className={styles.container}>
      <h2>Edit Snippet</h2>
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
          <button className={styles.cancelBtn} onClick={()=> {router.push(`/snippets/${params.id}`)}}>Cancel</button>
          <button className={styles.submitBtn} onClick={handleClick}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditSnippet;