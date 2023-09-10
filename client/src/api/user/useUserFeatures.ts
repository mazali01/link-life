import { useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../httpClient";
import { FeatureType } from "../admin/useAdminFeatures";

export const useUserFeatures = (feature: FeatureType) => {
  const httpClient = useHttpClient();

  const { data: features } = useQuery(["USER_FEATURES"], async () => {
    const { data } = await httpClient.get<Record<FeatureType, boolean>>(`/api/user/features`);
    return data;
  });

  return features?.[feature] ?? false;
}