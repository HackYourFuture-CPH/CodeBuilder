import React from "react";

const CodeEditor = ({ code, onChange, language }) => {
  const handleCodeChange = (e) => {
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
