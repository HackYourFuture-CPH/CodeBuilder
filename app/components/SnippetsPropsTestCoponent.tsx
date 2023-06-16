"use client";
import useSWR from "swr";
import SnippetCardComponent from "./SnippetCardComponent";
import { snippetModel } from "../snippetModel-DB";

function SnippetsPropsTestCoponent() {
  // const fetcher = (arg: any, ...args: any) => fetch(arg, ...args).then(res => res.json())
  // const fetcher = (...args : string[]) => fetch(...args).then(res => res.json())
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/snippets", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      {data.map((snippet: snippetModel) => (
        <SnippetCardComponent
          key={snippet._id}
          title={snippet.title}
          description={snippet.description}
          favoriteByIds={snippet.favoriteByIds}
          tags={snippet.tags}
          snippetCode={snippet.snippetCode}
          createdAt={snippet.createdAt}
          updatedAt={snippet.updatedAt}
          authorId={snippet.authorId}
        />
      ))}
    </>
  );
}

export default SnippetsPropsTestCoponent;
