import { ExternalGames } from '../schema/externalGame';

export const mapExternalGame = (game) => {
  const mappedGame = {
    category: game.category,
    checksum: game.checksum,
    countries: game.countries,
    game: game.game,
    igdbCreatedAt: game.created_at ? new Date(game.created_at * 1000) : null,
    igdbId: game.id,
    igdbUpdatedAt: game.updated_at ? new Date(game.updated_at * 1000) : null,
    media: game.media,
    name: game.name || 'NO_NAME',
    platform: game.platform,
    uid: game.uid,
    updatedAt: new Date(),
    url: game.url,
    year: game.year,
  } satisfies ExternalGames;
  return mappedGame;
};
