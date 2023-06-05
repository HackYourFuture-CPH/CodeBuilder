// task1 - list of all snippets

/* this is how I started, to check that it works:
import { NextResponse } from "next/server";
export async function GET(req: Request): Promise<NextResponse> {
  return NextResponse.json({ name: 'API route for all Snippets List' });
}
*/

//Then I used route.ts file from tags folder as a reference

import { getMongoDb } from "@/app/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export interface Snippet {
  _id: ObjectId;
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
  const snippetsFromDatabase = await getMongoDb()
    .collection("snippets")
    .find({})
    .toArray();

  if (!snippetsFromDatabase.length) {
    await getMongoDb().collection("snippets").insertMany(snippets);
    return NextResponse.json(snippets);
  }

  return NextResponse.json(snippetsFromDatabase);
}

const snippets: Omit<Snippet, "_id">[] = [
  {
    title: "Snippet1",
    description: "Snippet1 description",
    favoritedBy: [],
    tags: [],
    code: "Snippet1 code",
    created_at: new Date("2023-06-02 18:17:35"),
    updated_at: new Date("2023-06-02 18:19:35"),
    author_id: "Snippet1 author",
  },
  {
    title: "Snippet2",
    description: "Snippet2 description",
    favoritedBy: [],
    tags: [],
    code: "Snippet2 code",
    created_at: new Date("2023-06-02 18:17:35"),
    updated_at: new Date("2023-06-02 18:19:35"),
    author_id: "Snippet2 author",
  },
  {
    title: "Snippet3",
    description: "Snippet3 description",
    favoritedBy: [],
    tags: [],
    code: "Snippet3 code",
    created_at: new Date("2023-06-02 18:17:35"),
    updated_at: new Date("2023-06-02 18:19:35"),
    author_id: "Snippet3 author",
  },
  {
    title: "Snippet4",
    description: "Snippet4 description",
    favoritedBy: [],
    tags: [],
    code: "Snippet4 code",
    created_at: new Date("2023-06-02 18:17:35"),
    updated_at: new Date("2023-06-02 18:19:35"),
    author_id: "Snippet4 author",
  },
  {
    title: "Snippet5",
    description: "Snippet5 description",
    favoritedBy: [],
    tags: [],
    code: "Snippet5 code",
    created_at: new Date("2023-06-02 18:17:35"),
    updated_at: new Date("2023-06-02 18:19:35"),
    author_id: "Snippet5 author",
  },
];

/*
Due to the fact, that other routes go to this same file, they can be extended here:
// one snippet by id
// delete snippet by id
Other questions:
~Dynamic/Static? [id] or the same file?
~Should we have pages instead of app folder?
*/
