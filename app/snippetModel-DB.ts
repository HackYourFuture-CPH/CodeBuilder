export interface snippetModel {
  _id: string;
  title: string;
  description: string;
  favoriteByIds: (string | null | undefined)[];
  tags: string[];
  snippetCode: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}
