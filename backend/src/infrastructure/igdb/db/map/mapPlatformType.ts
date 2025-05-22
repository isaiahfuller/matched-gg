import { PlatformTypes } from '../schema/platformTypes';

export const mapPlatformType = (data) => {
  const mapped = {
    checksum: data.checksum,
    igdbCreatedAt: data.created_at ? new Date(data.created_at * 1000) : null,
    igdbId: data.id,
    igdbUpdatedAt: data.updated_at ? new Date(data.updated_at * 1000) : null,
    name: data.name,
    updatedAt: new Date(),
  } satisfies PlatformTypes;
  return mapped;
};
