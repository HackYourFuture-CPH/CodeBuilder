/** @format */

import { getMongoDb } from "@/app/mongodb";
import { NextRequest, NextResponse } from "next/server";

// POST snippet

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const db = getMongoDb();
    const body = await req.json();
    const postedSnippetId = await db.collection("snippets").insertOne(body);
    return NextResponse.json(postedSnippetId);
  } catch (error) {
    return NextResponse.json({
      message: "something went wrong",
      error: error,
    });
  }
}
