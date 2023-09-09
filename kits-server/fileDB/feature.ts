import path from 'path';
import { Dal } from './dal';

export interface FeatureModel {
  type: string
  displayName: string
  enabled: boolean
}

export const dbPath = path.join(__dirname, "data", "features.json");

class FeatureDal extends Dal<FeatureModel> {
  constructor() {
    super(dbPath);
  }
}

export const featureDal = new FeatureDal();