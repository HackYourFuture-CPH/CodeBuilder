"use client";
import { useState } from "react";
import TextInput from "./TextInput";
import Tag from "./Tag";
import CodeEditor from "./CodeEditor";

const CreateSnippet = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  const handleTagAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleTagRemove = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handlePublish = () => {
    const snippetData = {
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

      <TextInput
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div>
        <h4>Tags</h4>
        {tags.map((tag) => (
          <Tag key={tag} label={tag} onRemove={() => handleTagRemove(tag)} />
        ))}
        <TextInput
          label="Add Tag"
          value={""}
          onChange={(e) => handleTagAdd(e.target.value)}
          placeholder="Type a tag and press Enter"
        />
      </div>

      <TextInput
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <CodeEditor
        code={code}
        onChange={(newCode) => setCode(newCode)}
        language="javascript"
      />

      <button onClick={handlePublish}>Publish</button>
      <button>Cancel</button>
    </div>
  );
};

export default CreateSnippet;
