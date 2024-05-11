import { CompanyWebsites } from '../schema/companyWebsites';
import { WebsitePGEnum } from '../schema/websites';

export const mapCompanyWebsite = (website) => {
  const mappedWebsite = {
    igdbId: website.id,
    checksum: website.checksum,
    websiteCategory:
      website.category === undefined
        ? null
        : WebsitePGEnum.enumValues[website.category],
    trusted: website.trusted,
    updatedAt: new Date(),
    url: website.url,
  } satisfies CompanyWebsites;
  return mappedWebsite;
};
