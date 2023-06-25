import React, { ChangeEvent } from "react";
import styles from "./styles.module.css";
interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  language: string;
}

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
        className={styles.textarea}
        value={code}
        onChange={handleCodeChange}
        placeholder={`Enter your ${language} code`}
      />
    </div>
  );
};

export default CodeEditor;
