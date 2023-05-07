import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error("Add Mongo URI to .env.local");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri!.toString(), {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export function getMongoDb() {
  // Return the right database name for this project
  return client.db("class24");
}
