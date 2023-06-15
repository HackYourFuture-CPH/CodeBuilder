export const sendSnippet = async (url:string, { arg }: { arg: { 
    title: string;
    description: string;
    favoriteByIds: string[];
    tags: string[];
    snippetCode: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;

  }}) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg)
    });
    return await res.json();
  };



  export const getSnippets = async (url:string) => {
    const response = await fetch(url);
  
    if (!response.ok) throw new Error("Unable to fetch snippets.");
  
    return response.json();
  };


  export const updateSnippet = async (url: string, id: string, snippetData: { 
    title?: string;
    description?: string;
    favoriteByIds?: string[];
    tags?: string[];
    snippetCode?: string;
    updatedAt?: Date;
    authorId?: string;

  }) => {
    const res = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(snippetData)
    });

    if (!res.ok) {
        throw new Error("Unable to update snippet.");
    }

    return await res.json();
};