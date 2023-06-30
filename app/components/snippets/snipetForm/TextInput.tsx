import React, { ChangeEvent } from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

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

export default TextInput;
