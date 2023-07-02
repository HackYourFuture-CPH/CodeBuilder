import './SearchBar.css'

const SearchBar = () => {
    const BarStyle = {
        width: "20rem", background: "#F0F0F0", border: "none", }
        
    return (
        <input 
        style={BarStyle}
        key="search-bar"
        placeholder={"search news"}
    /> );
}
 
export default SearchBar;


