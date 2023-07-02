/** @format */
import React, { ChangeEvent, useState } from "react";
import Select, { components, IndicatorSeparatorProps } from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.css";
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

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: state.isFocused ? "2px solid #c3d9ed" : "none",
    borderRadius: "8px",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "7px",
    paddingBottom: "7px",
    "&:hover": {
      border: "2px solid #c3d9ed",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#c3d9ed" : "white",
    color: state.isFocused ? "black" : "black",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontsSize: "20px",
    fontFamily: "Arial",
    fontWeight: "400",
    lineHeight: "23px",
    color: "#757575",
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none",
  }),
};

const DropdownIndicator: React.FC<any> = (props) => {
  return (
    <components.DropdownIndicator {...props}>

      <FontAwesomeIcon icon={faChevronDown} style={{ color: "#000000" }} />
    </components.DropdownIndicator>
  );
};

export default function SelectTags(props: SelectTagProps): JSX.Element {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.span}>Tags</label>
      <Select
        placeholder={props.placeholder}
        options={props.options}
        value={props.value}
        onChange={props.onChange}
        isSearchable={true}
        isMulti={props.isMulti}
        styles={customStyles}
        components={{ DropdownIndicator }}
      />
    </div>
  );
}
