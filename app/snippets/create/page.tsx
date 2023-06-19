"use client";
import useSWRMutation from 'swr/mutation'
import {sendSnippet}  from "../../services/SnippetService";
// import { useRouter } from 'next/navigation'

const CreateSnippet: React.FC = () => {

  const { trigger, isMutating } = useSWRMutation('/api/snippets', sendSnippet);
  // const router: any = useRouter();
  
 
  return (
    <>
      <div>And here we have page for creating a new snippet</div>
      <button
        disabled={isMutating}
        onClick={() => trigger({
          "title": "TEST111",
          "description": "Creating TEST",
          "favoriteByIds": [
              "randomuser1"
          ],
          "tags": [
              "HTML",
              "Lists"
          ],
          "snippetCode": "<h2>My List</h2>\n\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n\n<ol>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ol>",
          "createdAt": new Date(),
          "updatedAt": new Date(),
          "authorId": "TEST2"
        },
        // router.push('/snippets').refresh('/snippets')
        
        )}
      >{
        isMutating ? 'Creating...' : 'Create Snippet'
      }</button>
    </>
  )
};
export default CreateSnippet;
