import React from "react";

interface TagProps {
  label: string;
  onRemove: () => void;
}

const Tag = ({ label, onRemove }: TagProps): JSX.Element => {
  return (
    <div className="tag">
      <span>{label}</span>
      <button onClick={onRemove}>&times;</button>
    </div>
  );
};

export default Tag;
