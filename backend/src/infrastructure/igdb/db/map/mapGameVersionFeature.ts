import { GameVersionFeatures } from '../schema/gameVersionFeatures';

export const mapGameVersionFeature = (feature) => {
  const mapped = {
    category: feature.category,
    checksum: feature.checksum,
    description: feature.description,
    igdbId: feature.id,
    position: feature.position,
    title: feature.title,
    updatedAt: new Date(),
    values: feature.values,
  } satisfies GameVersionFeatures;
  return mapped;
};
