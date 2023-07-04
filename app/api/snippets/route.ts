import { getMongoDb } from "../../mongodb";
import { snippetModel } from "../../snippetModel-DB";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const snippetsFromDatabase = await getMongoDb()
      .collection("snippets")
      .find({})
      .toArray();

    return NextResponse.json(snippetsFromDatabase);
  } catch (error) {
    console.error("Error retrieving snippets from the database:", error);
    return new NextResponse(
      JSON.stringify({ error: "An error occurred while retrieving snippets" }),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          message: "Not logged in",
        },
        { status: 401 }
      );
    } else {
      const userId = session?.user?.id;
      const userName = session?.user?.name;
      const userImage = session?.user?.image;
      const db = getMongoDb();
      const body = await req.json();
      const postedSnippetId = await db.collection("snippets").insertOne({
        title: body.title,
        description: body.description,
        tags: body.tags?.map((tag: { label: string }) => tag.label) ?? [],
        snippetCode: body.snippetCode,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        authorId: userId,
        author: userName,
        authorImage: userImage,
        favoriteByIds: [],
      });
      return NextResponse.json(postedSnippetId);
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error,
      },
      { status: 500 }
    );
  }
}

async function init(snippets: Omit<snippetModel, "_id">[]) {
  // Pre-seed database, so we're not starting from scratch
  const initVal = await getMongoDb().collection("snippets").find({}).toArray();
  if (initVal.length == 0) {
    // Insert default snippets into the database
    await getMongoDb().collection("snippets").insertMany(snippets);
  }
}
