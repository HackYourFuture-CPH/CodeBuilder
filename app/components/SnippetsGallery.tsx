"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { snippetModel } from "../snippetModel-DB";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import SnippetCard from "./SnippetCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
export interface Tag {
  displayName: string;
  shortName: string;
  _id?: string;
}
interface SnippetGalleryProps {
  snippets: snippetModel[];
}

type SelectableTag = Tag & { selected: boolean };

const SnippetGallery = ({ snippets }: SnippetGalleryProps) => {
  const [tags, setTags] = useState<SelectableTag[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<snippetModel[]>([]);
  const [search, setSearch] = useState<string>("");
  const { data: session } = useSession();
  const userId = session?.user?.email;

  const {
    data: tagsData,
    error: tagError,
    isLoading: isLoadingTags,
  } = useSWR<SelectableTag[]>("/api/tags", (url) =>
    fetch(url).then((response) => response.json())
  );

  useEffect(() => {
    if (tagsData) {
      setTags(tagsData);
    }
  }, [tagsData]);

  useEffect(() => {
    filterSnippets();
  }, [tags, search, snippets]);

  const filterSnippets = () => {
    const filteredTags = tags
      .filter((tag) => tag.selected)
      .map((tag) => tag.shortName.toUpperCase());

    const filtered = snippets?.filter((snippet) => {
      const hasSelectedTags =
        filteredTags.length === 0 ||
        filteredTags.every((tag) => snippet.tags?.includes(tag));
      const hasSearchText =
        search === "" ||
        snippet?.title?.toLowerCase().includes(search.toLowerCase()) ||
        snippet?.description?.toLowerCase().includes(search.toLowerCase());

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

  const Options = tags
    ?.filter((tag) => !tag.selected)
    .map((tag, i) => (
      <option key={tag._id} value={tag._id}>
        {tag.displayName}
      </option>
    ));

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

  const handleSearch = async (searchInput: string) => {
    setSearch(searchInput);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  if (tagError) {
    return <div>Error fetching data</div>;
  }

  if (isLoadingTags) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gallery-container">
      <nav>
        <div>
          <p>Tags:</p>
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
      </nav>

      {userId ? (
        <div className="Links">
          <Link href="snippets/favorite">Liked Snippets</Link>
          <Link href="snippets/mine">Created by you</Link>
        </div>
      ) : null}

      <ul className="gallery-container">
        {filteredSnippets?.map((snippet) => {
          return (
            <li className="gallery-item" key={snippet._id}>
              <div
                style={{
                  height: "573px",
                }}
              >
                <SnippetCard
                  snippet={snippet}
                  key={snippet._id}
                  title={snippet.title}
                  description={snippet.description}
                  tags={snippet.tags}
                  snippetCode={snippet.snippetCode}
                  formatDate={formatDate}
                  // mutate={mutate}
                />

                {snippet.title}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SnippetGallery;
