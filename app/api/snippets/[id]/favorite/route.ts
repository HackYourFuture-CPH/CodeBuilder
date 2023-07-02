import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getMongoDb } from "@/app/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

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
    const db = getMongoDb();

    const userId = session?.user?.id;
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
  } catch (error) {
    return NextResponse.json(
      {
        message: "something went wrong",
        error: error,
      },
      { status: 500 }
    );
  }
}
