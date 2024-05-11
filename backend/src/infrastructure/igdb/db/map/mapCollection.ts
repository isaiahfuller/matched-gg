import { Collections } from '../schema/collections';

export const mapCollection = (collection) => {
  const mappedCollection = {
    igdbId: collection.id,
    name: collection.name,
    checksum: collection.checksum,
    games: collection.games,
    igdbCreatedAt: collection.created_at
      ? new Date(collection.created_at * 1000)
      : null,
    igdbUpdatedAt: collection.updated_at
      ? new Date(collection.updated_at * 1000)
      : null,
    slug: collection.slug,
    url: collection.url,
    updatedAt: new Date(),
  } satisfies Collections;
  return mappedCollection;
};
