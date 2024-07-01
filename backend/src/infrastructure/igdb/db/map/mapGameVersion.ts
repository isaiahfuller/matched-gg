import { GameVersions } from '../schema/gameVersions';

export const mapGameVersion = (game) => {
  const mapped = {
    checksum: game.checksum,
    features: game.features,
    game: game.game,
    games: game.games,
    igdbCreatedAt: game.created_at ? new Date(game.created_at * 1000) : null,
    igdbId: game.id,
    igdbUpdatedAt: game.updated_at ? new Date(game.updated_at * 1000) : null,
    updatedAt: new Date(),
    url: game.url,
  } satisfies GameVersions;
  return mapped;
};
