import { PopularityPrimitives } from '../schema/popularityPrimitives';

export const mapPopularityPrimitive = (prim) => {
  const mapped = {
    calculatedAt: prim.calculated_at,
    checksum: prim.checksum,
    gameId: prim.game_id,
    igdbCreatedAt: prim.created_at ? new Date(prim.created_at * 1000) : null,
    igdbId: prim.id,
    igdbUpdatedAt: prim.updated_at ? new Date(prim.updated_at * 1000) : null,
    popularitySource: prim.popularity_source,
    popularityType: prim.popularity_type,
    updatedAt: new Date(),
    value: prim.value,
  } satisfies PopularityPrimitives;
  return mapped;
};
