import { PlayerPerspectives } from '../schema/playerPerspectives';

export const mapPlayerPerspective = (perspective) => {
  const mapped = {
    checksum: perspective.checksum,
    igdbCreatedAt: perspective.created_at
      ? new Date(perspective.created_at * 1000)
      : null,
    igdbId: perspective.id,
    igdbUpdatedAt: perspective.updated_at
      ? new Date(perspective.updated_at * 1000)
      : null,
    name: perspective.name || 'NO_NAME',
    slug: perspective.slug,
    updatedAt: new Date(),
    url: perspective.url,
  } satisfies PlayerPerspectives;
  return mapped;
};
