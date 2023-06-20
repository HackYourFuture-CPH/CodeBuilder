import build from "next/dist/build"
import React from 'react';
import useSWR from 'swr';
import { snippetModel } from "@/app/snippetModel-DB";
//import { snippetModel } from '../snippetModel-DB';

const UserId: React.FC = () => {
  
  const getAllSnippets = async (): Promise<snippetModel[]> => {
    try {
    
      const response = await fetch('/api/snippets');
      if (!response.ok) {
        throw new Error('Failed to fetch snippets');
      }
  
      const snippets: snippetModel[] = await response.json();
      return snippets;
    } catch (error) {
      console.error('Error fetching snippets:', error);
      throw error;
    }
  };
  

  const { data: snippets } = useSWR<snippetModel[]>('/api/snippets', getAllSnippets);

  return (
    <>
      <p>
        This component (route) will be used as the page after the user logs in.
        Here, we will show all snippets created by the logged-in user.
      </p>
      <ul>
        {snippets ? (
          snippets.map((snippet: snippetModel) => (
            <li key={snippet._id}>
              <h2>{snippet.title}</h2>
              <p>{snippet.createdAt.slice(0, 10)}</p>
              <p>{snippet.snippetCode}</p>
            </li>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </ul>
    </>
  );
};

export default UserId;

/*"use client";
import useSWR from 'swr'
import getA
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
export default UserId; */