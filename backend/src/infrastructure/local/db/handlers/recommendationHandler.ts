import { db } from 'src/db/db';

import { gameRecommendations } from '../schema/gameRecommendations';

export default class RecommendationHandler {
  db;
  constructor() {
    this.db = db;
  }

  async addRecommendations(recommendations) {
    return await this.db
      .insert(gameRecommendations)
      .values(recommendations)
      .onConflictDoUpdate({
        set: { updatedAt: new Date() },
        target: [gameRecommendations.userId, gameRecommendations.gameId],
      });
  }

  async getRecommendations(id: number) {
    return await this.db.query.gameRecommendations.findMany({
      where: (gameRecommendations, { eq }) =>
        eq(gameRecommendations.userId, id),
      with: {
        game: { with: { cover: true, screenshots: { with: { ss: true } } } },
      },
    });
  }
}
