import { useHttpClient } from "../httpClient";
import { useMutation } from "@tanstack/react-query";

interface UpdateLikeParams {
  postId: string;
  isLike: boolean;
}

export const useUpdateLikes = () => {
  const httpClient = useHttpClient();

  const { mutateAsync: updateLike } = useMutation(async ({ postId, isLike }: UpdateLikeParams) => {
    await httpClient.put(`/api/post/${postId}/like`, { isLike });
  })

  return updateLike;
}