import { GameLocalizations } from '../schema/gameLocalizations';

export const mapGameLocalization = (res) => {
  const mapped = {
    checksum: res.checksum,
    cover: res.cover,
    game: res.game,
    igdbCreatedAt: res.created_at ? new Date(res.created_at * 1000) : null,
    igdbId: res.id,
    igdbUpdatedAt: res.updated_at ? new Date(res.updated_at * 1000) : null,
    name: res.name || 'NO_NAME',
    region: res.region,
    updatedAt: new Date(),
  } satisfies GameLocalizations;
  return mapped;
};
