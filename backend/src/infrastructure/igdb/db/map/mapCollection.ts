import { Collections } from '../schema/collections';

export const mapCollection = (collection) => {
  const mappedCollection = {
    checksum: collection.checksum,
    games: collection.games,
    igdbCreatedAt: collection.created_at
      ? new Date(collection.created_at * 1000)
      : null,
    igdbId: collection.id,
    igdbUpdatedAt: collection.updated_at
      ? new Date(collection.updated_at * 1000)
      : null,
    name: collection.name,
    slug: collection.slug,
    updatedAt: new Date(),
    url: collection.url,
  } satisfies Collections;
  return mappedCollection;
};
