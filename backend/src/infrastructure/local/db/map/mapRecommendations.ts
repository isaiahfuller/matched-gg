import { GameRecommendation } from '../schema/gameRecommendations';

/**
 * Adds a list of games to a user's previous recommendations
 *
 * @param id - User id
 * @param games - Games to store in db
 */
export function mapRecommendations(id, games) {
  const res: GameRecommendation[] = [];
  for (const g of games.reverse()) {
    res.push({
      gameId: g.game.igdbId,
      updatedAt: new Date(),
      userId: id,
    });
  }
  return res;
}
