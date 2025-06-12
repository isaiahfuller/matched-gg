import { drizzle } from 'drizzle-orm/node-postgres';
import { client } from 'src/db/db';
import { Games, gamesTable } from 'src/infrastructure/igdb/db/schema/games';
import { User } from 'src/users/users.service';

import { gameRecommendations } from '../schema/gameRecommendations';
import { users } from '../schema/users';

export default class RecommendationHandler {
  db;
  constructor() {
    this.db = drizzle(client, {
      schema: { gameRecommendations, gamesTable, users },
    });
  }

  async addRecommendation(user: User, game: Games) {
    return await this.db
      .insert(gameRecommendations)
      .values({
        game: game.igdbId,
        updatedAt: new Date(),
        user: user.id,
      })
      .onConflictDoUpdate({
        set: { updatedAt: new Date() },
        target: [gameRecommendations.userId, gameRecommendations.gameId],
      });
  }

  async getRecommendations(user: User) {
    return await this.db.query.gameRecommendations.findMany({
      where: (gameRecommendations, { eq }) =>
        eq(gameRecommendations.userId, user.id),
      with: { game: true },
    });
  }
}
