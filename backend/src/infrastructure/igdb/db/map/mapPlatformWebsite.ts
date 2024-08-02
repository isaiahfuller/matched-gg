import {
  PlatformWebsiteCategoryPGEnum,
  PlatformWebsites,
} from '../schema/platformWebsites';

export const mapPlatformWebsite = (website) => {
  const mapped = {
    category:
      website.category === undefined
        ? null
        : PlatformWebsiteCategoryPGEnum[
            website.category + 1 > 6
              ? website.category + 2
              : website.category + 1
          ], // enum skips 7
    checksum: website.checksum,
    igdbId: website.id,
    trusted: website.trusted,
    updatedAt: new Date(),
    url: website.url,
  } satisfies PlatformWebsites;
  return mapped;
};
