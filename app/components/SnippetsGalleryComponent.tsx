"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { snippetModel } from "../snippetModel-DB";
import { getSnippets } from "../services/SnippetService";

import { useState, useEffect } from "react";
// import SnippetCardComponent from "./SnippetCardComponent";
import useSWR from "swr";

export interface Tag {
  displayName: string;
  shortName: string;
  _id?: string;
}

type SelectableTag = Tag & { selected: boolean };
type favoriteSnippet = snippetModel & { favorite: boolean };

const SnippetGalleryComponent = () => {
  const [tags, setTags] = useState<SelectableTag[]>([]);
  const [snippets, setSnippets] = useState<favoriteSnippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<favoriteSnippet[]>(
    []
  );
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data: snippetsData, error: snippetError } = useSWR(
    "/api/snippets",
    getSnippets
  );

  const { data: tagsData, error: tagError } = useSWR(
    "http://localhost:3000/api/tags",
    (url) => fetch(url).then((response) => response.json())
  );

  useEffect(() => {
    if (snippetsData) {
      setSnippets(snippetsData);
      setIsLoading(false);
    }
  }, [snippetsData]);

  useEffect(() => {
    if (tagsData) {
      setTags(tagsData);
      setIsLoading(false);
    }
  }, [tagsData]);

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
    ?.filter((tag) => tag.selected)
    .map((tag) => (
      <div key={tag._id}>
        {tag.displayName}
        <span onClick={() => handleRemoveTag(tag._id)}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      </div>
    ));

  const Options = tags
    ?.filter((tag) => !tag.selected)
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

  if (snippetError || tagError) {
    return <div>Error fetching data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
              {/* <SnippetCardComponent
                snippet={snippet}
                key={snippet._id}
                title={snippet.title}
                description={snippet.description}
                tags={snippet.tags}
                snippetCode={snippet.snippetCode}
                formatDate={formatDate}
              /> */}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SnippetGalleryComponent;
