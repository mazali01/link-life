import { featureDal } from "../../fileDB/feature";

export const getAdminFeatures = async (req, res) => {
  const features = await featureDal.findMany(_ => true);
  res.send(features);
}