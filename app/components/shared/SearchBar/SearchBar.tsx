import "./SearchBar.css";

type props = {
  onChange: () => void;
  queryTitle: string;
};

const SearchBar = (props: props) => {
  const BarStyle = {
    width: "20rem",
    background: "#F0F0F0",
    border: "none",
  };

  return (
    <input
      type="text"
      // onChange={(e) => props.onChange(e.target.value)}
      value={props.queryTitle}
      // key="search-bar"
      // value={keyword}
      placeholder="search news"
      // onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
