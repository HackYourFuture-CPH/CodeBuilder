/** @format */

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faHeart);
import Link from "next/link";
import CodeEditor from "./shared/codeEditor/code-editor";
import { useSession } from "next-auth/react";
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
}

const SnippetCard = ({
  snippet,
  title,
  description,
  tags,
  snippetCode,
  formatDate,
  mutate,
}: SnippetCardModel) => {
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
              initialValue={snippetCode}
              readOnly={true}
              tags={tags}
            />
          </div>
        </Link>
        {session && (
          <button
            className="favorite-button"
            style={{
              border: "none",
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
            onClick={() => handleFavoriteButton()}
          >
            {userId && snippet.favoriteByIds.includes(userId) ? (
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
          <h1 className="title">{title}</h1>
        </div>
        <div className="description-container">
          <p className="description">{description}</p>
        </div>
        <div className="tags-container">
          <div className="button-container">
            {snippet.tags?.map((item) => (
              <p className="tags" key={item}>
                {item}
              </p>
            ))}
            <p className="tags">{tags}</p>
          </div>
        </div>

        <div className="card-footer">
          <div
            className="avatar-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="img-container">
              <img
                src={
                  session?.user?.image
                    ? session.user.image
                    : "fallback-image-url"
                }
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
              by {snippet.authorId} {formatDate(new Date(snippet.createdAt))}
            </p>
          </div>
          {session ? (
            <Link
              className="link-button"
              style={{
                textDecoration: "none",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
              href={`/snippets/${snippet._id}`}
            >
              Learn more
            </Link>
          ) : (
            <Link
              className="link-button"
              style={{
                textDecoration: "none",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
              href={`/login`}
            >
              Login to learn more
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
