"use client";

import React from "react";
import { useState } from "react";
import SnippetForm from "../../snipetForm/SnippetForm";
import { SnippetData } from "./interfaces";
import { Tag } from "../../../../..";
import SelectTags from "../app/components/SelectTags";
import useSWR, { mutate } from "swr";

const EditSnippet = ({ params }: { params: { id: string } }) => {
  const fetchSnippet = async () => {
    try {
      const response = await fetch(`/api/snippets/${params.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch snippet");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching snippet data", error);
      throw error;
    }
  };

  const { data: snippetData, error } = useSWR(`http//localhost:3000/api/snippets/${params.id}`, fetchSnippet);

  const [title, setTitle] = useState<string>(snippetData?.title || "");
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>(snippetData?.description || "");
  const [code, setCode] = useState<string>(snippetData?.code || "");

  const updateSnippet = async (id: string, snippetData: SnippetData) => {
    try {
      const response = await fetch(`http//localhost:3000/api/snippets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippetData),
      });
      if (!response.ok) {
        throw new Error("Failed to update snippet");
      }
    } catch (error) {
      console.error("Error updating the snippet", error);
      throw error;
    }
  };

  const handlePublish = (): void => {
    const updatedSnippetData: SnippetData = {
      title: title,
      tags: tags,
      description: description,
      code: code,
    };

    updateSnippet(params.id, updatedSnippetData)
      .then(() => {
        console.log("Snippet updated!");
        mutate(`/api/snippets/${params.id}`, updatedSnippetData);  
      })
      .catch((error) => {
        console.error("Error updating the snippet", error);
      });
  };

  if (error) {
    console.error("Error fetching snippet data", error);
  }

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
  //old one
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
*/

"use client";
import { mutate } from "swr";
import { updateSnippet } from "@/app/services/SnippetService";

type Props = {
  params: {
    id: string;
  };
};

const EditSnippet: React.FC<Props> = ({ params: { id } }) => {
  
  const newTitle = {
    title: "NEWTEST",
  };

  const handleClick = async () => {
    const updatedSnippet = await updateSnippet(`/api/snippets/`, id, newTitle);

    mutate(`/api/snippets/${id}`, updatedSnippet, {
      optimisticData: (snippet: any) => ({ ...snippet, title: newTitle }),
      rollbackOnError: true,
    });
  };

  return (
    <div>
      <button onClick={handleClick}>Change!</button>
    </div>
  );
};

export default EditSnippet;
