import { featureDal } from "../../fileDB/feature";

export const toggleFeature = async (req, res) => {
  const { type } = req.query;

  await featureDal.update(f => f.type === type, f => ({
    ...f,
    enabled: !f.enabled,
  }));

  res.send("ok");
};