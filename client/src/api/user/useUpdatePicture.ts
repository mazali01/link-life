import { useHttpClient } from "../httpClient";
import { useMutation } from "@tanstack/react-query";

interface UpdatePictureParams {
  picture?: string;
}

export const useUpdatePicture = () => {
  const httpClient = useHttpClient();

  const { mutateAsync: updatePicture } = useMutation(async ({ picture }: UpdatePictureParams) => {
    await httpClient.put(`/api/user`, { picture });
  })

  return updatePicture;
}