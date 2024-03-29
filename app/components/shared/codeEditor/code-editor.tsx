import MonacoEditor from "@monaco-editor/react";
import { useRef } from "react";

interface CodeEditorProps {
  initialValue: string;
  readOnly?: boolean;
  tags: string[];
  setCode?: Function;
}

// Define the type of LanguageMap object
interface LanguageMap {
  [key: string]: string;
}

const getLanguageFromTags = (tags: string[]): string => {
  // Map the tags to language identifiers
  const languageMap: LanguageMap = {
    HTML: "html",
    CSS: "css",
    JAVASCRIPT: "javascript",
    GIT: "plaintext",
    SQL: "sql",
  };

  // Get the languageMap of the first element of tags array
  const [firstTag] = tags;
  const language = firstTag ? languageMap[firstTag.toUpperCase()] : null;

  // Either return the mapped language or plaintext
  return language ? language : "plaintext";
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  readOnly,
  tags,
  setCode,
}) => {
  const language = getLanguageFromTags(tags);

  const options = {
    minimap: {
      enabled: false,
    },
    wordWrap: "on" as "on",
    fontSize: 16,
    automaticLayout: true,
    readOnly: readOnly,
    padding: {
      top: 16,
      bottom: 16,
    },
  };

  return (
    <MonacoEditor
      value={initialValue}
      // max-width="15rem"
      height="333px"
      language={language}
      theme="vs-dark"
      options={options}
      onChange={(value) => setCode?.(value)}
    />
  );
};

export default CodeEditor;
