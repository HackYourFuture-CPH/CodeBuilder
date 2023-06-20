// "use client";
// import { useState, useEffect } from "react";
// import { snippetModel } from "./snippetModel-DB";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faHeart } from "@fortawesome/free-solid-svg-icons";
// // import { library } from "@fortawesome/fontawesome-svg-core";
// import SnippetCardComponent from "./components/SnippetCardComponent";
// // import Link from "next/link";
// import Navbar from "./navbar";

// type favoriteSnippet = snippetModel & { favorite: boolean };

// const SnippetGallery = () => {
//   const [snippets, setSnippets] = useState<favoriteSnippet[]>([]);

//   useEffect(() => {
//     const fetchSnippets = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/snippets");
//         const snippets = await response.json();
//         setSnippets(snippets);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchSnippets();
//   }, []);

//   const markAsFavorite = (snippetId: string) => {
//     const updatedSnippets = snippets.map((snippet) => {
//       if (snippet._id === snippetId) {
//         return { ...snippet, favorite: !snippet.favorite };
//       }
//       return snippet;
//     });

//     setSnippets(updatedSnippets);
//   };

//   const formatDate = (date: Date) => {
//     const day = date.getDate();
//     const month = date.toLocaleString("default", { month: "short" });
//     const year = date.getFullYear();

//     return `${day} ${month} ${year}`;
//   };

//   return (
//     <>
//       <header>
//         {/* Navbar */}
//         <Navbar />
//       </header>
//       <ul
//         style={{
//           padding: "3em",
//           display: "grid",
//           gridGap: "3em",
//           gridTemplateColumns: "repeat(auto-fit, minmax(600px, 1fr))",
//         }}
//       >
//         {snippets?.map((snippet) => {
//           return (
//             <li
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "10px",
//                 padding: "2em",
//                 borderRadius: ".3em",
//                 boxShadow: "10px 10px 30px rgba(0,0,0,0.1)",
//                 listStyle: "none",
//                 position: "relative",
//               }}
//               key={snippet._id}
//             >
//               {/* <button
//               className="favorite-button"
//               style={{
//                 border: "none",
//                 background: "transparent",
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//               }}
//               onClick={() => markAsFavorite(snippet._id)}
//             >
//               {snippet.favorite ? (
//                 <FontAwesomeIcon
//                   icon={faHeart}
//                   style={{ color: "#ff0000" }}
//                   size="2xl"
//                 />
//               ) : (
//                 <FontAwesomeIcon
//                   icon={faHeart}
//                   style={{ color: "#000000" }}
//                   size="2xl"
//                 />
//               )}
//             </button> */}

//               <div
//                 style={{
//                   height: "573px",
//                 }}
//               >
//                 <SnippetCardComponent
//                   snippet={snippet}
//                   key={snippet._id}
//                   title={snippet.title}
//                   description={snippet.description}
//                   tags={snippet.tags}
//                   snippetCode={snippet.snippetCode}
//                   markAsFavorite={markAsFavorite}
//                   formatDate={formatDate}
//                 />
//               </div>

//               {/* <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 position: "absolute",
//                 bottom: "10px",
//                 left: "10px",
//               }}
//             >
//               <img src="" alt="user profile pic" />
//               <p
//                 style={{
//                   margin: "0",
//                 }}
//               >
//                 by {snippet.authorId} {formatDate(new Date(snippet.createdAt))}{" "}
//               </p>
//             </div> */}

//               {/* <Link
//               style={{
//                 textDecoration: "none",
//                 position: "absolute",
//                 bottom: "10px",
//                 right: "10px",
//               }}
//               href="/learn-more"
//             >
//               Learn more..
//             </Link> */}
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// };

// export default SnippetGallery;
