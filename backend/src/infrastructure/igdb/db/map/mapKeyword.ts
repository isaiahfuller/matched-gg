import { Keywords } from '../schema/keywords';

export const mapKeyword = (keyword) => {
  const mapped = {
    checksum: keyword.checksum,
    igdbCreatedAt: keyword.created_at
      ? new Date(keyword.created_at * 1000)
      : null,
    igdbId: keyword.id,
    igdbUpdatedAt: keyword.updated_at
      ? new Date(keyword.updated_at * 1000)
      : null,
    name: keyword.name || 'NO_NAME',
    slug: keyword.slug,
    updatedAt: new Date(),
    url: keyword.url,
  } satisfies Keywords;
  return mapped;
};
