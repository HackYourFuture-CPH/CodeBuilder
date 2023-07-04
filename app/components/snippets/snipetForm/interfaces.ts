import { ChangeEvent } from "react";

export interface SnippetFormProps {
  description: string;
  code: string;
  title: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setCode: (code: string) => void;
  selectTags: string[] | any;
  setSelectTags: (selectTags: string[]) => void;
}

export interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface TagInterface {
  label: string;
  toUpperCase: Function;
}
