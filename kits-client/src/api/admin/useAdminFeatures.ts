import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttpClient } from "../httpClient";

export type FeatureType = "postfixSearch" | "uploadPicture" | "followUser" | "likePost" | "commentOnPost" | "searchUsers";

interface Feature {
  type: FeatureType;
  displayName: string;
  enabled: boolean;
}

export const useAdminFeatures = () => {
  const httpClient = useHttpClient();

  const { data: features, refetch } = useQuery(["ADMIN_FEATURES"], async () => {
    const { data } = await httpClient.get<Feature[]>(`/api/admin/features`);
    return data;
  });

  const { mutateAsync: toggleFeature } = useMutation(async (featureType: FeatureType) => {
    const { data } = await httpClient.put(`/api/admin/features?type=${featureType}`);
    await refetch();
    return data;
  });

  return {
    features: features ?? [],
    toggleFeature
  };
}