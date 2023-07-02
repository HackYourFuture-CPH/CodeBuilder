import './NavbarForTags.css';
import {useState} from 'react';
import useSWR from "swr";
import { Tag } from "@/app/api/tags/route";
import { Option } from '../../snippets/snipetForm/interfaces';
import SearchBar from '../SearchBar/SearchBar';
import ApplyFilterButton from '../ApplyFilterButton/ApplyFilterButton';
import SelectTags from '../../snippets/snipetForm/SelectTags';

const NavbarForTags = (props: any) => {
    const [selectTags, setSelectTags] = useState<string[]>([]);

    const { data: tags } = useSWR<Tag[]>("/api/tags", async (url) => {
        const response = await fetch(url);
        return response.json();
    });
    

    const tagOptions: Option[] =
    tags?.map((tag) => ({
      value: tag.shortName,
      label: tag.displayName,
    })) || [];


    return (<div className='NavbarForTags'>
        <div className='TagsDisplay'>
            <SelectTags         placeholder="Select Tags"
        options={tagOptions}
        value={selectTags}
        onChange={(tags: string[]): void => setSelectTags(tags)}
        isMulti/>
        
        </div>
        <div className='TagsDisplay'>
        <ApplyFilterButton />
        <SearchBar />
        </div>
    </div> );
}
 
export default NavbarForTags;