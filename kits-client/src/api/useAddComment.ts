import { useHttpClient } from "./httpClient";
import { useMutation } from "@tanstack/react-query";

interface AddCommentParams {
  postId: string;
  comment: string;
}

export const useAddComment = () => {
  const httpClient = useHttpClient();

  const { mutateAsync: addComment } = useMutation(async ({ postId, comment }: AddCommentParams) => {
    await httpClient.post(`/api/post/${postId}/comment`, { comment });
  })

  return addComment;
}