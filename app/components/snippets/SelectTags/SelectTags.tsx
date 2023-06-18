/** @format */
import React from 'react';
import Select from 'react-select';
import { SelectTagProps } from './interfaces';

export default function SelectTags(props: SelectTagProps): JSX.Element {
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
