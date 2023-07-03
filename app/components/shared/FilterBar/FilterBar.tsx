import "./FilterBar.css";
import React from "react";
import useSWR from "swr";
import SelectTags from "../../snippets/snipetForm/SelectTags";
import { Tag } from "@/app/api/tags/route";
import { useState } from "react";
import { snippetModel } from "@/app/snippetModel-DB";
import SnippetGallery from "../../SnippetsGallery";
import { log } from "console";

export interface Option {
  label: string;
  value: string;
}

const FilterBar = ({ snippets }: { snippets: snippetModel[] }) => {
  const [selectTags, setSelectTags] = useState<any[]>([]);
  const [queryTitle, setQueryTitle] = useState<string>("");
  const [filteredSnippets, setFilteredSnippets] = useState<snippetModel[]>([]);
  // console.log("selectTags", selectTags);
  //console.log(" queryTitle", queryTitle);
  //console.log(snippets);
  console.log(filteredSnippets);

  const { data: tags } = useSWR<Tag[]>("/api/tags", async (url) => {
    const response = await fetch(url);
    return response.json();
  });

  const tagOptions: Option[] =
    tags?.map((tag) => ({
      value: tag.shortName,
      label: tag.displayName,
    })) || [];

  const handlerSubmit = () => {
    const snippetsAfterFilter = snippets?.filter((snippet: snippetModel) => {
      return (
        snippet.tags.some((tag) =>
          selectTags
            .map((tags) => tags.value.trim().toLowerCase())
            .includes(tag.trim().toLowerCase())
        ) || snippet.title.includes(queryTitle.trim().toLowerCase())
      );
    });
    console.log(snippetsAfterFilter);
    return setFilteredSnippets(snippetsAfterFilter);
  };

  return (
    <div className="FilterBar_Container">
      <div className="FilterBar_SelectTags_Container">
      <SelectTags
        placeholder="Select Tags"
        options={tagOptions}
        value={selectTags}
        onChange={(tags: string[]): void => setSelectTags(tags)}
        isMulti
      />
      </div>


      <div className="FilterBar_Button_Container">
        <div className="FilterBar_Button_div">
        <button
          className="FilterBar_Button"
          type="submit" onClick={handlerSubmit}>
          Apply filter
        </button>
        </div>

        <div className="FilterBar_SearchBar_div">
        <input
          className="FilterBar_SearchBar"
          type="text"
          onChange={(e) => setQueryTitle(e.target.value)}
          value={queryTitle}
          // key="search-bar"
          // value={keyword}
          placeholder="search snippets"
          // onChange={(e) => onChange(e.target.value)}
        />
        </div>

        <SnippetGallery filteredSnippets={filteredSnippets} />
      </div>
    </div>
  );
};

export default FilterBar;
