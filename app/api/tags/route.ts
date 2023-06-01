/** @format */

import { NextApiRequest, NextApiResponse } from 'next';
import { getMongoDb } from '@/app/mongodb';
import { ObjectId } from 'mongodb';

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

export default async function handleSnippet(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const { title, description, tags, code, createdDate, updatedDate, authorId } =
    req.body;

  if (req.method === 'POST') {
    try {
      const db = getMongoDb();
      const collection = db.collection<Snippet>('snippet');
      const newSnippet = {
        title,
        description,
        tags,
        code,
        createdDate: new Date(createdDate),
        updatedDate: new Date(updatedDate),
        authorId,
      };

      const result = await collection.insertOne(newSnippet);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create a new snippet' });
    }
  } else if (req.method === 'PUT') {
    try {
      const db = getMongoDb();
      const collection = db.collection<Snippet>('snippet');

      const update = await collection.findOneAndUpdate(
        { id: new ObjectId(id as string) },
        {
          $set: {
            title,
            description,
            tags,
            code,
            updatedDate: new Date(updatedDate),
            authorId,
          },
        },
       );

      res.status(200).json(update.value);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the snippet' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
