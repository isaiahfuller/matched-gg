import { CompanyWebsites } from '../schema/companyWebsites';

export const mapCompanyWebsite = (website) => {
  const mappedWebsite = {
    checksum: website.checksum,
    igdbId: website.id,
    trusted: website.trusted,
    type: website.type,
    updatedAt: new Date(),
    url: website.url,
  } satisfies CompanyWebsites;
  return mappedWebsite;
};
