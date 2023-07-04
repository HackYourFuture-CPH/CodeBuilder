import "./FilterBar.css";
import React from "react";
import useSWR from "swr";
import SelectTags from "../../snippets/snipetForm/SelectTags";
import { Tag } from "@/app/api/tags/route";
import { useState } from "react";
import { snippetModel } from "@/app/snippetModel-DB";
import SnippetGallery from "../../SnippetsGallery";
import styled from 'styled-components';
import { log } from "console";


export interface Option {
  label: string;
  value: string;
}


const Link = styled.div`
  display: flex;
  width: 70%;
  background: papayawhip;
  color: #BF4F74;
  justify-content: space-evenly;


  .FilterBar_SelectTags_Container {
    width: 100%;
    border: 5px solid red;
    padding: 0px 20px;
  }


`;

const FilterBar = ({ snippets }: { snippets: snippetModel[] }) => {


  const [selectTags, setSelectTags] = useState<any[]>([]);
  const [queryTitle, setQueryTitle] = useState<string>("");
  const [filteredSnippets, setFilteredSnippets] = useState<snippetModel[]>([]);
  
  
  
  //console.log("selectTags", selectTags, typeof(selectTags));
  console.log(" queryTitle", queryTitle, typeof queryTitle);
  //console.log(snippets);
  console.log("filteredSnippets :", filteredSnippets);

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
        snippet.title.includes(queryTitle.trim().toLowerCase())
        ||  snippet.tags.some((tag) =>
            selectTags
              .map((tags) => tags.value.trim().toLowerCase())
              .includes(tag.trim().toLowerCase())
          )
      );
    });
    setFilteredSnippets(snippetsAfterFilter);
    //console.log(snippetsAfterFilter);
  };

  return (
    <div className="FilterBar_Container">
      <Link>
      <div className="FilterBar_SelectTags_Container">
        <SelectTags
          placeholder="Select Tags"
          options={tagOptions}
          value={selectTags}
          onChange={(tags: string[]): void => setSelectTags(tags)}
          isMulti
        />
      </div>
      </Link>

      <div className="FilterBar_Button_Container">
        <div className="FilterBar_Button_div">
          <button
            className="FilterBar_Button"
            type="submit"
            onClick={handlerSubmit}
          >
            Apply filter
          </button>
        </div>

        <div className="FilterBar_SearchBar_div">
          <input
            className="FilterBar_SearchBar"
            //type="text"
            onChange={(e) => setQueryTitle(e.target.value)}
            value={queryTitle}
            placeholder="search snippets"
          />
        </div>

        <SnippetGallery filteredSnippets={filteredSnippets} />
      </div>
    </div>
  );
};

export default FilterBar;
