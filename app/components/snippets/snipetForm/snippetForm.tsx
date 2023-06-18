import React from "react";
import { SnippetFormProps, TextInputProps, Option } from "./interfaces";
import useSWR from "swr";
import { Tag } from "@/app/api/tags/route";
import SelectTags from "../SelectTags/SelectTags";
import CodeEditor from "../../shared/CodeEditor/CodeEditor";
import TextInput from "../../shared/TextInput/TextInput";

const SnippetForm = (props: SnippetFormProps) => {
  const { data: tags } = useSWR<Tag[]>("/api/tags", async (url) => {
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
      <TextInput
        label="Title"
        value={props.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setTitle(e.target.value)
        }
      />

      <div>
        <h4>Tags</h4>
        <SelectTags
          placeholder="Select Tags"
          options={tagOptions}
          value={props.selectTags}
          onChange={(tags: string[]): void => props.setSelectTags(tags)}
          isMulti
        />
      </div>

      <TextInput
        label="Description"
        value={props.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setDescription(e.target.value)
        }
      />

      <CodeEditor
        code={props.code}
        onChange={(newCode: string) => props.setCode(newCode)}
        language="javascript"
      />
    </div>
  );
};

export default SnippetForm;
