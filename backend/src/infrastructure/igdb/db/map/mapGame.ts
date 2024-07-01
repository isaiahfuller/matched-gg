import { GameCategoryPGEnum, Games, StatusPGEnum } from '../schema/games';

export const mapGame = (game) => {
  const mappedGame = {
    aggregatedRating: game.aggregated_rating,
    aggregatedRatingCount: game.aggregated_rating_count,
    checksum: game.checksum,
    firstReleaseDate: game.first_release_date
      ? new Date(game.first_release_date * 1000)
      : null,
    gameCategory:
      game.category === undefined
        ? null
        : GameCategoryPGEnum.enumValues[game.category],
    hypes: game.hypes,
    igdbCreatedAt: game.created_at ? new Date(game.created_at * 1000) : null,
    igdbId: game.id,
    igdbUpdatedAt: game.updated_at ? new Date(game.updated_at * 1000) : null,
    name: game.name || 'NO_NAME',
    rating: game.rating,
    ratingCount: game.rating_count,
    slug: game.slug,
    status:
      game.status === undefined
        ? null
        : StatusPGEnum.enumValues[
            game.status > 0 ? game.status - 1 : game.status // This is beacuse the enum skips 1 and starts at 0 for some reason (IGDB weirdness)
          ],
    storyline: game.storyline,
    summary: game.summary,
    totalRating: game.total_rating,
    totalRatingCount: game.total_rating_count,
    updatedAt: new Date(),
    url: game.url,
    versionTitle: game.version_title,
  } satisfies Games;
  return mappedGame;
};
