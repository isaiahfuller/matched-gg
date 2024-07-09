import { PopularityTypes } from '../schema/popularityTypes';

export const mapPopularityType = (type) => {
  const mapped = {
    checksum: type.checksum,
    igdbCreatedAt: type.created_at ? new Date(type.created_at * 1000) : null,
    igdbId: type.id,
    igdbUpdatedAt: type.updated_at ? new Date(type.updated_at * 1000) : null,
    name: type.name || 'NO_NAME',
    popularitySource: type.popularity_source,
    updatedAt: new Date(),
  } satisfies PopularityTypes;
  return mapped;
};
