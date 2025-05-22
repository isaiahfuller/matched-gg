import { Injectable } from '@nestjs/common';
import { eq, gt } from 'drizzle-orm';

import { DrizzleDB } from './db/db';
import { IgdbDbController } from './infrastructure/igdb/db/controller/IgdbDbController';
import { gameTypesTable } from './infrastructure/igdb/db/schema/gameTypes';
import { userOwnedGames } from './infrastructure/steam/db/schema/steamUserOwnedGames';

@Injectable()
export class GameService {
  db: IgdbDbController;
  dbConnection: DrizzleDB;

  constructor() {
    this.db = new IgdbDbController();
    this.dbConnection = this.db.getConnection();
  }

  async getGames(page = 0, size = 100) {
    return await this.dbConnection.query.gamesTable.findMany({
      limit: size,
      offset: page * size,
      with: {
        cover: true,
        franchises: {
          columns: {},
          with: { f: true },
        },
        gameModes: {
          columns: {},
          with: { gm: true },
        },
        genres: {
          columns: {},
          with: { genre: true },
        },
        keywords: {
          columns: {},
          with: { kw: true },
        },
        multiplayerModes: {
          columns: {},
          with: { mm: true },
        },
        parentGame: true,
        platforms: {
          columns: {},
          with: { p: true },
        },
        steamId: true,
        themes: {
          columns: {},
          with: { theme: true },
        },
      },
    });
  }

  async getTimeRecommendations(id: number) {
    const basic = await this.dbConnection.query.userOwnedGames.findMany({
      columns: { userId: true },
      where: eq(userOwnedGames.userId, id) && gt(userOwnedGames.playtime, 0),
    });
    const types = await this.dbConnection.select().from(gameTypesTable);
    const size = basic.length;
    const userGames = await this.dbConnection.query.userOwnedGames.findMany({
      columns: { userId: true },
      limit: Math.min(20, size - size * 0.05),
      orderBy: (userOwnedGames, { desc }) => [desc(userOwnedGames.playtime)],
      where: eq(userOwnedGames.userId, id) && gt(userOwnedGames.playtime, 0),
      with: {
        steam: {
          columns: {},
          with: {
            igdbGame: {
              with: {
                genres: true,
                involvedCompanies: true,
              },
            },
          },
        },
      },
    });
    const games: any[] = [];
    for (const e of userGames) {
      if (e.steam && e.steam.igdbGame) games.push(e!.steam!.igdbGame!);
    }
    console.log(games);

    console.log(types);
    return games;
  }
}
