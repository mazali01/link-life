import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../httpClient";
import { User } from "../user/useUser";

export const useUsers = () => {
  const httpClient = useHttpClient();

  const { data: users, isFetching, refetch } = useQuery(["ADMIN_USERS"], async () => {
    const { data } = await httpClient.get<User[]>(`/api/admin/users`);
    return data;
  });

  const { mutateAsync: removeUser } = useMutation(async (email: string) => {
    const { data } = await httpClient.delete(`/api/admin/users?email=${email}`);
    await refetch();
    return data;
  });

  return {
    users: users ?? [],
    removeUser,
    isFetching
  };
}