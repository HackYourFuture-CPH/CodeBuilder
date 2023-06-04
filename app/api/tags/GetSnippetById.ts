import { getMongoDb } from '@/app/mongodb'
import { NextResponse } from 'next/server'

export interface Snippet {
  _id: string
  title: string
  description: string
  favoritedBy: string[]
  tags: string[]
  code: string
  created_at: Date
  updated_at: Date
  author_id: string
}

// Get snippet by ID
export async function getSnippetById(req: Request): Promise<NextResponse> {
  const snippet = await getMongoDb().collection('snippets').findOne({ _id: id })

  if (!snippet) {
    return NextResponse.json({ error: 'Snippet not found' })
  }

  return NextResponse.json(snippet)
}

const snippets: Omit<Snippet, '_id'>[] = [
  {
    _id: '1ghjhkkhj',
    title: 'Snippet1',
    description: 'Snippet1 description',
    favoritedBy: [],
    tags: [],
    code: 'Snippet1 code',
    created_at: new Date('2023-06-02 18:17:35'),
    updated_at: new Date('2023-06-02 18:19:35'),
    author_id: 'Snippet1 author',
  },
  {
    _id: '2ghdfgfhfhj',
    title: 'Snippet2',
    description: 'Snippet2 description',
    favoritedBy: [],
    tags: [],
    code: 'Snippet2 code',

    created_at: new Date('2023-06-02 18:17:35'),
    updated_at: new Date('2023-06-02 18:19:35'),
    author_id: 'Snippet2 author',
  },
  {
    _id: '3gdfggdfgdjhkkhj',
    title: 'Snippet3',
    description: 'Snippet3 description',
    favoritedBy: [],
    tags: [],
    code: 'Snippet3 code',

    created_at: new Date('2023-06-02 18:17:35'),
    updated_at: new Date('2023-06-02 18:19:35'),
    author_id: 'Snippet3 author',
  },
  {
    _id: '4ghjhksdfdsfdskhj',
    title: 'Snippet4',
    description: 'Snippet4 description',
    favoritedBy: [],
    tags: [],
    code: 'Snippet4 code',

    created_at: new Date('2023-06-02 18:17:35'),
    updated_at: new Date('2023-06-02 18:19:35'),
    author_id: 'Snippet4 author',
  },
  {
    _id: '5ghdfsderjhkkhj',
    title: 'Snippet5',
    description: 'Snippet5 description',
    favoritedBy: [],
    tags: [],
    code: 'Snippet5 code',
    created_at: new Date('2023-06-02 18:17:35'),
    updated_at: new Date('2023-06-02 18:19:35'),
    author_id: 'Snippet5 author',
  },
]

export default getSnippetById
