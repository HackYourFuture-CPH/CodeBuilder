import { getMongoDb } from "@/app/mongodb";
import { NextResponse } from "next/server";

export interface Snippet {
  title: string;
  description: string;
  favorite: string[];
  tags: string[];
  code: string;
  created_at: Date;
  updated_at: Date;
  author_id: string;
  _id?: string;
}

export async function GET(req: Request): Promise<NextResponse> {
  const snippetsFromDatabase = await getMongoDb()
    .collection("snippets")
    .find({})
    .toArray();

  // Pre-seed database, so we're not starting from scratch
  if (!snippetsFromDatabase.length) {
    await getMongoDb().collection("snippets").insertMany(snippets);
    return NextResponse.json(snippets);
  }

  return NextResponse.json(snippetsFromDatabase);
}

const snippets: Omit<Snippet, "_id">[] = [
  {
    title: "Database",
    description: "Do Not Works",
    favorite: ["1", "2"],
    tags: ["React", "Turbo Pascal"],
    code: "writeln('something wrong')",
    created_at: new Date(),
    updated_at: new Date(),
    author_id: "1",
  },
  {
    title: "React",
    description: "Do Not Works",
    favorite: ["3", "4"],
    tags: ["Foo", "Bar"],
    code: "writeln('something wrong')",
    created_at: new Date(),
    updated_at: new Date(),
    author_id: "2",
  },
];
