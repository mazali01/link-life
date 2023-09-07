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


class Post extends Dal<PostModel> {
  constructor() {
    super("posts.json");
  }
}

export const postDal = new Post();