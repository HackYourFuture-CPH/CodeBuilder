"use client";
import useSWR from 'swr'
import { getAllSnippets } from '../../service/SnippetService';
import { snippetModel } from '../snippetModel-DB';
const UserId: React.FC = () => {
  const { data: snippets } = useSWR<snippetModel[]>('/api/snippets', getAllSnippets);
  return (
    <>
      <p>
        This component(route) we will use as the page after the user logs in Here
        we gonna show all snippets, created by logged in user
      </p>
      <ul>
        {snippets ?
          snippets.map((snippet: any) => (
            <li key={snippet._id}>
              <h2>{snippet.title}</h2>
              <p>{snippet.createdAt.slice(0, 10)}</p>
              <p>{snippet.snippetCode}</p>
            </li>
          ))
          :
          <div>Loading...</div>
        }
      </ul>
    </>
  );
};
export default UserId;