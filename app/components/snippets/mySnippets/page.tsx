"use client";
import { getSnippets } from "@/app/services/SnippetService";
import { snippetModel } from "@/app/snippetModel-DB";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";
import SnippetGallery from "../../SnippetsGallery";

const MySnippets = () => {
  const [buttonClicked, setButtonClicked] = useState("likedSnippets");
  const {
    data: snippetsData,
    mutate,
    error: snippetError,
    isLoading: isLoadingSnippets,
  } = useSWR<snippetModel[]>("/api/snippets", getSnippets);

  const { data: session } = useSession();
  const userId: any = session?.user?.email;

  if (snippetError) {
    return <div>Error fetching data</div>;
  }

  if (isLoadingSnippets) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setButtonClicked("likedSnippets")}>
          Liked Snippets
        </button>
        <button onClick={() => setButtonClicked("mySnippets")}>
          Created by you
        </button>
      </div>
      <SnippetGallery
        filteredSnippets={
          buttonClicked == "mySnippets"
            ? snippetsData!.filter((snippet) => snippet.authorId === userId)
            : snippetsData!.filter((snippet) =>
                snippet.favoriteByIds?.includes(userId)
              )
        }
        mutate={mutate}
      />
    </div>
  );
};

export default MySnippets;
