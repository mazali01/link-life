import { Dal } from './dal';

export interface FeatureModel {
  type: string
  displayName: string
  enabled: boolean
}

class FeatureDal extends Dal<FeatureModel> {
  constructor() {
    super("features.json");
  }
}

export const featureDal = new FeatureDal();