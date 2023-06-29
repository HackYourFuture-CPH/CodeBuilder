"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Header from "./shared/header/header";
// import SnippetCardComponent from "./SnippetCardComponent";

export interface Tag {
  displayName: string;
  shortName: string;
  _id?: string;
}

export interface snippetModel {
  _id: string;
  title: string;
  description: string;
  favoriteByIds: string[];
  tags: string[];
  snippetCode: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

type SelectableTag = Tag & { selected: boolean };
type favoriteSnippet = snippetModel & { favorite: boolean };

const SnippetGalleryComponent = () => {
  const [tags, setTags] = useState<SelectableTag[]>([]);
  const [snippets, setSnippets] = useState<favoriteSnippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<favoriteSnippet[]>(
    []
  );
  const [changes, setChanges] = useState(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/snippets");
        const snippets = await response.json();
        setSnippets(snippets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSnippets();
  }, [changes]);

  // get tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tags");
        const tags = await response.json();
        setTags(tags);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);

  // get snippets each time tags are changed
  useEffect(() => {
    filterSnippets();
  }, [tags, search]);

  const filterSnippets = () => {
    const filteredTags = tags
      .filter((tag) => tag.selected)
      .map((tag) => tag.shortName.toUpperCase());

    const filtered = snippets.filter((snippet) => {
      const hasSelectedTags =
        filteredTags.length === 0 ||
        filteredTags.every((tag) => snippet.tags?.includes(tag));
      const hasSearchText =
        search === "" ||
        snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.description.toLowerCase().includes(search.toLowerCase());

      return hasSelectedTags && hasSearchText;
    });

    setFilteredSnippets(filtered);
  };

  const handleSelectChange = (id: string) => {
    const newTags = tags.map((tag) => {
      if (tag._id === id) {
        return { ...tag, selected: true };
      } else if (id === "") {
        return { ...tag, selected: false };
      }
      return tag;
    });
    setTags(newTags);
  };

  const handleRemoveTag = (id?: string) => {
    const newVal = tags.map((tag) =>
      tag._id === id ? { ...tag, selected: false } : tag
    );
    setTags(newVal);
  };

  const handleSearch = async (searchInput: string) => {
    setSearch(searchInput);
  };

  const ShownTags = tags
    .filter((tag) => tag.selected)
    .map((tag) => (
      <div key={tag._id}>
        {tag.displayName}
        <span onClick={() => handleRemoveTag(tag._id)}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      </div>
    ));

  const Options = tags
    .filter((tag) => !tag.selected)
    .map((tag, i) => (
      <option key={tag._id} value={tag._id}>
        {tag.displayName}
      </option>
    ));

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <>
      <header>
        {/* Navbar */}
        <Header />
      </header>

      <div>
        <select value="" onChange={(e) => handleSelectChange(e.target.value)}>
          <option key={0} value="">
            {"All"}
          </option>
          {Options}
        </select>

        {ShownTags}
      </div>

      <div id="search">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          placeholder="Search snippets"
          autoComplete="off"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <ul
        style={{
          padding: "3em",
          display: "grid",
          gridGap: "3em",
          gridTemplateColumns: "repeat(auto-fit, minmax(600px, 1fr))",
        }}
      >
        {filteredSnippets.map((snippet) => (
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "2em",
              borderRadius: ".3em",
              boxShadow: "10px 10px 30px rgba(0,0,0,0.1)",
              listStyle: "none",
              position: "relative",
            }}
            key={snippet._id}
          >
            <div
              style={{
                height: "573px",
              }}
            >
              snippet card component
              {/* <SnippetCardComponent
                snippet={snippet}
                key={snippet._id}
                title={snippet.title}
                description={snippet.description}
                tags={snippet.tags}
                snippetCode={snippet.snippetCode}
                formatDate={formatDate}
                changes={changes}
                setChanges={setChanges}
              /> */}
            </div>
          </li>
        ))}
        ;
      </ul>
    </>
  );
};

export default SnippetGalleryComponent;
