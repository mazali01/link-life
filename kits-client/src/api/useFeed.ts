import { useHttpClient } from "./httpClient";
import { User } from "./useUser";
import { useQuery } from "@tanstack/react-query";

export interface Post {
  id: string
  content: string
  image?: string
  createdAt: string
  user: User
  comments: Comment[]
  likes: User[]
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  user: User
}


export const useFeed = () => {
  const httpClient = useHttpClient();

  const { data: feed, isLoading, refetch } = useQuery(['FEEDS'], async () => {
    const { data } = await httpClient.get<Post[]>('/api/user/feeds');
    return data;
  });

  return {
    feed,
    isLoading,
    refresh: async () => {
      await refetch()
    }
  };
};