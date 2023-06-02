/** @format */

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getMongoDb } from '@/app/mongodb';
 import { ObjectId } from 'mongodb';


interface Snippet {
  title: string;
  description: string;
  favorite: string[];
  tags: string[];
  code: string;
  created_at: Date;
  updated_at: Date;
  author_id: string;
  _id?: string;
}

export async function GET(req: Request): Promise<NextResponse> {
  const snippetsFromDatabase = await getMongoDb()
    .collection('snippets')
    .find({})
    .toArray();
  // Pre-seed database, so we’re not starting from scratch
  if (!snippetsFromDatabase.length) {
    await getMongoDb().collection('snippets').insertMany(snippets);
    return NextResponse.json(snippets);
  }
  return NextResponse.json(snippetsFromDatabase);
}
const snippets: Omit<Snippet, '_id'>[] = [
  {
    title: 'Database',
    description: 'Do Not Works',
    favorite: ['1', '2'],
    tags: ['React', 'Turbo Pascal'],
    code: 'writeln(‘something wrong’)',
    created_at: new Date(),
    updated_at: new Date(),
    author_id: '1',
  },
  {
    title: 'React',
    description: 'Do Not Works',
    favorite: ['3', '4'],
    tags: ['Foo', 'Bar'],
    code: 'writeln(‘something wrong’)',
    created_at: new Date(),
    updated_at: new Date(),
    author_id: '2',
  },
];


export async function POST(req: NextApiRequest, res: NextApiResponse) {
  //if (req.method === 'POST') {
  // console.log(req.body);
   try {
    const db = getMongoDb();
    // const body=req.body; 
    // console.log(body); 
    // // const insertedId=await db.collection('snippet').insertOne(body); 
    // console.log(insertedId)
  const newSnippet = (req.body);
  
    const insertedResult = await db.collection('snippets').insertOne(newSnippet);
    //  const insertedId = result;
    const insertedId=insertedResult.insertedId; 
    res.status(200).json(insertedId);
    //retrieve the inserted snippets using inserted id.
    const insertedSnippet = await 
      db.collection('snippet')
      .findOne({ _id: insertedId });
    return NextResponse.json(insertedSnippet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new snippet' });
  }
 }

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = getMongoDb();
    const body= req.body;
 const { id, ...updatedData } = body;
 const updatedResult= await db.collection('snippet').updateOne({_id:id}, {$set:updatedData})
    if(updatedResult.modifiedCount===0){
      return res.status(404).json({error:'Snippet not fund!'})
    }
    const updatedSnippet= await db.collection('snippet').findOne({_id:id}); 
    //  const insertedId = result;
    res.status(200).json(updatedSnippet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the  snippet' });
  }
}




