import React from "react";
import "./ApplyFilterButton.css";

export default function ApplyFilterButton() {
  const TagsFilterHandler = () => {
    console.log("Tags filter wil be rendered here!!!");
  };

  return (
    <button className="button" type="submit" onClick={TagsFilterHandler}>
      Apply filter
    </button>
  );
};
