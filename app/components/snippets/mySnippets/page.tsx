"use client";
import React from "react";
import SnippetGallery from "../../SnippetsGallery";
import styles from "./styles.module.css";

const MySnippets: React.FC = () => {
  return (
    <div className={styles.container}>
      <SnippetGallery showMySnippets={true} />
    </div>
  );
};

export default MySnippets;
