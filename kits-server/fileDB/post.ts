import path from 'path';
import { Dal } from './dal';

interface CommentModel {
  id: string
  ownerId: string
  content: string
  createdAt: string
}

export interface PostModel {
  createdAt: string
  id: string
  ownerId: string
  picture?: string
  content: string
  likesIds: string[]
  comments: CommentModel[]
}

export const dbPath = path.join(__dirname, "data", "posts.json");

class Post extends Dal<PostModel> {
  constructor() {
    super(dbPath);
  }
}

export const postDal = new Post();