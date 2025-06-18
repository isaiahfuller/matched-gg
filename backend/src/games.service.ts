import { Injectable } from '@nestjs/common';
import { ciLowerBound } from '@util/ciLowerBound';
import { eq, gt, inArray } from 'drizzle-orm';

import { DrizzleDB } from './db/db';
import { IgdbDbController } from './infrastructure/igdb/db/controller/IgdbDbController';
import { gamesTable } from './infrastructure/igdb/db/schema/games';
import RecommendationHandler from './infrastructure/local/db/handlers/recommendationHandler';
import { mapRecommendations } from './infrastructure/local/db/map/mapRecommendations';
import { userOwnedGames } from './infrastructure/steam/db/schema/steamUserOwnedGames';

@Injectable()
export class GameService {
  db: IgdbDbController;
  dbConnection: DrizzleDB;
  recommendationHandler: RecommendationHandler;

  constructor() {
    this.db = new IgdbDbController();
    this.dbConnection = this.db.getConnection();
    this.recommendationHandler = new RecommendationHandler();
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
        genresRelation: {
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
  async getPreviousRecommendations(id: number) {
    return await this.recommendationHandler.getRecommendations(id);
  }
  async getTimeRecommendations(id: number) {
    const basic = await this.dbConnection.query.userOwnedGames.findMany({
      where: eq(userOwnedGames.userId, id) && gt(userOwnedGames.playtime, 0),
      with: {
        steam: {
          with: { igdbGame: true },
        },
      },
    });
    if (!basic.length) {
      return null;
    }
    const size = basic.length;
    const owned = basic.sort((a: any, b: any) => b.playtime - a.playtime);
    const ownedIgdbIds: number[] = [];
    for (const game of owned) {
      if (game && game.steam && game.steam.igdbId)
        ownedIgdbIds.push(game.steam.igdbId);
    }
    const numGames = Math.min(20, size - size * 0.05);
    const userGames = await this.dbConnection.query.gamesTable.findMany({
      where: inArray(gamesTable.igdbId, ownedIgdbIds.slice(0, numGames)),
      with: {
        genresRelation: {
          columns: {},
          with: {
            genre: true,
          },
        },
        involvedCompanies: true,
        similarGames: {
          columns: {},
          with: {
            sg: {
              with: {
                cover: true,
                genresRelation: {
                  columns: {},
                  with: {
                    genre: true,
                  },
                },
                screenshots: {
                  columns: {},
                  with: { ss: true },
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
    const selectedGames: any[] = [];
    const usedIdx = new Set<number>();
    for (let i = 0; usedIdx.size < 3; i++) {
      const num = Math.floor(Math.random() * (numGames - 0 + 1));
      usedIdx.add(num);
    }
    for (const i of [...usedIdx]) {
      if (userGames[i]) selectedGames.push(userGames[i]);
    }
    const ids: Set<number> = new Set();
    const games = {};
    const genres = {};
    const genreIds = new Set();
    for (const p of selectedGames) {
      ids.add(p.igdbId);
    }
    for (const p of selectedGames.filter(
      (p) => p.similarGames && p.firstReleaseDate,
    )) {
      for (const g of p.similarGames) {
        if (ids.has(g.sg.igdbId) || ownedIgdbIds.includes(g.sg.igdbId)) {
          continue;
        }
        if (!games[g.sg.igdbId]) games[g.sg.igdbId] = { count: 1, game: g.sg };
        else games[g.sg.igdbId].count++;
      }
      for (const genre of p.genresRelation) {
        if (!genres[genre.genre.igdbId])
          genres[genre.genre.igdbId] = { count: 1, genre: genre.genre };
        else genres[genre.genre.igdbId].count++;
      }
    }
    const sortedGenres = Object.values<any>(genres).sort(
      (a, b) => b.count - a.count,
    );
    const mem = new Map();
    for (const game of Object.values<{ count: number; game: any }>(games)) {
      for (let i = 0; i < sortedGenres.length; i++) {
        if (i < 3) genreIds.add(sortedGenres[i].genre.igdbId);
        for (let j = 0; j < game.game.genres.length; j++) {
          if (sortedGenres[i].genre.igdbId === game.game.genres[j]) {
            games[game.game.igdbId].type = 'tag';
            games[game.game.igdbId].typeText = sortedGenres[i].genre.name;
            break;
          }
        }
        if (Object.keys(games).includes('type')) break;
      }
    }
    let totalGenrePlaytime = 0;
    for (const game of owned.filter((e) => {
      if (e.steam && e.steam.igdbGame.genres)
        for (const g of e.steam.igdbGame.genres) {
          if (genreIds.has(g)) return true;
        }
    })) {
      totalGenrePlaytime += game.playtime ? game.playtime : 0;
    }
    const gameRecommendations = Object.values<{ count: number; game: any }>(
      games,
    ).sort((a, b) => {
      let resA,
        resB = 0;
      if (mem.has(a.game.igdbId)) {
        resA = mem.get(a.game.igdbId);
      } else {
        resA =
          ciLowerBound(
            a.game.rating || 1,
            (a.game.ratingCount || 1) * a.count,
          ) * 100;
        mem.set(a.game.igdbId, resA);
      }
      if (mem.has(b.game.igdbId)) {
        resB = mem.get(b.game.igdbId);
      } else {
        resB =
          ciLowerBound(
            b.game.rating || 1,
            (b.game.ratingCount || 1) * b.count,
          ) * 100;
        mem.set(b.game.igdbId, resB);
      }
      return resB - resA;
    });
    const mappedRecommendations = mapRecommendations(id, gameRecommendations);
    await this.recommendationHandler.addRecommendations(mappedRecommendations);
    const res = {
      games: gameRecommendations,
      genres: sortedGenres.slice(0, 3),
      highlights: owned
        .filter((e) => {
          if (e && e.steam && e.steam.igdbGame && e.steam.igdbGame.genres)
            for (const gameGenre of e.steam.igdbGame.genres) {
              if (genreIds.has(gameGenre)) return true;
            }
        })
        .slice(0, 3),
      time: totalGenrePlaytime,
      type: 'time',
    };
    return res;
  }
}
