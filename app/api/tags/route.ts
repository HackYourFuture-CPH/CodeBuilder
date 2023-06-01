import { getMongoDb } from "@/app/mongodb";
import { NextResponse } from "next/server";
import { snippetModel } from "@/app/DB-model";

export interface Tag {
  displayName: string;
  shortName: string;
  _id?: string;
}

// this is how our fellow developers should use DB-model interface 
export async function GET(req: Request): Promise<NextResponse> {
  const tagsFromDatabase = await getMongoDb()
    .collection<Tag>("tags")
    .find({})
    .toArray();
// const snippets = await getMongoDb().collection<snippetModel>("snippets").find({}).toArray();


  // Pre-seed database, so we're not starting from scratch
  if (!tagsFromDatabase.length) {
    await getMongoDb().collection<Tag>("tags").insertMany(tags);
    return NextResponse.json(tags);
  }

  return NextResponse.json(tagsFromDatabase);
}

/**
 * This data can be used to pre-seed the database.
 */
const tags: Omit<Tag, "_id">[] = [
  {
    displayName: "React",
    shortName: "reactjs",
  },
  {
    displayName: "JavaScript",
    shortName: "js",
  },
  {
    displayName: "HTML",
    shortName: "html",
  },
  {
    displayName: "CSS",
    shortName: "css",
  },
  {
    displayName: "Git",
    shortName: "git",
  },
  {
    displayName: "SQL & Databases",
    shortName: "sql",
  },
  {
    displayName: "MySQL",
    shortName: "mysql",
  },
  {
    displayName: "Node.js",
    shortName: "nodejs",
  },
  {
    displayName: "NPM",
    shortName: "npm",
  },
  {
    displayName: "Browser & DOM",
    shortName: "dom",
  },
  {
    displayName: "Visual Studio Code",
    shortName: "vscode",
  },
  {
    displayName: "MongoDb",
    shortName: "mongodb",
  },
  {
    displayName: "JSON",
    shortName: "json",
  },
  {
    displayName: "RegEx",
    shortName: "regex",
  },
  {
    displayName: "AJAX",
    shortName: "ajax",
  },
  {
    displayName: "Fetch",
    shortName: "fetch",
  },
  {
    displayName: "Typescript",
    shortName: "ts",
  },
  {
    displayName: "CSS Animations",
    shortName: "animations",
  },
  {
    displayName: "Firebase",
    shortName: "firebase",
  },
  {
    displayName: "Next.js",
    shortName: "nextjs",
  },
  {
    displayName: "API",
    shortName: "api",
  },
  {
    displayName: "Algorithm",
    shortName: "algorithm",
  },
  {
    displayName: "Express.js",
    shortName: "express",
  },
  {
    displayName: "Github",
    shortName: "github",
  },
];
