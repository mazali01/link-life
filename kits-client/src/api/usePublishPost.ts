import { useHttpClient } from "./httpClient";
import { useMutation } from "@tanstack/react-query";

interface PublishPostParams {
  content: string;
  picture?: string;
}

export const usePublishPost = () => {
  const httpClient = useHttpClient();

  const { mutateAsync: publishPost } = useMutation(async ({ content, picture }: PublishPostParams) => {
    await httpClient.post(`/api/post`, { content, picture });
  })

  return publishPost;
}