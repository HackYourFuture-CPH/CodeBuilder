"use client";
import React from "react";
import "./Tag.css";
import useSWR from "swr";
import { useSession } from 'next-auth/react'
import { getSnippets } from "@/app/services/SnippetService";
import { snippetModel } from "@/app/snippetModel-DB";
import { addToFavorite } from "@/app/snippets/[id]/handlers";
import { normalizeDate } from "@/app/snippets/[id]/handlers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
library.add(faHeart);



const SnippetGallery = () => {

{/**
const { data: session } = useSession();
const userId = session?.user?.email?.toString();
 */}
  let userId = "";
  
    const { data: snippets } = useSWR<snippetModel[]>(
      "/api/snippets",
      getSnippets
    );
    


  return (
    <ul  className="Tags_unordered_list" >
      {snippets?.map((snippet) => {
        return (
          <li className="Tags_list"
            key={snippet._id}
          >
            <button
              className="favorite-button"
              disabled={userId ? false : true}
              onClick={() => addToFavorite(snippet._id, snippet, userId ? userId : "")}
            >
              {userId && snippet.favoriteByIds.includes(userId) ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "#D25B5B" }}
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

            <div className="Tags_sippet_cards">
              snippet card
              {/* <SnippetCard snippet={snippet} /> */}

            

            </div>

            <div className="Tags_AuthorDetails">
              {/* <img src="" alt="user profile pic" /> */}


              <p>
                by {snippet.authorId}{" "}
                {normalizeDate(new Date(snippet.createdAt))}{" "}
              </p>
            </div>

            <Link
              className="Tags_links"
              href={userId ? `/snippets/${snippet._id}` : "/snippets"}
            >
              Learn more..
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SnippetGallery; 



{
  /**

 const SnippetGallery = () => {
   return ( 
     <div className="Tags_unordered_list">
       tags will be export here!!!
     </div>
    );
 }
  
 export default SnippetGallery;
   * 
  */ }