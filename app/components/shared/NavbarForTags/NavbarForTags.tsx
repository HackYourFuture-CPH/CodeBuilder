import './NavbarForTags.css';
import SearchBar from '../SearchBar/SearchBar';
import SnippetGallery from '../tags/Tag';
import BasicButtons from '../ApplyFilterButton/ApplyFilterButton';

const NavbarForTags = () => {
    return (<div className='NavbarForTags'>
        navbar is being created here for tags and search bar!!
        <SearchBar />
        <SnippetGallery />
        <BasicButtons />
    </div> );
}
 
export default NavbarForTags;