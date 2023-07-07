import React from "react";
import {
  SnippetFormProps,
  TextInputProps,
  Option,
  TagInterface,
} from "./interfaces";
import CodeEditor from "../../shared/codeEditor/code-editor";
import useSWR from "swr";
import { Tag } from "@/app/api/tags/route";
import SelectTags from "../../shared/SelectTags/SelectTags";
import styles from "./styles.module.css";

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
  const lang = props.selectTags?.map((tag: TagInterface) =>
    tag.label.toUpperCase()
  );
  return (
    <>
      <TextInput
        label="Title"
        placeholder="Title"
        value={props.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.setTitle(e.target.value)
        }
      />
      <SelectTags
        placeholder="Select Tags"
        options={tagOptions}
        value={props.selectTags}
        onChange={(tags: string[]): void => props.setSelectTags(tags)}
        isMulti
      />
      <div className={styles.inputWrapper}>
        <label htmlFor="description" className={styles.span}>
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          cols={50}
          placeholder="Title"
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
          className={styles.textarea}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor="description" className={styles.span}>
          Code
        </label>
        <CodeEditor
          initialValue={props.code}
          readOnly={false}
          tags={lang}
          setCode={props.setCode}
        />
      </div>
    </>
  );
};

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
}: TextInputProps): JSX.Element => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.span}>{label}</label>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SnippetForm;
