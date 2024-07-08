import { Platforms } from '../schema/platforms';

export const mapPlatform = (platform) => {
  const mapped = {
    abbreviation: platform.abbreviation,
    alternativeName: platform.alternative_name,
    category: platform.category,
    checksum: platform.checksum,
    generation: platform.generation,
    igdbCreatedAt: platform.created_at
      ? new Date(platform.created_at * 1000)
      : null,
    igdbId: platform.id,
    igdbUpdatedAt: platform.updated_at
      ? new Date(platform.updated_at * 1000)
      : null,
    name: platform.name || 'NO_NAME',
    platformFamily: platform.platform_family,
    platformLogo: platform.platform_logo,
    slug: platform.slug,
    summary: platform.summary,
    updatedAt: new Date(),
    url: platform.url,
    versions: platform.versions,
    websites: platform.websites,
  } satisfies Platforms;
  return mapped;
};
