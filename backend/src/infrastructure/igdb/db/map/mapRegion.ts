import { Regions } from '../schema/regions';

export const mapRegion = (region) => {
  const mapped = {
    category: region.name,
    checksum: region.checksum,
    identifier: region.identifier,
    igdbCreatedAt: region.created_at
      ? new Date(region.created_at * 1000)
      : null,
    igdbId: region.id,
    igdbUpdatedAt: region.updated_at
      ? new Date(region.updated_at * 1000)
      : null,
    name: region.name || 'NO_NAME',
    updatedAt: new Date(),
  } satisfies Regions;
  return mapped;
};
