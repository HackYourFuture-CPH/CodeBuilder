// import { SnippetData } from "./interfaces";

// export const handlePublish = (): void => {
//     const snippetData: SnippetData = {
//         title: title,
//         description: description,
//         snippetCode: code,
//         tags: selectTags,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     };

//     fetch("/api/snippets", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(snippetData),
//     })
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error("Error publishing snippet");
//             }
//         })
//         .then((data) => {
//             router.push(`/snippets/${data.insertedId}`);
//         })
//         .catch((error) => {
//             console.error(error);
//         });
// };