import { ChangeEvent } from "react";

export interface SnippetFormProps {
  tags: string[];
  description: string;
  code: string;
  title: string;
  setTitle: (title: string) => void;
  handleTagRemove: (tag: string) => void;
  handleTagAdd: (tag: string) => void;
  setDescription: (description: string) => void;
  setCode: (code: string) => void;
}

export interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
