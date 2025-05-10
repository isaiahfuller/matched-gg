import { Websites } from '../schema/websites';

export const mapWebsite = (website) => {
  const mappedWebsite = {
    checksum: website.checksum,
    game: website.game,
    igdbId: website.id,
    trusted: website.trusted,
    type: website.type,
    updatedAt: new Date(),
    url: website.url,
  } satisfies Websites;
  return mappedWebsite;
};
