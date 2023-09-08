import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "./httpClient";

export const useFollow = (otherUserId: string) => {
  const httpClient = useHttpClient();

  const { data: isFollowing, refetch } = useQuery(['FOLLOWING', otherUserId], async ({ queryKey: [_, otherUserId] }) => {
    const { data } = await httpClient.get<boolean>(`/api/user/following/${otherUserId}`);
    return data;
  });

  const { mutateAsync: toggle } = useMutation(async () => {
    await httpClient.put(`/api/user/following/${otherUserId}`);
    await refetch();
  });

  return { isFollowing, toggle };
};