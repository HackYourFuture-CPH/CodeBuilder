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
      {/* Add to favorite button */}
      <p>{favoriteByIds}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{tags}</p>
      <p>{createdAt}</p>
      <p>{updatedAt}</p>
      <p>{authorId}</p>
      {/* Button "Load More" with ref to snippet by id */}
    </div>
  );
};

export default SnippetCardComponent;
