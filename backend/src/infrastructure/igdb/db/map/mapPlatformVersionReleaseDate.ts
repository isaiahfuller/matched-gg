import {
  PlatformVersionReleaseDateCategoryPGEnum,
  PlatformVersionReleaseDateRegionPGEnum,
  PlatformVersionReleaseDates,
} from '../schema/platformVersionReleaseDate';

export const mapPlatformVersionReleaseDate = (date) => {
  const mapped = {
    category: undefined
      ? null
      : PlatformVersionReleaseDateCategoryPGEnum.enumValues[date.category],
    checksum: date.checksum,
    date: date.date,
    human: date.human,
    igdbCreatedAt: date.created_at ? new Date(date.created_at * 1000) : null,
    igdbId: date.id,
    igdbUpdatedAt: date.updated_at ? new Date(date.updated_at * 1000) : null,
    m: date.m,
    platformVersion: date.platform_version,
    region: undefined
      ? null
      : PlatformVersionReleaseDateRegionPGEnum.enumValues[date.region],
    updatedAt: new Date(),
    y: date.y,
  } satisfies PlatformVersionReleaseDates;
  return mapped;
};
