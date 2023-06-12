import { useState } from "react";
import TextInput from "./TextInput";
import Tag from "./SelectTag";
import CodeEditor from "./CodeEditor";

interface SnippetData {
  title: string;
  tags: string[];
  description: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

const CreateSnippetComponent = (): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const currentDate = new Date();
  const updatedDate = new Date();
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
      created_at: currentDate,
      updated_at: updatedDate,
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />

      <div>
        <h4>Tags</h4>
        {tags.map((tag) => (
          <Tag key={tag} label={tag} onRemove={() => handleTagRemove(tag)} />
        ))}
        <TextInput
          label="Add Tag"
          value={""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleTagAdd(e.target.value)
          }
          placeholder="Type a tag and press Enter"
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

      <button onClick={handlePublish}>Publish</button>
      <button>Cancel</button>
    </div>
  );
};

export default CreateSnippetComponent;
