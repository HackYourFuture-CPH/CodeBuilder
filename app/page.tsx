"use client";
import React from "react";
import CreateSnippet from "./components/snippets/create/page";

const Home: React.FC = () => {
  return (
    <div className="main">
      <CreateSnippet />
    </div>
  );
};

export default Home;
