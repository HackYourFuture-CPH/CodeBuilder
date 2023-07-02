import { getMongoDb } from "@/app/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const queryParams = new URLSearchParams(req.url.split("?")[1]);
  const userId = queryParams.get("userId") as string;
  const myFavorite = await getMongoDb()
    .collection("snippets")
    .find({ favoriteByIds: userId })
    .toArray();
  return NextResponse.json(myFavorite);
}
