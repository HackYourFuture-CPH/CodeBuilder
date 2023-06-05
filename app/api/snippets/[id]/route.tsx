import { getMongoDb } from "@/app/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Update the snippet by ID

export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
  res: NextResponse
) {
  try {
    const snippetId = params.id;
    const body = await req.json();
    const db = getMongoDb();
    const updateOneSnippetFromDatabase = await db
      .collection("snippets")
      .updateOne({ _id: new ObjectId(snippetId) }, { $set: body });
    console.log(updateOneSnippetFromDatabase);
    return new NextResponse(JSON.stringify(updateOneSnippetFromDatabase));
  } catch (error) {
    NextResponse.json(error);
  }
}
