import { getMongoDb } from "@/app/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const queryParams = new URLSearchParams(req.url.split("?")[1]);
  const userId = queryParams.get("userId") as string;
  const mySnippets = await getMongoDb()
    .collection("snippets")
    .find({ authorId: userId })
    .toArray();
  return NextResponse.json(mySnippets);
}
