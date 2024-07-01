import { GameModes } from '../schema/gameMode';

export const mapGameMode = (mode) => {
  const mappedMode = {
    checksum: mode.checksum,
    igdbCreatedAt: mode.created_at ? new Date(mode.created_at * 1000) : null,
    igdbId: mode.id,
    igdbUpdatedAt: mode.updated_at ? new Date(mode.updated_at * 1000) : null,
    name: mode.name || 'NO_NAME',
    slug: mode.slug,
    updatedAt: new Date(),
    url: mode.url,
  } satisfies GameModes;
  return mappedMode;
};
