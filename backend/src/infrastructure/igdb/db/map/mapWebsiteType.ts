import { WebsiteTypes } from '../schema/websiteTypes';

export const mapWebsiteType = (data) => {
  const mapped = {
    checksum: data.checksum,
    igdbCreatedAt: data.created_at ? new Date(data.created_at * 1000) : null,
    igdbId: data.id,
    igdbUpdatedAt: data.updated_at ? new Date(data.updated_at * 1000) : null,
    type: data.type,
    updatedAt: new Date(),
  } satisfies WebsiteTypes;
  return mapped;
};
