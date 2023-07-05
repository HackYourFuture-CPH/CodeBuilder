/* eslint-disable @next/next/no-img-element */
/** @format */

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faHeart);
import Link from "next/link";
import CodeEditor from "./shared/codeEditor/code-editor";
import { useSession } from "next-auth/react";
import Image from "next/image";
import "./snippetCard.css";
import { snippetModel } from "../snippetModel-DB";

export interface SnippetCardModel {
  snippet: snippetModel;
  title: string;
  description: string;
  tags: string[];
  snippetCode: string;
  formatDate: Function;
  mutate: Function;
  author?: string;
  authorImage?: string;
}

const SnippetCard = ({ snippet, formatDate, mutate }: SnippetCardModel) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleFavoriteButton = async () => {
    await fetch(`/api/snippets/${snippet._id}/favorite`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error publishing snippet");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    mutate();
  };
  return (
    <div className="container">
      <div className="code-group">
        <Link href={`/snippets/${snippet._id}`}>
          <div className="code-editor">
            <CodeEditor
              initialValue={snippet.snippetCode}
              readOnly={true}
              tags={snippet.tags}
            />
          </div>
        </Link>
        {session && (
          <button
            className="favorite-button"
            onClick={() => handleFavoriteButton()}
          >
            {userId && snippet.favoriteByIds?.includes(userId) ? (
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "#ff0000" }}
                size="2xl"
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: "#000000" }}
                size="2xl"
              />
            )}
          </button>
        )}
      </div>
      <div className="content-group">
        <div className="title-container">
          <h1 className="title">{snippet.title}</h1>
        </div>
        <div className="description-container">
          <p className="description">{snippet.description}</p>
        </div>
        <div className="tags-container">
          <div className="button-container">
            {snippet.tags?.map((item) => (
              <p className="tags" key={item}>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="card-footer">
          <div className="avatar-container">
            <div className="img-container">
              <img
                src={snippet.authorImage}
                alt="user profile pic"
                width={40}
                height={40}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
            <p
              className="avatar-text"
              style={{
                margin: "0",
              }}
            >
              by {snippet.author} {formatDate(new Date(snippet.createdAt))}
            </p>
          </div>
          {session ? (
            <Link className="link-button" href={`/snippets/${snippet._id}`}>
              Learn more
            </Link>
          ) : (
            <Link className="link-button" href={`/login`}>
              Login to learn more
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
