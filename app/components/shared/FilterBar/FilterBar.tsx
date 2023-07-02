import "./FilterBar.css";
import React from "react";
import useSWR from "swr";
import SelectTags from "../../snippets/snipetForm/SelectTags";
import { Tag } from "@/app/api/tags/route";
import { useState } from "react";
import { snippetModel } from "@/app/snippetModel-DB";
//import SnippetGallery from "../../SnippetsGallery";

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
      return snippet.tags.some((tag) =>
        selectTags.map(tags => tags.value.trim().toLowerCase()).includes(tag.trim().toLowerCase())
      ) || snippet.title.includes(queryTitle.trim().toLowerCase());
    });
    console.log(snippetsAfterFilter);
    return setFilteredSnippets(snippetsAfterFilter);
  };

  

  // filtered_snippets = snippets.filter(snippet => snippet.tags.some(tag => tags.map(tag => tag.title).includes(tag))).map(snippet => );
  return (
    <div className="FilterBar_Container">
      <SelectTags
        placeholder="Select Tags"
        options={tagOptions}
        value={selectTags}
        onChange={(tags: string[]): void => setSelectTags(tags)}
        isMulti
      />
 
      <button className="button"
        type="submit"
        onClick={handlerSubmit}>
        Apply filter
      </button>

      <input
        type="text"
        onChange={(e) => setQueryTitle(e.target.value)}
        value={queryTitle}
        // key="search-bar"
        // value={keyword}
        placeholder="search news"
        // onChange={(e) => onChange(e.target.value)}
      />
      {/* <SnippetGallery filteredSnippets={filteredSnippets} /> */}
    </div>
  );
};

export default FilterBar;
