import { GameVersionFeatureValues } from '../schema/gameVersionFeatureValues';

export const mapGameVersionFeatureValue = (value) => {
  const mapped = {
    checksum: value.checksum,
    game: value.game,
    gameFeature: value.game_feature,
    includedFeature: value.included_feature,
    note: value.note,
  } satisfies GameVersionFeatureValues;
  return mapped;
};
