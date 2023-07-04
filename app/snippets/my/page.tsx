"use client";
import React from "react";
import SnippetGallery from "@/app/components/SnippetsGallery";
import styles from "./styles.module.css";

const MySnippets: React.FC = () => {
  return (
    <div className={styles.container}>
      <SnippetGallery showMySnippets />
    </div>
  );
};

export default MySnippets;
