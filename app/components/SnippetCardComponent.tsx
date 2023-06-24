"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faHeart);
import Link from "next/link";
import CodeEditor from "./shared/codeEditor/code-editor";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SnippetCardComponent = ({
  snippet,
  title,
  description,
  tags,
  snippetCode,
  formatDate,
  changes,
  setChanges,
}: any) => {
  const { data: session } = useSession();
  const userId = session?.user?.email;

  const handleFavoriteButton = async () => {
    await fetch(`/api/snippets/${snippet._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ addToFavorite: userId }),
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
    await setChanges(!changes);
  };

  return (
    <div>
      <Link href={`/snippets/${snippet._id}`}>
        <CodeEditor initialValue={snippetCode} readOnly={true} tags={tags} />
      </Link>
      {session && (
        <button
          className="favorite-button"
          style={{
            border: "none",
            background: "transparent",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
          onClick={() => handleFavoriteButton()}
        >
          {snippet.favoriteByIds.includes(userId) ? (
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

      <h1>{title}</h1>
      <p>{description}</p>
      <p>{tags}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "absolute",
          bottom: "10px",
          left: "10px",
        }}
      >
        {/* <Image src="" alt="user profile pic" /> */}
        <p
          style={{
            margin: "0",
          }}
        >
          by {snippet.authorId} {formatDate(new Date(snippet.createdAt))}{" "}
        </p>
      </div>
      {session ? (
        <Link
          style={{
            textDecoration: "none",
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}
          href={`/snippets/${snippet._id}`}
        >
          Learn more..
        </Link>
      ) : (
        <Link
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
  );
};

export default SnippetCardComponent;
