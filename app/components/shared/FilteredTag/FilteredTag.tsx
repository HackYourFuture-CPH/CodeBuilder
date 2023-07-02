"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { Tag } from "@/app/api/tags/route";
import SelectTags from "../../snippets/snipetForm/SelectTags";
import { Option } from "../../snippets/snipetForm/interfaces";


import "./FilteredTag.css";


const FilteredTag = (props: any) => {
  const [selectTags, setSelectTags] = useState<string[]>([]);

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
    <div>
          <SelectTags
                placeholder={"Search here"}
                options={tagOptions}
                value={props.selectTags}
                onChange={(tags: string[]): void => props.setSelectTags(tags)}
                isMulti
      />
      Filtered tags will be rendered here!!!!
    </div>
  );
};

export default FilteredTag;
