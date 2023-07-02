import './NavbarForTags.css';
import SearchBar from '../SearchBar/SearchBar';
import SnippetGallery from '../tags/Tag';
import ApplyFilterButton from '../ApplyFilterButton/ApplyFilterButton';

const NavbarForTags = () => {
    return (<div className='NavbarForTags'>
        navbar is being created here for tags and search bar!!
        <div className='TagsDisplay'>
        <SearchBar />
        <ApplyFilterButton />
        </div>
        <SnippetGallery />
    </div> );
}
 
export default NavbarForTags;