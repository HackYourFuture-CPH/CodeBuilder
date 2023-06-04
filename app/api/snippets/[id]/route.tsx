// one snippet by id

import { getMongoDb } from "@/app/mongodb";
import { NextResponse } from "next/server";

export interface Snippet {
    id: string;
    title: string;
    description: string;
    favoritedBy: string[];
    tags: string[];
    code: string;
    created_at: Date;
    updated_at: Date;
    author_id: string;
}

export async function GET(req: Request): Promise<NextResponse> {
  const snippetFromDatabase = await getMongoDb()
    .collection("snippets")
    .find({id:url})
  }

  return new NextResponse(JSON.stringify(snippetFromDatabase));
}


















/*import { getMongoDb } from "@/app/mongodb";
//import { useRouter, NextResponse } from "next/server";

export default function Id() {
return (
 <div>
 <h1>hi</h1>
 </div>
);
  }

import { useRouter } from "next/router";

export default function Snippet () {
    const router = useRouter()
    const { id } = router.query

    return <h1>Hello {id}</h1>
}*/






//const Router = useRouter;



