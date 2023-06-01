/** @format */

import { getMongoDb } from '@/app/mongodb';
import { dbModel } from '@/app/DB-model';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { title } from 'process';
import { ObjectId } from 'mongodb';

// the structure of a snippet in mongodb.
interface Snippet {
  _id: string;
  title: string;
  description: string;
  tags: [];
  code: string;
  createdDate: Date;
  updatedDate: Date;
  authorId: string;
}

//Create the routes needed to be able to create and update a snippet in the database.
export default async function createSnippet
  (req: Request): Promise<NextResponse>
 {
  if (req.method === 'POST') {
    //create new snippet
    try {
      const {
        title,
        description,
        tags,
        code,
        createdDate,
        updatedDate,
        authorId,
      } = req.body;

      const collection = getMongoDb().collection<Snippet>('snippet');
      const newSnippet = {
        title,
        description,
        tags,
        code,
        createdDate,
        updatedDate,
        authorId,
      };
      const result = await collection.insertOne(newSnippet);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ Error: 'Failed to create a new snippet  ' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// update a snippet.
export default async function updateSnippet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    // update an existing snippet.
    try {
      const { id } = req.query;
      const {
        title,
        description,
        tags,
        code,
        createdDate,
        updatedDate,
        authorId,
      } = req.body;

      const collection = getMongoDb().collection<Snippet>('snippet');
      const update = await collection.findOneAndUpdate(
        { _id: new ObjectId(id as string) },
        {
          $set: {
            title,
            description,
            tags,
            code,
            createdDate,
            updatedDate,
            authorId,
          },
        }
      );
    } catch (error) {
      res.status(500).json({ Error: 'Failed to update a snippet  ' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
