import { getMongoDb } from "@/app/mongodb";
import { NextResponse } from "next/server";

export type Snippet = {
  title: string;
  description: string;
  _id?: string;
};

// make post request to get the filtered snippets data.
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();

    // destructure the parameters
    const { title, description } = body;

    // to check if we got the values.
    console.log("title:", title);
    console.log("description:", description);

    let filter: any = {};

    if (title && description) {
      filter = {
        title: { $regex: title, $options: "i" }, // (i) stands for case insensitive
        description: { $regex: description, $options: "i" },
      };
    } else if (title) {
      filter.title = { $regex: title, $options: "i" };
    } else if (description) {
      filter.description = { $regex: description, $options: "i" };
    }

    const snippetsFromDatabase = await getMongoDb()
      .collection("snippets")
      .find(filter)
      .toArray();

    if (snippetsFromDatabase.length === 0) {
      return NextResponse.json({
        message: "no matches found",
      });
    }

    return NextResponse.json(snippetsFromDatabase);

  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      message: "An error occurred",
      error: (error as Error).message,
    });
  }
}

// to get all documents from snippets collection
export async function GET(req: Request): Promise<NextResponse> {
  const tagsFromDatabase = await getMongoDb()
    .collection("snippets")
    .find({})
    .toArray();

  // Pre-seed database, so we're not starting from scratch
  if (!tagsFromDatabase.length) {
    // Code to be executed if tagsFromDatabase is empty
    console.log("No tags found.");
    // Insert default tags into the database
    await getMongoDb().collection("snippets").insertMany(snippet);
    return NextResponse.json(snippet);
  }

  return NextResponse.json(tagsFromDatabase);
}

// This data can be used to pre-seed the database.

const snippet: Omit<Snippet, "_id">[] = [
  {
    title: "React",
    description: "reactjs",
  },
  {
    title: "JavaScript",
    description: "js",
  },
  {
    title: "HTML",
    description: "html",
  },
  {
    title: "CSS",
    description: "css",
  },
  {
    title: "Git",
    description: "git",
  },
  {
    title: "SQL & Databases",
    description: "sql",
  },
  {
    title: "MySQL",
    description: "mysql",
  },
  {
    title: "Node.js",
    description: "nodejs",
  },
  {
    title: "NPM",
    description: "npm",
  },
  {
    title: "Browser & DOM",
    description: "dom",
  },
  {
    title: "Visual Studio Code",
    description: "vscode",
  },
  {
    title: "MongoDb",
    description: "mongodb",
  },
  {
    title: "JSON",
    description: "json",
  },
  {
    title: "RegEx",
    description: "regex",
  },
  {
    title: "AJAX",
    description: "ajax",
  },
  {
    title: "Fetch",
    description: "fetch",
  },
  {
    title: "Typescript",
    description: "ts",
  },
  {
    title: "CSS Animations",
    description: "animations",
  },
  {
    title: "Firebase",
    description: "firebase",
  },
  {
    title: "Next.js",
    description: "nextjs",
  },
  {
    title: "API",
    description: "api",
  },
  {
    title: "Algorithm",
    description: "algorithm",
  },
  {
    title: "Express.js",
    description: "express",
  },
  {
    title: "Github",
    description: "github",
  },
];
