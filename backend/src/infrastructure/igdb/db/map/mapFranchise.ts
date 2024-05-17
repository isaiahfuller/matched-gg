import { Franchises } from '../schema/franchise';

export const mapFranchise = (franchise) => {
  const mappedFranchise = {
    checksum: franchise.checksum,
    createdAt: new Date(),
    games: franchise.games,
    igdbCreatedAt: franchise.created_at
      ? new Date(franchise.created_at * 1000)
      : null,
    igdbId: franchise.id,
    igdbUpdatedAt: franchise.updated_at
      ? new Date(franchise.updated_at * 1000)
      : null,
    name: franchise.name || 'NO_NAME',
    slug: franchise.slug,
    updatedAt: new Date(),
    url: franchise.url,
  } satisfies Franchises;

  return mappedFranchise;
};
