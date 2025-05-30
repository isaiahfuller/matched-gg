import { Injectable } from '@nestjs/common';
import { eq, gt, inArray } from 'drizzle-orm';

import { DrizzleDB } from './db/db';
import { IgdbDbController } from './infrastructure/igdb/db/controller/IgdbDbController';
import { Games, gamesTable } from './infrastructure/igdb/db/schema/games';
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
      where: eq(userOwnedGames.userId, id) && gt(userOwnedGames.playtime, 0),
      with: {
        steam: true,
      },
    });
    const size = basic.length;
    const owned = basic
      .sort((a: any, b: any) => b.playtime - a.playtime)
      .slice(0, Math.min(20, size - size * 0.05));
    console.log(basic);
    const ownedIgdbIds: number[] = [];
    for (const game of owned) {
      if (game && game.steam && game.steam.igdbId)
        ownedIgdbIds.push(game.steam.igdbId);
    }
    //   columns: { steamId: true, userId: true },
    //   limit: Math.min(20, size - size * 0.05),
    //   orderBy: (userOwnedGames, { desc }) => [desc(userOwnedGames.playtime)],
    //   where:
    //     eq(userOwnedGames.userId, id) &&
    //     gt(userOwnedGames.playtime, 0) &&
    //     notInArray(userOwnedGames.steamId, ownedSteamIds),
    //   with: {
    //     steam: {
    //       columns: { igdbId: true },
    //       with: {
    //         igdbGame: {
    //           with: {
    //             involvedCompanies: true,
    //             similarGames: {
    //               columns: {},
    //               with: {
    //                 sg: {
    //                   with: {
    //                     genres: {
    //                       columns: {},
    //                       with: {
    //                         genre: true,
    //                       },
    //                     },
    //                     themes: {
    //                       columns: {},
    //                       with: {
    //                         theme: true,
    //                       },
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    const userGames = await this.dbConnection.query.gamesTable.findMany({
      where: inArray(gamesTable.igdbId, ownedIgdbIds),
      with: {
        involvedCompanies: true,
        similarGames: {
          columns: {},
          with: {
            sg: {
              with: {
                genres: {
                  columns: {},
                  with: {
                    genre: true,
                  },
                },
                themes: {
                  columns: {},
                  with: {
                    theme: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const ids: Set<number> = new Set();
    const games = {};
    for (const p of userGames) {
      ids.add(p.igdbId);
    }
    for (const p of userGames.filter(
      (p) => p.similarGames && p.firstReleaseDate,
    )) {
      for (const g of p.similarGames) {
        if (ids.has(g.sg.igdbId)) {
          continue;
        }
        if (!games[g.sg.igdbId]) games[g.sg.igdbId] = { count: 1, game: g.sg };
        else games[g.sg.igdbId].count++;
      }
    }
    return Object.values<{ count: number; game: Games }>(games)
      .filter((e) => e.count > 1)
      .sort(
        (a, b) =>
          b.count * ((b.game.ratingCount || 1) / (b.game.rating || 1)) -
          a.count * ((a.game.ratingCount || 1) / (a.game.rating || 1)),
      );
  }
}
