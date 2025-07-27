import validateTimestamp from '@util/validateTimestamp';

import { PlatformVersionReleaseDates } from '../schema/platformVersionReleaseDate';

export const mapPlatformVersionReleaseDate = (date) => {
  const mapped = {
    checksum: date.checksum,
    date: validateTimestamp(date.date),
    human: date.human,
    igdbCreatedAt: validateTimestamp(date.created_at),
    igdbId: date.id,
    igdbUpdatedAt: validateTimestamp(date.updated_at),
    m: date.m,
    platformVersion: date.platform_version,
    updatedAt: new Date(),
    y: date.y,
  } satisfies PlatformVersionReleaseDates;
  return mapped;
};
