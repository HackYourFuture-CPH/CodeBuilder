import React from "react";

const Tag = ({ label, onRemove }) => {
  return (
    <div className="tag">
      <span>{label}</span>
      <button onClick={onRemove}>&times;</button>
    </div>
  );
};

export default Tag;
