import { useHttpClient } from "./httpClient";
import { useMutation } from "@tanstack/react-query";

interface DeleteCommentParams {
  postId: string;
  commentId: string;
}

export const useDeleteComment = () => {
  const httpClient = useHttpClient();

  const { mutateAsync: deleteComment } = useMutation(async ({ postId, commentId }: DeleteCommentParams) => {
    await httpClient.delete(`/api/post/${postId}/comment/${commentId}`);
  })

  return deleteComment;
}