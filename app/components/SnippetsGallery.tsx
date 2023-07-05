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
type favoriteSnippet = snippetModel;

const SnippetGallery = (props: Props) => {
  const [tags, setTags] = useState<SelectableTag[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<favoriteSnippet[]>(
    []
  );
  const [search, setSearch] = useState<string>("");
  const { data: session } = useSession();
  const userId: any = session?.user?.email;

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

  const filterSnippets = () => {
    const filteredTags = tags
      .filter((tag) => tag.selected)
      .map((tag) => tag.shortName.toUpperCase());

    const filtered = snippetsData?.filter((snippet) => {
      const hasSelectedTags =
        filteredTags.length === 0 ||
        filteredTags.every((tag) => snippet.tags?.includes(tag));
      const hasSearchText =
        search === "" ||
        snippet?.title?.toLowerCase().includes(search.toLowerCase()) ||
        snippet?.description?.toLowerCase().includes(search.toLowerCase());

      return hasSelectedTags && hasSearchText;
    });

    setFilteredSnippets(filtered ?? []);
  };

  useEffect(() => {
    filterSnippets();
  }, [tags, search, snippetsData]);

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

  const LikedSnippets = () => {
    snippetsData?.filter((snippet) => snippet.favoriteByIds?.includes(userId));
  };

  const CreatedByYou = () => {
    snippetsData?.filter((snippet) => snippet.authorId === userId);
  };

  if (snippetError || tagError) {
    return <div>Error fetching data</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="snippet-gallery-container"
      style={{
        height: "100vh",
        marginTop: "300px",
        marginBottom: "300px",
      }}
    >
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

      {props.showMySnippets ? (
        <div>
          <button onClick={() => LikedSnippets()}>Liked Snippets</button>
          <button onClick={() => CreatedByYou()}>Created by you</button>
        </div>
      ) : null}

      <ul className="gallery-container">
        {filteredSnippets?.map((snippet) => {
          return (
            <li className="gallery-item" key={snippet._id}>
              <div>
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
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SnippetGallery;
