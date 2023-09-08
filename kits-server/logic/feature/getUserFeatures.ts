import { featureDal } from "../../fileDB/feature";

export const getUserFeatures = async (req, res) => {
  const features = await featureDal.findMany(_ => true);

  const featureToIsEnabled = features.reduce((acc, feature) => ({
    ...acc,
    [feature.type]: feature.enabled
  }), {} as Record<string, boolean>);

  res.send(featureToIsEnabled);
}