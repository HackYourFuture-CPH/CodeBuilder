import { getMongoDb } from "@/app/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

// get one snippet by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } //needs testing after changes
) {
  try {
    const snippetId = params.id;
    const db = getMongoDb();
    // console.log(snippetId);
    const oneSnippetFromDatabase = await db
      .collection("snippets")
      .findOne({ _id: new ObjectId(snippetId) });
    return NextResponse.json(oneSnippetFromDatabase);
    // new NextResponse(JSON.stringify(oneSnippetFromDatabase));
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}

// Update the snippet by ID
export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    const snippetId = params.id;
    const updatedField = await req.json();

    const db = getMongoDb();
    const updateOneSnippetFromDatabase = await db
      .collection("snippets")
      .updateOne(
        { _id: new ObjectId(snippetId) },
        { $set: updatedField }
      );

    if (updateOneSnippetFromDatabase.modifiedCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Snippet not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify({ success: true }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong", error }),
      { status: 500 }
    );
  }
}

// delete one snippet
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const snippetId = params.id;
    const db = getMongoDb();
    // console.log(snippetId);
    const oneSnippetFromDatabase = await db
      .collection("snippets")
      .deleteOne({ _id: new ObjectId(snippetId) });
    return new NextResponse(JSON.stringify(oneSnippetFromDatabase));
  } catch (error) {
    // console.error("Error retrieving snippets from the database:", error);
    return new NextResponse(
      JSON.stringify({ error: "An error occurred while retrieving snippets" }),
      { status: 500 }
    );
  }
}
