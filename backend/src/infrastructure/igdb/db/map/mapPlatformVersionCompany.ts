import { PlatformVersionCompanies } from '../schema/platformVersionCompanies';

export const mapPlatformVersionCompany = (company) => {
  const mapped = {
    checksum: company.checksum,
    comment: company.comment,
    company: company.company,
    developer: company.developer,
    igdbId: company.id,
    manufacturer: company.manufacturer,
    updatedAt: new Date(),
  } satisfies PlatformVersionCompanies;
  return mapped;
};
