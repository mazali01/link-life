import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../httpClient";

interface Statistics {
  postsCount: number;
  usersCount: number;
  likesCount: number;
  commentsCount: number;
  postsPeriod: {
    week: number;
    month: number;
    year: number;
  };
  postPictureRate: number;
  userPictureRate: number;
}


export const useStatistics = () => {
  const httpClient = useHttpClient();

  const { data: statistics } = useQuery(["ADMIN_STATISTICS"], async () => {
    const { data } = await httpClient.get<Statistics>(`/api/admin/statistics`);
    return data;
  });

  return {
    statistics
  };
}