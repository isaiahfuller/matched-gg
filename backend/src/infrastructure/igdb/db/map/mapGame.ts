import { GameCategoryPGEnum, Games, StatusPGEnum } from '../schema/games';

export const mapGame = (game) => {
  const mappedGame = {
    igdbId: game.id,
    name: game.name || 'NO_NAME',
    slug: game.slug,
    summary: game.summary,
    gameCategory:
      game.category === undefined
        ? null
        : GameCategoryPGEnum.enumValues[game.category],
    status:
      game.status === undefined
        ? null
        : StatusPGEnum.enumValues[
            game.status > 0 ? game.status - 1 : game.status // This is beacuse the enum skips 1 and starts at 0 for some reason (IGDB weirdness)
          ],
    aggregatedRating: game.aggregated_rating,
    aggregatedRatingCount: game.aggregated_rating_count,
    checksum: game.checksum,
    igdbCreatedAt: game.created_at ? new Date(game.created_at * 1000) : null,
    firstReleaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000)
      : null,
    hypes: game.hypes,
    rating: game.rating,
    ratingCount: game.rating_count,
    totalRating: game.total_rating,
    totalRatingCount: game.total_rating_count,
    url: game.url,
    versionTitle: game.version_title,
    igdbUpdatedAt: game.updated_at ? new Date(game.updated_at * 1000) : null,
    updatedAt: new Date(),
    storyline: game.storyline,
  } satisfies Games;
  return mappedGame;
};
