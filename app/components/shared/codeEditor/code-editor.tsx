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
  const language = languageMap[tags[0]];

  // Either return the mapped language or plaintext
  return language ? language : "plaintext";
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  readOnly,
  tags,
  setCode,
}) => {
  const editorRef = useRef(null) as React.MutableRefObject<
    null | HTMLInputElement | any
  >;

  const handleEditorDidMount = (editor: any, monaco: any): void => {
    editorRef.current = editor;
  };

  function getEditorValue() {
    const value = editorRef.current?.setValue();
    setCode?.(value);
  }

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
      width="573px"
      height="333px"
      language={language}
      theme="vs-dark"
      options={options}
      onMount={handleEditorDidMount}
      onChange={getEditorValue}
    />
  );
};

export default CodeEditor;
