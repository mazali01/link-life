import { AxiosError } from "axios";
import { useHttpClient } from "../httpClient";
import { useQuery } from "@tanstack/react-query";

interface FirstCircleUser {
  email: string
  name: string
  picture: string
  followingIds: string[]
}

export interface User {
  email: string
  name: string
  picture: string
  following: FirstCircleUser[]
}

export const useUser = (email?: string) => {
  const httpClient = useHttpClient();

  const { data: user, isLoading, error } = useQuery<User, AxiosError>(['USER', email], async ({ queryKey: [_, email] }) => {
    const { data } = await httpClient.get<User>('/api/user', { params: { email } });
    return data;
  }, { retry: false });

  return {
    user,
    isLoading,
    error
  };
};