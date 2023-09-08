import { useHttpClient } from "../httpClient";
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

interface UseFeedParams {
  only?: string;
  likedBy?: string;
}


export const useFeed = ({ only, likedBy }: UseFeedParams) => {
  const httpClient = useHttpClient();

  const { data: feed, isLoading } = useQuery(['FEEDS', only, likedBy], async ({ queryKey: [_, only, likedBy] }) => {
    const { data } = await httpClient.get<Post[]>("/api/user/feeds", { params: { only, likedBy } });
    return data;
  });

  return {
    feed,
    isLoading
  };
};