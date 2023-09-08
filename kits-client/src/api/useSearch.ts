import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "./httpClient";
import { User } from "./useUser";

export type SearchMethodType = "prefix" | "contains" | "suffix";

interface UseSearchParams {
  term: string;
  method: SearchMethodType;
}

export const useSearch = ({ term, method }: UseSearchParams) => {
  const httpClient = useHttpClient();

  const { data: users, isFetching } = useQuery(["SEARCH", term, method], async ({ queryKey: [_, term, method] }) => {
    const { data } = await httpClient.get<User[]>(`/api/user/search?term=${term}&method=${method}`);
    return data;
  }, {
    enabled: term.length > 0
  });

  return {
    users: users ?? [],
    isFetching
  };
}