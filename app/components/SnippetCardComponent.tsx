/** @format */

'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faHeart);
import Link from 'next/link';
import CodeEditor from './shared/codeEditor/code-editor';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import './snippetCard.css';
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ addToFavorite: userId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error publishing snippet');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    await setChanges(!changes);
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
              border: 'none',
              background: 'transparent',
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={() => handleFavoriteButton()}>
            {snippet.favoriteByIds.includes(userId) ? (
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
        <div className="title-container">
          <h1 className="title">{title}</h1>
        </div>
        <div className="description-container">
          <p className="description">{description}</p>
        </div>
        <div className="tags-container">
          <div className="button-container">
            <p className="tags">{tags}</p>
          </div>
        </div>

        <div className="card-footer">
          <div
            className="avatar-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              // position: 'absolute',
              // bottom: '10px',
              // left: '10px',
            }}>
            {/* <Image className="avatar"
 src="" alt="user profile pic" /> */}
            <p
              className="avatar-text"
              style={{
                margin: '0',
              }}>
              by {snippet.authorId} {formatDate(new Date(snippet.createdAt))}{' '}
            </p>
          </div>
          {session ? (
            <Link
              className="link-button"
              style={{
                textDecoration: 'none',
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                color: '#104D85',
              }}
              href={`/snippets/${snippet._id}`}>
              Learn more..
            </Link>
          ) : (
            <Link
              style={{
                textDecoration: 'none',
                position: 'absolute',
                bottom: '10px',
                right: '10px',
              }}
              href={`/login`}>
              Login to learn more
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnippetCardComponent;
