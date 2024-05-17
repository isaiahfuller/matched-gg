import { CompanyWebsites } from '../schema/companyWebsites';
import { WebsitePGEnum } from '../schema/websites';

export const mapCompanyWebsite = (website) => {
  const mappedWebsite = {
    checksum: website.checksum,
    igdbId: website.id,
    trusted: website.trusted,
    updatedAt: new Date(),
    url: website.url,
    websiteCategory:
      website.category === undefined
        ? null
        : WebsitePGEnum.enumValues[website.category],
  } satisfies CompanyWebsites;
  return mappedWebsite;
};
