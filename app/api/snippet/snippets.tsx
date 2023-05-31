import { getMongoDb } from "@/app/mongodb";
import {dbModel} from '@/app/DB-model'; 
 import clientPromise from '../../lib/mongodb';
import { NextResponse } from "next/server";

//   export default async function addSnippet(req, res){
    

//     try{
//         const newSnippet=req.body; 
//         const result= await getMongoDb().collection<dbModel>('snippets').insertOne(newSnippet); 
//        res.status(201).json(result)
//     }
//     catch(error)
//     {
//         console.log(error); 
//        res.status(500).json({ error: 'Failed to create snippet' });


//     }
    
    
 //}; 
//  export default async function addSnippet(req, res) {
//    if (req.method !== 'POST') {
//      res.status(405).json({ error: 'Method Not Allowed' });
//      return;
//    }

//    try {
//      const newSnippet = req.body; // Assuming the newSnippet is passed in the request body
//      const result = await getMongoDb()
//        .collection<dbModel>('snippets')
//        .insertOne(newSnippet);
//      res.status(201).json(result); // Return the created snippet
//    } catch (error) {
//      console.error(error);
//      res.status(500).json({ error: 'Failed to create snippet' });
//    }
//  }
export async function ADD(req: Request): Promise<NextResponse> {
  const tagsFromDatabase = await getMongoDb()
    .collection('tags')
    .find({})
    .toArray();

  // Pre-seed database, so we're not starting from scratch
  if (!tagsFromDatabase.length) {
    await getMongoDb().collection('tags').insertMany(tags);
    return NextResponse.json(tags);
  }

  return NextResponse.json(tagsFromDatabase);
}