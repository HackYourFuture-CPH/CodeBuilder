"use client";
import React from "react";
import Link from "next/link";
import useSWR from "swr";
import { getSnippets } from "../../services/SnippetService";
import { useSession } from "next-auth/react";
import { snippetModel } from "../../snippetModel-DB";
import CodeEditor from "../../components/shared/codeEditor/code-editor";
import { addToFavorite } from "./handlers";
import "./page.css";

export default function SnippetDetails({ params }: { params: { id: string } }) {
  const id = params.id;
  const { data: snippet } = useSWR<snippetModel>(
    id ? `/api/snippets/${id}` : null,
    getSnippets
  );
  const { data: session } = useSession();
  const userId = session?.user?.email?.toString();

  return (
    <>
      {snippet ? (
        <div className="single-snippet-container">
          <div className="details-container">
            <div className="snippets-title">
              <h1>{snippet.title}</h1>

              <ul className="tags-list">
                {snippet.tags?.map((tag, i) => (
                  <li key={i} className="tag-item">
                    {tag}
                  </li>
                ))}
              </ul>

              {/* <p className="tags">{snippet.tags}</p> */}

              <p>{snippet.description}</p>
            </div>
            <div className="buttons">
              <li>
                {" "}
                <Link href={`/snippets/${id}/edit`}>
                  <button type="button" className="edit-button">
                    Edit
                  </button>
                </Link>
              </li>
              <li>
                <button
                  className="like-button"
                  type="button"
                  onClick={() =>
                    addToFavorite(id, snippet, userId ? userId : "")
                  }
                >
                  ❤️
                </button>
              </li>
            </div>
            <div>
              <p>{snippet.author}</p>
            </div>
          </div>
          <div className="code-snippet">
            <CodeEditor
              initialValue={snippet.snippetCode}
              readOnly={true}
              tags={snippet.tags}
            />
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  );
}
