import { ChangeEvent } from "react";

export interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
