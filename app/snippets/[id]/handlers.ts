import { mutate } from "swr";
import { snippetModel } from "@/app/snippetModel-DB";
import { updateSnippet } from "@/app/services/SnippetService";

export const addToFavorite = async (
    idSnippet: string,
    snippet: snippetModel,
    userId: string
) => {
    const users: string[] = [...(snippet?.favoriteByIds || [])];
    console.log(users);
    if (userId && !snippet?.favoriteByIds.includes(userId)) {
        const updateFavorites: string[] = [...users, userId];
        console.log(updateFavorites);
        const updateSnippetRequest = await updateSnippet(
            "http://localhost:3000/api/snippets",
            idSnippet,
            {
                favoriteByIds: updateFavorites,
            }
        );
        mutate(`/api/snippets/${idSnippet}`, updateSnippetRequest, {
            optimisticData: (snippet: any) => ({
                ...snippet,
                favoriteByIds: updateFavorites,
            }),
            rollbackOnError: true,
        });
    }
    if (userId && snippet?.favoriteByIds.includes(userId)) {
        const updateFavorites = users.filter((user) => user !== userId);
        const updateSnippetRequest = await updateSnippet(
            "http://localhost:3000/api/snippets",
            idSnippet,
            {
                favoriteByIds: updateFavorites,
            }
        );
        mutate(`/api/snippets/${idSnippet}`, updateSnippetRequest, {
            optimisticData: (snippet: any) => ({
                ...snippet,
                favoriteByIds: updateFavorites,
            }),
            rollbackOnError: true,
        });
    }
};


export const normalizeDate = (dateString: Date) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
};