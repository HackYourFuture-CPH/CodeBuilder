import './NavbarForTags.css';
import SearchBar from '../SearchBar/SearchBar';
import FilteredTag from '../FilteredTag/FilteredTag';
import ApplyFilterButton from '../ApplyFilterButton/ApplyFilterButton';

{/**
import SnippetGalleryTags from '../tags/Tag';
 */}
const NavbarForTags = () => {
    
    return (<div className='NavbarForTags'>
        <div className='TagsDisplay'>
            <FilteredTag />

            
            {/**<SnippetGalleryTags/> */}            
        </div>
        <div className='TagsDisplay'>
        <ApplyFilterButton />
        <SearchBar />
        </div>
    </div> );
}
 
export default NavbarForTags;