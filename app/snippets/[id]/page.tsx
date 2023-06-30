"use client";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { getSnippets } from "../../services/SnippetService";
import { useSession } from "next-auth/react";
import { snippetModel } from "../../snippetModel-DB";
import CodeEditor from "../../components/shared/codeEditor/code-editor";
import { addToFavorite, normalizeDate } from "./handlers";

export default function SnippetDetails({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data: snippet } = useSWR<snippetModel>(
    `/api/snippets/${id}`,
    getSnippets
  );
  const { data: session } = useSession();
  const userId = session?.user?.email?.toString();

  return (
    <>
      {snippet ? (
        <div>
          <div>
            <div>
              <h1>{snippet.title}</h1>
              <ul>
                {snippet?.tags?.map((tag: string) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <p>{snippet.description}</p>
            </div>
            <div>
              <div>
                {" "}
                <Link href={`/snippet/${id}/edit`}>
                  <button type="button">Edit</button>
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    addToFavorite(id, snippet, userId ? userId : "")
                  }
                >
                  ❤️
                </button>
              </div>
              <p>
                {snippet.authorId} {normalizeDate(new Date(snippet.updatedAt))}
              </p>
            </div>
          </div>
          <CodeEditor
            initialValue={snippet.snippetCode}
            readOnly={true}
            tags={snippet.tags}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
