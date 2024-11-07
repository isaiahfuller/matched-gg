import {
  PlatformVersionReleaseDateCategoryPGEnum,
  PlatformVersionReleaseDateRegionPGEnum,
  PlatformVersionReleaseDates,
} from '../schema/platformVersionReleaseDate';
import validateTimestamp from '../../../../util/validateTimestamp';

export const mapPlatformVersionReleaseDate = (date) => {
  const mapped = {
    category: date.category
      ? null
      : PlatformVersionReleaseDateCategoryPGEnum.enumValues[date.category],
    checksum: date.checksum,
    date: validateTimestamp(date.date),
    human: date.human,
    igdbCreatedAt: validateTimestamp(date.created_at),
    igdbId: date.id,
    igdbUpdatedAt: validateTimestamp(date.updated_at),
    m: date.m,
    platformVersion: date.platform_version,
    region: date.region
      ? null
      : PlatformVersionReleaseDateRegionPGEnum.enumValues[date.region],
    updatedAt: new Date(),
    y: date.y,
  } satisfies PlatformVersionReleaseDates;
  return mapped;
};
