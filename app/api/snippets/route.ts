import { getMongoDb } from "@/app/mongodb";
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

export type Snippet = {
  title: string;
  description: string;
  _id?: string;
};

// GET COLLECTION
// make get request to get all the data from snippets if there is nothing to filter   collection.
export async function GET(req: NextApiRequest): Promise<NextResponse> {
  debugger;
  const {title, description} = req.query // i have problem in this line

  console.log("title:", title);
  console.log("description:", description);

  let filter = {};

  if (title && description) {
    filter = { title: { $eq: title }, description: { $eq: description } };
    console.log(filter);
  }
  if (title) {
    filter = { title: { $eq: title } };
    console.log(filter);
  }
  if (description) {
    filter = { description: { $eq: description } };
    console.log(filter);
  }

  const snippetsFromDatabase = await getMongoDb()
    .collection("snippets")
    .find(filter)
    .toArray();

  // Pre-seed database, so we're not starting from scratch
  if (!snippetsFromDatabase.length) {
    await getMongoDb().collection("snippets").insertMany(snippets);
    return NextResponse.json(snippets);
  }

  return NextResponse.json(snippetsFromDatabase);
}

// DELETE COLLECTION
export async function DELETE(req: NextApiRequest): Promise<NextResponse> {
  // Delete all documents from the snippets collection
  const dataToDelete = await getMongoDb().collection("snippets").deleteMany({});
  // to check if there any data was deleted
  if (dataToDelete.deletedCount) {
    return NextResponse.json({ message: "Snippets deleted successfully" });
  } else {
    return NextResponse.json({ message: "No snippets found to delete" });
  }
}

// POST COLLECTION
// make post request to update the snippets data.
// export async function POST(req: NextApiRequest): Promise<NextResponse> {
//   const { body } = req;

//   if (Array.isArray(body)) {
//     await getMongoDb()
//       .collection("snippets")
//       .updateMany({}, { $set: { snippets: body } });
//     return NextResponse.json({ message: "Snippets updated successfully" });
//   } else {
//     return NextResponse.json({ error: "Invalid data format" });
//   }
// }

/**
 * This data can be used to pre-seed the database.
 */
const snippets: Omit<Snippet, "_id">[] = [
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
