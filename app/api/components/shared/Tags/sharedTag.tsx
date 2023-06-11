import React from 'react';
import './Tag.css';

interface TagProps {
  text: string;
  color?: string;
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({ text, color = "skyblue", onClick }) => {
  return (
    <div className="tag" style={{ backgroundColor: color }} onClick={onClick}>
      {text}
    </div>
  );
};
