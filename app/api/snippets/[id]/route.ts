// get one snippet by id

import { getMongoDb } from "@/app/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: { id: string } } //needs testing after changes
) {
  try {
    const snippetId = params.id;
    const db = getMongoDb();
    console.log(snippetId);
    const oneSnippetFromDatabase = await db
      .collection("snippets")
      .findOne({ _id: new ObjectId(snippetId) });
    return new NextResponse(JSON.stringify(oneSnippetFromDatabase));
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}
