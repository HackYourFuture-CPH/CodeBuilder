import React, { ChangeEvent } from "react";
import { TextInputProps } from "./interfaces";

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
