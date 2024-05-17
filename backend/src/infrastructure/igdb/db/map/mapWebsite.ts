import { WebsitePGEnum, Websites } from '../schema/websites';

export const mapWebsite = (website) => {
  const mappedWebsite = {
    checksum: website.checksum,
    game: website.game,
    igdbId: website.id,
    trusted: website.trusted,
    updatedAt: new Date(),
    url: website.url,
    websiteCategory:
      website.category === undefined
        ? null
        : WebsitePGEnum.enumValues[website.category],
  } satisfies Websites;
  return mappedWebsite;
};
