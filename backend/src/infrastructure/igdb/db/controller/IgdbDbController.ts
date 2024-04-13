import { db } from 'src/db/db';
import * as gamesSchema from '../schema/games';
import { QueryResult } from 'pg';

export class IgdbDbController {
  private readonly db = db;

  public async getConnection() {
    return this.db;
  }

  public async storeGames(
    games: gamesSchema.Games[] | gamesSchema.Games,
  ): Promise<QueryResult<gamesSchema.Games[]>> {
    return await this.db.insert(gamesSchema.gamesTable).values([games].flat());
  }
}
