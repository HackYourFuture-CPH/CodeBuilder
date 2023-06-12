
/** @format */
'use client';
import { url } from 'inspector';
import Link from 'next/link';
import React, {useState} from 'react';
import useSWR from 'swr';
import { Tag } from '../api/tags/route';
import Select from 'react-select';
import OptionTypeBase  from 'react-select';
import  ValueType  from 'react-select';


type Option = {
  label: string;
  value: string | number;
};
interface SelectTagProps {
  placeholder?: string;
  options: Option[];
  onRemove: () => void;
}

export default function SelectTag<SelectTagProps>() {
  const { data: tags } = useSWR<Tag[]>('/api/tags', async (url) => {
    const response = await fetch(url);
    return response.json();
  });
  const [selectedTag, setSelectedTag] = useState<string[]>([]);
  
  const tagOptions:Option[] =
    tags?.map((tag) => ({
      value: tag.shortName,
      label: tag.displayName,
    })) || [];
  const handleTagChange = (selectedOptions: OptionTypeBase[]) => {
      const tags = selectedOptions
        ? selectedOptions.map((option: Option) => option.value)
        : [];
    setSelectedTag(tags);
  };

  return (
    <div>
      <Select
        placeholder="Select tags"
        Options={tagOptions}
        value={selectedTag}
        onChange={handleTagChange}
        isSearchable={true}
        isMulti
      />
    </div>
  );
}