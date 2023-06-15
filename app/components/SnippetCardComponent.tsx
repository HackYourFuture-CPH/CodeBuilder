"use client"

const SnippetCardComponent = ({title,description, favorite, tags, code, created_at, updated_at, author_id}) => {
    return(
<div>
    <p>{title}</p>
    <p>{description}</p>
    <p>{favorite}</p>
    <p>{tags}</p>
    <p>{code}</p>
    <p>{created_at}</p>
    <p>{updated_at}</p>
    <p>{author_id}</p>
</div>    )
console.log(title,description, favorite, tags, code, created_at, updated_at, author_id)
};

export default SnippetCardComponent;