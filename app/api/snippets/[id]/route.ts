import { getMongoDb } from "../../../mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";

// get one snippet by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  res: NextResponse;
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
  },
  res: NextResponse
) {
  // I'm trying to modify the API so that can be used to update an array favoriteByIds.
  // we can use a user name instead of an id
  // const session = await getServerSession(authOptions)
  // const userId = session?.user?.email;
  // console.log(session)
  try {
    const snippetId = params.id;
    const body = await req.json();
    const db = getMongoDb();
    const updateOneSnippetFromDatabase = await db
      .collection("snippets")
      .updateOne({ _id: new ObjectId(snippetId) }, { $set: body });
    const oneSnippetFromDatabase = await db
      .collection("snippets")
      .findOne({ _id: new ObjectId(snippetId) });
    // if a user in array, we delete him
    // if (oneSnippetFromDatabase?.favoriteByIds.include("randomuser1")) {
    //   await db
    //     .collection("snippets")
    //     .updateOne({ _id: new ObjectId(snippetId) },
    //       { $pull: { favoriteByIds: { $in: ["randomuser1"] } } });
    // } else {
    //   // if a usr not in array, we add him
    //   await db
    //     .collection("snippets")
    //     .updateOne({ _id: new ObjectId(snippetId) },
    //       { $addToSet: { favoriteByIds: "randomuser1" } })

    // }
    return new NextResponse(JSON.stringify(updateOneSnippetFromDatabase));
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
  res: NextResponse;
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
