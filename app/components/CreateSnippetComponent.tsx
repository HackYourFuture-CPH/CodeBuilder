/** @format */

import useSWR from 'swr';
import { Tag } from '../api/tags/route';
import { useState } from 'react';
import TextInput from './TextInput';
import CodeEditor from './CodeEditor';
import SelectTags from './SelectTags';

interface SnippetData {
  title: string;
  selectTags: string[];
  description: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

const CreateSnippetComponent = (): JSX.Element => {
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

  const handlePublish = (): void => {
    const snippetData: SnippetData = {
      title: title,
      selectTags: selectTags,
      description: description,
      code: code,
      created_at: currentDate,
      updated_at: updatedDate,
    };

    fetch('/api/snippets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snippetData),
    })
      .then((response) => {
        if (response.ok) {
          // We clear all fields after publishing snippet
          setIsPublished(true);
          setTitle('');
          setSelectTags([]);
          setDescription('');
          setCode('');
        } else {
          throw new Error('Error publishing snippet');
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
      <button onClick={handlePublish}>Publish</button>
      <button>Cancel</button>
      {isPublished && <p>Snippet successfully added</p>}
    </div>
  );
};

export default CreateSnippetComponent;
