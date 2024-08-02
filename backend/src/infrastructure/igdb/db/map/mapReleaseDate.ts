import { ReleaseDates } from '../schema/releaseDates';

export const mapReleaseDate = (date) => {
  const mapped = {
    category: date.category,
    checksum: date.checksum,
    human: date.human,
    igdbCreatedAt: date.created_at ? new Date(date.created_at * 1000) : null,
    igdbId: date.id,
    igdbUpdatedAt: date.updated_at ? new Date(date.updated_at * 1000) : null,
    m: date.m,
    platform: date.platform,
    region: date.region,
    updatedAt: new Date(),
    y: date.y,
  } satisfies ReleaseDates;
  return mapped;
};
