import { WebsitePGEnum, Websites } from '../schema/websites';

export const mapWebsite = (website) => {
  const mappedWebsite = {
    igdbId: website.id,
    checksum: website.checksum,
    game: website.game,
    websiteCategory:
      website.category === undefined
        ? null
        : WebsitePGEnum.enumValues[website.category],
    trusted: website.trusted,
    url: website.url,
  } satisfies Websites;
  return mappedWebsite;
};
