import React from "react";
import styles from "./Tag.module.css";

interface TagProps {
  text: string;
  color?: string;
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({ text, color, onClick }) => {
  const tagStyles = color ? { backgroundColor: color } : {};

  return (
    <div className={styles.tag} style={tagStyles} onClick={onClick}>
      {text}
    </div>
  );
};
