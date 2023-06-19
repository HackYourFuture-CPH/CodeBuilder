import React, { ChangeEvent } from "react";
import { CodeEditorProps } from "./interfaces";

const CodeEditor = ({
  code,
  onChange,
  language,
}: CodeEditorProps): JSX.Element => {
  const handleCodeChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newCode = e.target.value;
    onChange(newCode);
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={handleCodeChange}
        placeholder={`Enter your ${language} code`}
      />
    </div>
  );
};

export default CodeEditor;
