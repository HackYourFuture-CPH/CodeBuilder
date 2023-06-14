/** @format */

import { getMongoDb } from "@/app/mongodb";
import { snippetModel } from "@/app/snippetModel-DB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await init(snippets);

    const snippetsFromDatabase = await getMongoDb()
      .collection("snippets")
      .find({})
      .toArray();

    return new NextResponse(JSON.stringify(snippetsFromDatabase), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
    const db = getMongoDb();
    const body = await req.json();
    const postedSnippetId = await db.collection("snippets").insertOne(body);
    return new NextResponse(JSON.stringify(postedSnippetId), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "something went wrong",
        error: error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const db = getMongoDb();
    const { id } = req.params; // Extract the snippet ID from the request parameters
    const body = await req.json();

    const updateResult = await db
      .collection("snippets")
      .updateOne({ _id: id }, { $set: body });

    return new NextResponse(JSON.stringify({ message: "Snippet updated" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "something went wrong",
        error: error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const db = getMongoDb();
    const { id } = req.params;

    const deleteResult = await db.collection("snippets").deleteOne({ _id: id });

    return new NextResponse(JSON.stringify({ message: "Snippet deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "something went wrong",
        error: error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
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

// This data can be used to pre-seed the database.
const snippets: Omit<snippetModel, "_id">[] = [
  {
    title: "HTML Lists",
    description: "Creating ordered lists in HTML",
    favoriteByIds: ["randomuser1"],
    tags: ["HTML", "Lists"],
    snippetCode:
      "<h2>My List</h2>\n\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>\n\n<ol>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ol>",
    createdAt: new Date("2023-06-03T09:55:00.000Z"),
    updatedAt: new Date("2023-06-03T07:40:00.000Z"),
    authorId: "randomuser5",
  },
  {
    title: "HTML Titles With Different Sizes",
    description: "Creating titles with different sizes",
    favoriteByIds: ["randomuser1"],
    tags: ["HTML", "Titles"],
    snippetCode:
      "<h1>Biggest title<h1/><h2>medium size title</h2><h4>small title</h4>",
    createdAt: new Date("2023-05-03T19:30:00.000Z"),
    updatedAt: new Date("2023-06-03T21:00:00.000Z"),
    authorId: "randomuser5",
  },
  {
    title: "HTML Links",
    description: "Creating a link to other websites.",
    favoriteByIds: ["randomuser5"],
    tags: ["HTML", "Links"],
    snippetCode: '<a href="https://www.w3schools.com">This is a link</a>',
    createdAt: new Date("2023-05-10T16:30:00.000Z"),
    updatedAt: new Date("2023-05-20T15:15:00.000Z"),
    authorId: "randomuser9",
  },
  {
    title: "Styling Titles",
    description: "Changing the color and font size of heading elements.",
    favoriteByIds: ["randomuser2"],
    tags: ["CSS", "Headings", "Titles"],
    snippetCode:
      "h1 {\n  color: blue;\n  font-size: 24px;\n}\nh2 {\n  color: green;\n  font-size: 20px;\n}\nh3 {\n  color: red;\n  font-size: 16px;\n}",
    createdAt: new Date("2023-02-13T18:25:00.000Z"),
    updatedAt: new Date("2023-04-11T10:30:00.000Z"),
    authorId: "randomuser1",
  },
  {
    title: "Variable Declaring And Console Output",
    description: "Declaring a variable and showing it in the console",
    favoriteByIds: [],
    tags: ["JavaScript", "Variables"],
    snippetCode:
      "const name = 'John';\n const age = 25;\n console.log('My name is ' + name + ' and I am ' + age + ' years old.');",
    createdAt: new Date("2023-05-13T17:38:00.000Z"),
    updatedAt: new Date("2023-05-18T10:30:00.000Z"),
    authorId: "randomuser1",
  },
  {
    title: "Git command to clone a repository",
    description:
      "Cloning a respository to our computer. This code should be placed into the git bash terminal in the route where we want to create our repository. Fx. c/user123/project. The link in the end should be replaced with the one copied from github.",
    favoriteByIds: [],
    tags: ["Git", "clone", "repository"],
    snippetCode: "$ git clone https://github.com/libgit2/libgit2",
    createdAt: new Date("2023-05-13T17:38:00.000Z"),
    updatedAt: new Date("2023-05-18T10:30:00.000Z"),
    authorId: "randomuser8",
  },
  {
    title: "Git Command To Create a Branch",
    description:
      "Creating a new branch locally. This code should be placed into the git terminal.",
    favoriteByIds: ["randomuser5"],
    tags: ["Git", "branch", "create"],
    snippetCode: "git branch <branch-name>",
    createdAt: new Date("2023-02-07T12:18:00.000Z"),
    updatedAt: new Date("2023-05-08T11:35:00.000Z"),
    authorId: "randomuser8",
  },
  {
    title: "SQL SELECT Statement",
    description:
      "The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set.",
    favoriteByIds: ["randomuser1"],
    tags: ["SQL", "SELECT"],
    snippetCode: "SELECT column1, column2, ... \n FROM table_name;",
    createdAt: new Date("2023-02-07T08:07:00.000Z"),
    updatedAt: new Date("2023-05-08T23:32:00.000Z"),
    authorId: "randomuser8",
  },
  {
    title: "SQL ALTER TABLE Statement",
    description:
      "The ALTER TABLE statement is used to add, delete, or modify columns in an existing table. In this example we are adding a column.",
    favoriteByIds: ["randomuser2"],
    tags: ["SQL", "ALTER TABLE"],
    snippetCode: "ALTER TABLE table_name \n ADD column_name datatype;",
    createdAt: new Date("2023-07-07T05:20:00.000Z"),
    updatedAt: new Date("2023-08-08T22:02:00.000Z"),
    authorId: "randomuser1",
  },
];
