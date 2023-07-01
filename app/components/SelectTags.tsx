
import React, { ChangeEvent, useState } from 'react';
import Select from 'react-select';

type Option = {
  label: string;
  value: string | any;
};

interface SelectTagProps {
  placeholder?: string;
  options: Option[];
  value: Option[] | any;
  isMulti: boolean;
  onChange: (value: Option[] | null | any) => void;
}

export default function SelectTags (props: SelectTagProps): JSX.Element {
  return (
    <div>
      <Select
        placeholder={props.placeholder}
        options={props.options}
        value={props.value}
        onChange={props.onChange}
        isSearchable={true}
        isMulti={props.isMulti}
      />
    </div>
  );
}
