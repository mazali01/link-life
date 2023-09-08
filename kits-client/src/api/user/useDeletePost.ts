import { useMutation } from "@tanstack/react-query";
import { useHttpClient } from "../httpClient";

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