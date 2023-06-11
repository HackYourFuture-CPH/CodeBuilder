

// interface TagProps {
//   label: string;
//   onRemove: () => void;
// }

// const Tag = ({ label, onRemove }: TagProps): JSX.Element => {
//   return (
//     <div className="tag">
//       <span>{label}</span>
//       <button onClick={onRemove}>&times;</button>
//     </div>
//   );
// };

// export default Tag;
/** @format */
'use client';
import { url } from 'inspector';
import React from 'react';
import { useState } from 'react';
import useSWR from 'swr';
import { Tag } from '../api/tags/route';
import Select from 'react-select';
import OptionTypeBase from 'react-select';

type Option = {
  label: string;
  value: string;
};
interface SelectTagProps {
  placeholder?: string;
  options: Option[];
  onRemove: () => void;
}

export default function SelectTag() {
  const { data: tags } = useSWR<Tag[]>('/api/tags', async (url) => {
    const response = await fetch(url);
    return response.json();
  });
 
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const selectOptions =
    tags?.map((tag) => ({
      value: tag.displayName,
      label: tag.shortName,
    })) || [];
  const handleTagChange = (selectedOptions: OptionTypeBase[]) => {
    setSelectedTags(selectedOptions as Tag[]);
  };

  return (
    <div>
      <Select
        Placeholder="select Tags"
        Options={selectOptions}
        placeholder="Select tags"
        value={selectedTags}
        OnChange={handleTagChange}
        isSearchable={true}
        isMulti
      />
    </div>
  );
}