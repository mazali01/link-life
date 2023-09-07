import { useHttpClient } from "./httpClient";
import { useQuery } from "@tanstack/react-query";

export interface User {
  email: string
  name: string
  picture: string
}

export const useUser = () => {
  const httpClient = useHttpClient();

  const { data: user, isLoading } = useQuery(['USER'], async () => {
    const { data } = await httpClient.get<User>('/api/user');
    return data;
  });

  return { user, isLoading };
};