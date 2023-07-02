"use client";
import React from "react";
import NavbarForTags from "./components/shared/NavbarForTags/NavbarForTags";
import CreateSnippet from "./components/snippets/create/page";
import FilterBar from "./components/shared/FilterBar/FilterBar";

const Home: React.FC = () => {
  return (
    <div className="main">
      <FilterBar />
      <CreateSnippet />
    </div>
  );
};

export default Home;
