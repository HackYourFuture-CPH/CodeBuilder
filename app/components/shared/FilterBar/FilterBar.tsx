import './FilterBar.css';
import useSWR from "swr";
import SelectTags from '../../snippets/snipetForm/SelectTags';
import { Tag } from "@/app/api/tags/route";


export interface Option {
  label: string;
  value: string;
}



const FilterBar = (props: any) => {
  
  const { data: tags } = useSWR<Tag[]>("/api/tags", async (url) => {
    const response = await fetch(url);
    return response.json();
  });
  
  
  const tagOptions: Option[] =
  tags?.map((tag) => ({
    value: tag.shortName,
    label: tag.displayName,
  })) || [];

  
    return (<div className='FilterBar_Container'>
          <SelectTags
            placeholder="Select Tags"
            options={tagOptions}
            value={props.selectTags}
            onChange={(tags: string[]): void => props.setSelectTags(tags)}
            isMulti
        />
        Filters will be rendered here!!!
    </div> );
}
 
export default FilterBar;