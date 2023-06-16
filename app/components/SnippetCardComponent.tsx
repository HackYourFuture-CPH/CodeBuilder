"use client";

const SnippetCardComponent = ({
  title,
  description,
  favoriteByIds,
  tags,
  snippetCode,
  createdAt,
  updatedAt,
  authorId,
}: any) => {
  return (
    <div>
      <p>{snippetCode}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{favoriteByIds}</p>
      <p>{tags}</p>
      <p>{createdAt}</p>
      <p>{updatedAt}</p>
      <p>{authorId}</p>
    </div>
  );
};

export default SnippetCardComponent;
