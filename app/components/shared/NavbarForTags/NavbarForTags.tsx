import './NavbarForTags.css';
import { useState } from 'react'; 
import SearchBar from '../SearchBar/SearchBar';
import FilteredTag from '../FilteredTag/FilteredTag';
import ApplyFilterButton from '../ApplyFilterButton/ApplyFilterButton';

const NavbarForTags = () => {
    const [filteresTagItem, setFilteresTagItem] = useState();

    return (<div className='NavbarForTags'>
        <div className='TagsDisplay'>
            <FilteredTag />

            
        
        </div>
        <div className='TagsDisplay'>
        <ApplyFilterButton />
        <SearchBar />
        </div>
    </div> );
}
 
export default NavbarForTags;