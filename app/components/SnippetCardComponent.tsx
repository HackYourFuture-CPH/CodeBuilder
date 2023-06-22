"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faHeart);
import Link from "next/link";
import CodeEditor from "./shared/codeEditor/code-editor";
import { useSession } from "next-auth/react";
import Image from "next/image";
import './snippetCard.css'; 

const SnippetCardComponent = ({
  snippet,
  title,
  description,
  tags,
  snippetCode,
  markAsFavorite,
  formatDate,
}: any) => {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="container">
      <div className="card">
        <div className=" code-group">
          <div className="code-editor">
            <CodeEditor  
              initialValue={snippetCode}
              readOnly={true}
              tags={tags}
            />
          </div>
          {session && (
            <button
              className="favorite-button"
              style={{
                border: 'none',
                background: 'transparent',
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
              onClick={() => markAsFavorite(snippet._id)}>
              {snippet.favorite ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: '#ff0000' }}
                  size="2xl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: '#000000' }}
                  size="2xl"
                />
              )}
            </button>
          )}
        </div>
        <div className="content-group">
          <h1 className="title">{title}</h1>
          <p className="description">{description}</p>
          <p className="tags">{tags}</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              bottom: '10px',
              left: '10px',
            }}>
            <Image
              className=""
              src=""
              alt="user profile pic"
            />
            <p
              className="avatar-text"
              style={{
                margin: '0',
              }}>
              by {snippet.authorId} {formatDate(new Date(snippet.createdAt))}{' '}
            </p>
          </div>
          <div className="info-frame">
            {session ? (
              <Link
               
                style={{
                  textDecoration: 'none',
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                }}
                href={`/snippets/${snippet._id}`}>
                Learn more..
              </Link>
            ) : (
              <Link
                className="link-button"
                style={{
                  textDecoration: 'none',
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                }}
                href={`/login`}>
                learn more
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetCardComponent;
