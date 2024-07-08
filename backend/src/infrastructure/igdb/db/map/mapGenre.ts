import { Genres } from '../schema/genres';

export const mapGenre = (genre) => {
  const mapped = {
    checksum: genre.checksum,
    igdbCreatedAt: genre.created_at ? new Date(genre.created_at * 1000) : null,
    igdbId: genre.id,
    igdbUpdatedAt: genre.updated_at ? new Date(genre.updated_at * 1000) : null,
    name: genre.name || 'NO_NAME',
    slug: genre.slug,
    updatedAt: new Date(),
    url: genre.url,
  } satisfies Genres;
  return mapped;
};
