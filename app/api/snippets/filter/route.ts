import { snippetModel } from "@/app/snippetModel-DB";
import { getMongoDb } from "@/app/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const description = req.nextUrl.searchParams.get("description") || "";
  console.log(description);
  const tags =
    !!req.nextUrl.searchParams.get("tags") || ""
      ? (req.nextUrl.searchParams.get("tags") || "").split(",")
      : [];
  const title = req.nextUrl.searchParams.get("title") || "";

  let filters = {};
  if (description) {
    filters = {
      description: { $regex: description, $options: "i" },
    };
  }
  if (title) {
    filters = {
      ...filters,
      title: { $regex: title, $options: "i" },
    };
  }
  if (tags.length > 0) {
    filters = {
      ...filters,
      tags: { $in: tags },
    };
  }
  const snippetsFromDatabase = await getMongoDb()
    .collection("snippets")
    .find(filters)
    .toArray();
  return NextResponse.json(snippetsFromDatabase);
}

async function init(snippets: Omit<snippetModel, "_id">[]) {
  // Pre-seed database, so we're not starting from scratch
  const initVal = await getMongoDb().collection("snippets").find({}).toArray();
  if (initVal.length == 0) {
    // Insert default snippets into the database
    await getMongoDb().collection("snippets").insertMany(snippets);
  }
}
