/** @format */
import React, { ChangeEvent, useState } from "react";
import Select, {
  components,
  MultiValueRemoveProps,
  IndicatorSeparatorProps,
} from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
    paddingLeft: "11px",
    paddingRight: "11px",
    paddingTop: "6px",
    paddingBottom: "6px",
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
  multiValueLabel: (base: any) => ({
    ...base,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px 12px",
    gap: "8px",
    width: "73px",
    height: "34px",
    background: " #104D85",
    borderRadius: " 24px",
    fontFamily: "Arial",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "18px",
    color: "#FFFFFF",
    order: "0",
    flexGrow: "0",
  }),
  multiValue: (base: any) => ({
    ...base,
    borderRadius: " 24px",
    background: " #104D85",
    padding: "4px 8px",
  }),
};

const DropdownIndicator: React.FC<any> = (props) => {
  return (
    <>
      <components.MultiValueRemove {...props}>
        <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff" }} />
      </components.MultiValueRemove>
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={faChevronDown} style={{ color: "#000000" }} />
      </components.DropdownIndicator>
    </>
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
