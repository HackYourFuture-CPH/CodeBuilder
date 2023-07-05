"use client";
import React from "react";
import SnippetGallery from "../../SnippetsGallery";

const MySnippets: React.FC = () => {
  return (
    <div>
      <SnippetGallery showMySnippets={true} />
    </div>
  );
};

export default MySnippets;
