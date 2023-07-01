"use client";

import useSWR from 'swr';
import { Tag } from '../api/tags/route';
import { useState, useEffect } from 'react';
import TextInput from '@/app/components/TextInput';
import CodeEditor from '@/app/api/components/shared/codeEditor/code-editor';
import SelectTags from '@app/components/SelectTags';

interface SnippetData {
  title: string;
  selectTags: string[];
  description: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

interface EditSnippetProps {
  snippetId: string; 
}

const EditSnippetComponent = ({ snippetId }: EditSnippetProps): JSX.Element => {
  const [isPublished, setIsPublished] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const currentDate = new Date();
  const updatedDate = new Date();

  type Option = {
    label: string;
    value: string;
  };

  useEffect(() => {
    
    fetch(`/api/snippets/${snippetId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error fetching snippet');
        }
      })
      .then((snippetData: SnippetData) => {
        setTitle(snippetData.title);
        setSelectTags(snippetData.selectTags);
        setDescription(snippetData.description);
        setCode(snippetData.code);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [snippetId]);

  const handleUpdate = (): void => {
    const snippetData: SnippetData = {
      title: title,
      selectTags: selectTags,
      description: description,
      code: code,
      created_at: currentDate,
      updated_at: updatedDate,
    };

    fetch(`/api/snippets/${snippetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snippetData),
    })
      .then((response) => {
        if (response.ok) {
          setIsPublished(true);
        } else {
          throw new Error('Error updating snippet');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const { data: tags } = useSWR<Tag[]>('/api/tags', async (url) => {
    const response = await fetch(url);
    return response.json();
  });

  const tagOptions: Option[] =
    tags?.map((tag) => ({
      value: tag.shortName,
      label: tag.displayName,
    })) || [];

  return (
    <div>
      <h2>Edit Snippet</h2>
      <TextInput
        label="Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <div>
        <h4>Tags</h4>
        <SelectTags
          placeholder="Select Tags"
          options={tagOptions}
          value={selectTags}
          onChange={(tags: string[]): void => setSelectTags(tags)}
          isMulti
        />
      </div>
      <TextInput
        label="Description"
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />
      <CodeEditor
        code={code}
        onChange={(newCode: string) => setCode(newCode)}
        language="javascript"
      />
      <button onClick={handleUpdate}>Update</button>
      <button>Cancel</button>
      {isPublished && <p>Snippet successfully updated</p>}
    </div>
  );
};

export default EditSnippetComponent;







/*
import React from "react";
import { useState } from "react";
import SnippetForm from "../../snipetForm/SnippetForm";
import { SnippetData } from "./interfaces";
import { Tag } from "@/app/api/tags/route";
import { SelectTags } from "../../SelectTags";
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

*/
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