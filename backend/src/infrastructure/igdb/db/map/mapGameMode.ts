import { GameModes } from '../schema/gameMode';

export const mapGameMode = (mode) => {
  const mappedMode = {
    igdbId: mode.id,
    name: mode.name || 'NO_NAME',
    slug: mode.slug,
    checksum: mode.checksum,
    igdbCreatedAt: mode.created_at ? new Date(mode.created_at * 1000) : null,
    url: mode.url,
    igdbUpdatedAt: mode.updated_at ? new Date(mode.updated_at * 1000) : null,
    updatedAt: new Date(),
  } satisfies GameModes;
  return mappedMode;
};
