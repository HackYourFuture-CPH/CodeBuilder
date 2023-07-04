"use client";
import { getSnippets } from "@/app/services/SnippetService";
import { snippetModel } from "@/app/snippetModel-DB";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";
import SnippetGallery from "../../SnippetsGallery";
import styles from "./styles.module.css";

const MySnippets: React.FC = () => {
  return (
    <div className={styles.container}>
      <SnippetGallery showMySnippets />
    </div>
  );
};

export default MySnippets;
