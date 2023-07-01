/** @format */

import { getMongoDb } from "@/app/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// get one snippet by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  res: NextResponse;
  try {
    const snippetId = params.id;
    const db = getMongoDb();
    const oneSnippetFromDatabase = await db
      .collection("snippets")
      .findOne({ _id: new ObjectId(snippetId) });
    return NextResponse.json(oneSnippetFromDatabase);
  } catch (error) {
    NextResponse.json(error);
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
    const session = await getServerSession(authOptions);
    const snippetId = params.id;
    const body = await req.json();
    const db = getMongoDb();

    if (body.addToFavorite) {
      const userId = session?.user?.email;
      const oneSnippetFromDatabase = await db
        .collection("snippets")
        .findOne({ _id: new ObjectId(snippetId) });
      if (oneSnippetFromDatabase?.favoriteByIds.includes(userId)) {
        await db
          .collection("snippets")
          .updateOne(
            { _id: new ObjectId(snippetId) },
            { $pull: { favoriteByIds: { $in: [userId] } } }
          );
        return new NextResponse(JSON.stringify({ message: "user removed" }));
      } else {
        await db
          .collection("snippets")
          .updateOne(
            { _id: new ObjectId(snippetId) },
            { $addToSet: { favoriteByIds: userId } }
          );

        return new NextResponse(JSON.stringify({ message: "user added" }));
      }
    } else {
      const updateOneSnippetFromDatabase = await db
        .collection("snippets")
        .updateOne({ _id: new ObjectId(snippetId) }, { $set: body });
      return new NextResponse(JSON.stringify(updateOneSnippetFromDatabase));
    }
  } catch (error) {
    return NextResponse.json({
      message: "something went wrong",
      error: error,
    });
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
    const oneSnippetFromDatabase = await db
      .collection("snippets")
      .deleteOne({ _id: new ObjectId(snippetId) });
    return new NextResponse(JSON.stringify(oneSnippetFromDatabase));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "An error occurred while retrieving snippets" }),
      { status: 500 }
    );
  }
}
