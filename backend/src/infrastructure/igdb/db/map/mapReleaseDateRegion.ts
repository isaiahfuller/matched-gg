import { ReleaseDateRegions } from '../schema/releaseDateRegions';

export const mapReleaseDateRegion = (data) => {
  const mapped = {
    checksum: data.checksum,
    igdbCreatedAt: data.created_at ? new Date(data.created_at * 1000) : null,
    igdbId: data.id,
    igdbUpdatedAt: data.updated_at ? new Date(data.updated_at * 1000) : null,
    region: data.region,
    updatedAt: new Date(),
  } satisfies ReleaseDateRegions;
  return mapped;
};
