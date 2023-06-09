// task1 - list of all snippets
import { getMongoDb } from "@/app/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export interface Snippet {
  id: ObjectId;
  title: string;
  description: string;
  favoritedBy: string[];
  tags: string[];
  code: string;
  created_at: Date;
  updated_at: Date;
  author_id: string;
}

const snippets: Omit<Snippet, "_id">[] = [
  {
    id: new ObjectId(),
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
    id: new ObjectId(),
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
    id: new ObjectId(),
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
    id: new ObjectId(),
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
    id: new ObjectId(),
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

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const snippetsFromDatabase = await getMongoDb()
      .collection("snippets")
      .find({})
      .toArray();

    if (!snippetsFromDatabase.length) {
      await getMongoDb().collection("snippets").insertMany(snippets);
      return NextResponse.json(snippets);
    }

    return NextResponse.json(snippetsFromDatabase);
  } catch (error) {
    console.error("Error retrieving snippets from the database:", error);
    return new NextResponse(
      JSON.stringify({ error: "An error occurred while retrieving snippets" }),
      { status: 500 }
    );
  }
}
