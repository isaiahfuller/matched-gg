import { PlatformFamilies } from '../schema/platformFamilies';

export const mapPlatformFamilies = (family) => {
  const mapped = {
    checksum: family.checksum,
    igdbId: family.id,
    name: family.name || 'NO_NAME',
    slug: family.slug,
    updatedAt: new Date(),
  } satisfies PlatformFamilies;
  return mapped;
};
