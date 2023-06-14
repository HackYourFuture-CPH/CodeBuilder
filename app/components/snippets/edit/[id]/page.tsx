"use client";
import React from "react";
import { useState } from "react";
import SnippetForm from "../../snipetForm/snippetForm";
import { SnippetData } from "./interfaces";
import useSWR from "swr";
import { Tag } from "@/app/api/tags/route";
import SelectTags from "../../SelectTags";

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
    <div>
      <h2>Edit Snippet</h2>
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
      <button onClick={handlePublish}>Update</button>
      <button>Cancel</button>
    </div>
  );
};

export default EditSnippet;
