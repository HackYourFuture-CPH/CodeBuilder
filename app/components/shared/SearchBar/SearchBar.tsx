import './SearchBar.css'

const SearchBar = () => {
    const BarStyle = {
        width: "20rem", background: "#F0F0F0", border: "none", }
        
    return (
        <input 
        style={BarStyle}
        key="search-bar"
        value={keyword}
        placeholder={"search news"}
        onChange={(e) => onChange(e.target.value)}
    /> );
}
 
export default SearchBar;


