import React from "react";
import Tag from "../../Tag";
import { SnippetFormProps, TextInputProps } from "./interfaces";
import CodeEditor from "../../CodeEditor";

const SnippetForm = (props: SnippetFormProps) => {
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
        {props.tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            onRemove={() => props.handleTagRemove(tag)}
          />
        ))}
        <TextInput
          label="Add Tag"
          value={""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.handleTagAdd(e.target.value)
          }
          placeholder="Type a tag and press Enter"
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

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
}: TextInputProps): JSX.Element => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SnippetForm;
