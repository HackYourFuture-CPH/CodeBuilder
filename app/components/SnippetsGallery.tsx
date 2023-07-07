"use client";
import useSWR from "swr";
import { snippetModel } from "../snippetModel-DB";
import SnippetCard from "./SnippetCard";
import "./snippetsGallery.css";
import { getSnippets } from "../services/SnippetService";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export interface Tag {
  displayName: string;
  shortName: string;
  _id?: string;
}

interface Props {
  showMySnippets?: boolean;
}

type SelectableTag = Tag & { selected: boolean };

const SnippetGallery = (props: Props) => {
  const [tags, setTags] = useState<SelectableTag[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<snippetModel[]>([]);
  const [search, setSearch] = useState<string>("");
  const { data: session } = useSession();
  const [highlighted, setHighlighted] = useState("createdByYou");
  const userId: any = session?.user?.id;

  const {
    data: snippetsData,
    mutate,
    error: snippetError,
    isLoading: isLoadingSnippets,
  } = useSWR<snippetModel[]>("/api/snippets", getSnippets);

  const {
    data: tagsData,
    error: tagError,
    isLoading: isLoadingTags,
  } = useSWR<SelectableTag[]>("/api/tags", (url) =>
    fetch(url).then((response) => response.json())
  );

  const isLoading = isLoadingSnippets || isLoadingTags;

  useEffect(() => {
    if (tagsData) {
      setTags(tagsData);
    }
  }, [tagsData]);

  const filterSnippets = (showMySnippets = false) => {
    const filteredTags = tags
      .filter((tag) => tag.selected)
      .map((tag) => tag.shortName.toUpperCase());

    let filtered = snippetsData?.filter((snippet) => {
      const hasSelectedTags =
        filteredTags.length === 0 ||
        filteredTags.every((tag) => snippet.tags?.includes(tag));
      const hasSearchText =
        search === "" ||
        snippet?.title?.toLowerCase().includes(search.toLowerCase()) ||
        snippet?.description?.toLowerCase().includes(search.toLowerCase());

      return hasSelectedTags && hasSearchText;
    });

    if (showMySnippets) {
      filtered = filtered?.filter((snippet) => snippet.authorId === userId);
    }

    setFilteredSnippets(filtered ?? []);
  };

  useEffect(() => {
    filterSnippets();
  }, [tags]);

  useEffect(() => {
    filterSnippets(props.showMySnippets);
  }, [snippetsData]);

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
      <li className="showntag-item" key={tag._id}>
        {tag.displayName}
        <span
          className="delete-tag-btn"
          onClick={() => handleRemoveTag(tag._id)}
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
      </li>
    ));

  const handleSearch = async (searchInput: string) => {
    setSearch(searchInput);
  };

  const handleSearchButtonClick = () => {
    filterSnippets();
  };

  const handleClearSearch = () => {
    setSearch("");
    filterSnippets();
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const LikedSnippets = () => {
    if (snippetsData) {
      setFilteredSnippets(
        snippetsData.filter((snippet) =>
          snippet.favoriteByIds?.includes(userId)
        )
      );
    }
    setHighlighted("likedSnippets");
  };

  const CreatedByYou = () => {
    if (snippetsData) {
      setFilteredSnippets(
        snippetsData.filter((snippet) => snippet.authorId === userId)
      );
    }
    setHighlighted("createdByYou");
  };

  if (snippetError || tagError) {
    return <div>Error fetching data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="snippet-gallery-container">
      <nav className="filter-nav">
        <div className="tags-filter">
          <p>Tags:</p>

          <select
            className="select-tags"
            value=""
            onChange={(e) => handleSelectChange(e.target.value)}
          >
            <option key={0} value="">
              {"All"}
            </option>
            {Options}
          </select>

          <ul className="showntags-list">{ShownTags}</ul>
        </div>

        <div className="search">
          <button
            className="apply-filter-btn"
            onClick={() => handleSearchButtonClick()}
          >
            Apply filter
          </button>

          <div className="search-input-wrapper">
            <input
              className="search-input"
              type="text"
              id="search"
              placeholder="Search snippets"
              autoComplete="off"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {search && (
              <button
                className="clear-search-btn"
                onClick={() => handleClearSearch()}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {props.showMySnippets ? (
        <div className="filter-options">
          <button
            className={highlighted === "likedSnippets" ? "highlighted" : ""}
            onClick={() => LikedSnippets()}
          >
            Liked Snippets
          </button>
          <button
            className={highlighted === "createdByYou" ? "highlighted" : ""}
            onClick={() => CreatedByYou()}
          >
            Created by you
          </button>
        </div>
      ) : null}

      <ul className="gallery-container">
        {filteredSnippets?.map((snippet) => {
          return (
            <li className="gallery-item" key={snippet._id}>
              <SnippetCard
                snippet={snippet}
                key={snippet._id}
                title={snippet.title}
                description={snippet.description}
                tags={snippet.tags}
                snippetCode={snippet.snippetCode}
                formatDate={formatDate}
                mutate={mutate}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SnippetGallery;
