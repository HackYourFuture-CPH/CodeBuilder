import React from 'react';
import './Tag.css';

interface TagProps {
  text: string;
  color?: string;
  onClick?: () => void;
}

export const TagItem: React.FC<TagProps> = ({ text, color, onClick }) => {
  const tagStyles = color ? { backgroundColor: color } : {};

  return (
    <div className="tag" style={tagStyles} onClick={onClick}>
      {text}
    </div>
  );
};
