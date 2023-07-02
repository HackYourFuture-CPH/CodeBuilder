import "./FilterBar.css";
import useSWR from "swr";
import SelectTags from "../../snippets/snipetForm/SelectTags";
import { Tag } from "@/app/api/tags/route";
import { useState } from "react";
import ApplyFilterButton from "../ApplyFilterButton/ApplyFilterButton";
import SearchBar from "../SearchBar/SearchBar";

export interface Option {
  label: string;
  value: string;
}

const FilterBar = (props: any) => {
  const [selectTags, setSelectTags] = useState<string[]>([]);
  const [queryTitle, setQueryTitle] = useState<string>("");
  console.log("selectTags", selectTags);
  console.log(" queryTitle", queryTitle);

  const { data: tags } = useSWR<Tag[]>("/api/tags", async (url) => {
    const response = await fetch(url);
    return response.json();
  });

  const tagOptions: Option[] =
    tags?.map((tag) => ({
      value: tag.shortName,
      label: tag.displayName,
    })) || [];

  return (
    <div className="FilterBar_Container">
      <SelectTags
        placeholder="Select Tags"
        options={tagOptions}
        value={selectTags}
        onChange={(tags: string[]): void => setSelectTags(tags)}
        isMulti
      />
      <ApplyFilterButton />
      <SearchBar queryTitle={queryTitle} onChange={setQueryTitle} />
    </div>
  );
};

export default FilterBar;
