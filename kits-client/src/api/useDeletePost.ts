import { useHttpClient } from "./httpClient";
import { useMutation } from "@tanstack/react-query";

interface DeletePostParams {
  postId: string;
}

export const useDeletePost = () => {
  const httpClient = useHttpClient();

  const { mutateAsync: deletePost } = useMutation(async ({ postId }: DeletePostParams) => {
    await httpClient.delete(`/api/post/${postId}`);
  })

  return deletePost;
}