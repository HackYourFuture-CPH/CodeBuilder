export interface snippetModel {
  _id: string;
  title: string;
  description: string;
  favoriteByIds: string[];
  tags: string[];
  snippetCode: string;
  createdAt: Date;
  // updatedAt: Date;  ????
  updatedAt: string;
  authorId: string;
}

