import { PlatformVersions } from '../schema/platformVersions';

export const mapPlatformVersion = (version) => {
  const mapped = {
    checksum: version.checksum,
    companies: version.companies,
    connectivity: version.connectivity,
    cpu: version.cpu,
    graphics: version.graphics,
    igdbId: version.id,
    mainManufacturer: version.main_manufacturer,
    media: version.media,
    memory: version.memory,
    name: version.name || 'NO_NAME',
    os: version.os,
    output: version.output,
    platformLogo: version.platform_logo,
    platformVersionReleaseDates: version.platform_version_release_dates,
    resolutions: version.resolutions,
    slug: version.slug,
    sound: version.sound,
    storage: version.storage,
    summary: version.summary,
    updatedAt: new Date(),
    url: version.url,
  } satisfies PlatformVersions;
  return mapped;
};
