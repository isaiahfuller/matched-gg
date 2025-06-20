import { Injectable } from '@nestjs/common';
import { ciLowerBound } from '@util/ciLowerBound';
import { and, arrayOverlaps, eq, gt, inArray } from 'drizzle-orm';

import { db } from './db/db';
import { gamesTable } from './infrastructure/igdb/db/schema/games';
import { genresTable } from './infrastructure/igdb/db/schema/genres';
import { themesTable } from './infrastructure/igdb/db/schema/themes';
import RecommendationHandler from './infrastructure/local/db/handlers/recommendationHandler';
import { mapRecommendations } from './infrastructure/local/db/map/mapRecommendations';
import { userOwnedGames } from './infrastructure/steam/db/schema/steamUserOwnedGames';

@Injectable()
export class GameService {
  recommendationHandler: RecommendationHandler;

  constructor() {
    this.recommendationHandler = new RecommendationHandler();
  }

  /**
   *
   * Gets a set of games.
   *
   * @remarks
   * This has low utility and was made for testing. There are no filters, just offset and size.
   *
   * @param page - Which page of results to get, default = 0
   * @param size - Page size, default = 100
   * @returns An array of games with multiple relations enabled
   */
  async getGames(page = 0, size = 100) {
    return await db.query.gamesTable.findMany({
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
        themesRelation: {
          columns: {},
          with: { theme: true },
        },
      },
    });
  }

  /**
   * Gets the users owned games
   * @param id - User id
   * @param relations - Object with drizzle relations
   * @returns User's owned games
   */
  async getOwnedGames(id: number, relations = {}) {
    const games = await db.query.userOwnedGames.findMany({
      where: eq(userOwnedGames.userId, id) && gt(userOwnedGames.playtime, 0),
      with: relations,
    });
    return games;
  }

  /**
   *
   * @param id - User id
   * @returns Previously shown game recommendations for the given user
   */
  async getPreviousRecommendations(id: number) {
    return await this.recommendationHandler.getRecommendations(id);
  }

  /**
   *
   * @param id - User id
   * @returns Game recommendations for a user based on their most played games
   */
  async getTimeRecommendations(id: number) {
    //Get owned games
    const ownedGames: any = await this.getOwnedGames(id, {
      steam: {
        with: { igdbGame: true },
      },
    });

    // Get genres/themes
    const genres = await this.getTopTag(id, 'genres', genresTable);
    const themes = await this.getTopTag(id, 'themes', themesTable);
    const genreIds = new Set<number>();
    const themeIds = new Set<number>();
    const rndm = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    while (genreIds.size < 3) {
      genreIds.add(genres[rndm(0, Math.min(genres.length, 10))].igdbId);
    }
    for (let i = 0; i < 10; i++) {
      if (themes[i].igdbId === 1) continue;
      themeIds.add(themes[i].igdbId);
    }

    // Get playtime of genres
    let genrePlaytime = 0;
    const ownedIgdbIds = new Set<number>();
    for (const game of ownedGames) {
      if (!game.steam || !game.steam.igdbGame) continue;
      ownedIgdbIds.add(game.steam.igdbGame.igdbId);
      if (game.steam.igdbGame.genres) {
        for (const gameGenre of game.steam.igdbGame.genres) {
          const tempPlaytime = genrePlaytime;
          for (const topGenre of genres) {
            if (gameGenre === topGenre.igdbId) {
              genrePlaytime += game.playtime;
              break;
            }
          }
          if (tempPlaytime !== genrePlaytime) break;
        }
      }
    }

    // Get similar games from db
    const igdbGames = await db.query.gamesTable.findMany({
      where: and(
        arrayOverlaps(gamesTable.genres, [...genreIds]),
        arrayOverlaps(gamesTable.themes, [...themeIds]),
      ),
      with: {
        cover: true,
        screenshots: {
          columns: {},
          with: { ss: true },
        },
        themesRelation: {
          columns: {},
          with: { theme: true },
        },
      },
    });
    const matchCount = new Map();
    for (const game of igdbGames) {
      const id = game.igdbId;
      if (game.genres)
        for (const gameGenre of game.genres) {
          for (const topGenre of [...genreIds]) {
            if (gameGenre === topGenre) {
              if (matchCount.has(id))
                matchCount.set(id, matchCount.get(id) + 1);
              else matchCount.set(id, 1);
            }
          }
        }
      if (game.themes)
        for (const gameTheme of game.themes) {
          for (const topTheme of [...themeIds]) {
            if (gameTheme === topTheme) {
              if (matchCount.has(id))
                matchCount.set(id, matchCount.get(id) + 1);
              else matchCount.set(id, 1);
            }
          }
        }
    }

    // Filter out owned games from results, sort games
    const mem = new Map();
    const filteredGames = igdbGames
      .filter((e) => !ownedIgdbIds.has(e.igdbId))
      .sort((a, b) => {
        let resA,
          resB = 0;
        const aCount = matchCount.get(a.igdbId);
        const bCount = matchCount.get(b.igdbId);
        const aRate = a.totalRating;
        const bRate = b.totalRating;
        const aRateCount = a.totalRatingCount;
        const bRateCount = b.totalRatingCount;
        if (mem.has(a.igdbId)) {
          resA = mem.get(a.igdbId);
        } else {
          resA = ciLowerBound(aRate || 1, aRateCount || 1) * aCount;
          mem.set(a.igdbId, resA);
        }
        if (mem.has(b.igdbId)) {
          resB = mem.get(b.igdbId);
        } else {
          resB = ciLowerBound(bRate || 1, bRateCount || 1) * bCount;
          mem.set(b.igdbId, resB);
        }
        return resB - resA;
      })
      .slice(0, 25);

    const gameRecommendations = new Array(filteredGames.length);
    for (let i = 0; i < filteredGames.length; i++) {
      gameRecommendations[i] = { game: filteredGames[i] };
      if (filteredGames[i].themes)
        for (const gameTheme of filteredGames[i].themesRelation) {
          for (const topTheme of [...themeIds]) {
            if (gameTheme.theme.igdbId === topTheme) {
              gameRecommendations[i].type = 'tag';
              gameRecommendations[i].typeText = gameTheme.theme.name;
            }
          }
        }
    }

    const mappedRecommendations = mapRecommendations(id, gameRecommendations);
    await this.recommendationHandler.addRecommendations(mappedRecommendations);

    return {
      games: gameRecommendations,
      genres: genres.slice(0, 3),
      highlights: ownedGames
        .sort((a, b) => b.playtime - a.playtime)
        .filter((e) => {
          if (e && e.steam && e.steam.igdbGame && e.steam.igdbGame.genres)
            for (const gameGenre of e.steam.igdbGame.genres) {
              if (genreIds.has(gameGenre)) return true;
            }
        })
        .slice(0, 3),
      time: genrePlaytime,
      type: 'time',
    };
  }

  /**
   * Get the user's most played [resource]
   * @param id - User id
   * @param key - Type of resource to get
   * @param table - Resource table
   */
  async getTopTag(id: number, key: string, table: any) {
    const games: any = await this.getOwnedGames(id, {
      steam: { with: { igdbGame: true } },
    });
    const sortedGames = games.sort((a, b) => b.playtime - a.playtime);
    const genrePlaytime = new Map();
    const mappedGenres = new Map();
    for (const game of sortedGames) {
      if (!game.steam || !game.steam.igdbGame || !game.steam.igdbGame[key])
        continue;
      const curr = game.steam.igdbGame[key];
      for (const genre of curr) {
        if (mappedGenres.has(genre)) {
          genrePlaytime.set(genre, genrePlaytime.get(genre) + game.playtime);
          mappedGenres.set(genre, mappedGenres.get(genre) + 1);
        } else {
          mappedGenres.set(genre, 1);
          genrePlaytime.set(genre, game.playtime);
        }
      }
    }
    const genreIds = [...mappedGenres.keys()].sort(
      (a, b) => mappedGenres.get(b) - mappedGenres.get(a),
    );
    const genres = await db.query[`${key}Table`].findMany({
      where: inArray(table.igdbId, genreIds),
    });
    console.log(genrePlaytime, mappedGenres);
    const mem = new Map();
    return genres.sort((a, b) => {
      let resA,
        resB = 0;
      const aCount = mappedGenres.get(a.igdbId);
      const aPlaytime = genrePlaytime.get(a.igdbId);
      const bCount = mappedGenres.get(b.igdbId);
      const bPlaytime = genrePlaytime.get(b.igdbId);
      if (mem.has(a.igdbId)) {
        resA = mem.get(a.igdbId);
      } else {
        resA = ciLowerBound(aPlaytime || 1, aCount || 1) * 100;
        mem.set(a.igdbId, resA);
      }
      if (mem.has(b.igdbId)) {
        resB = mem.get(b.igdbId);
      } else {
        resB = ciLowerBound(bPlaytime || 1, bCount || 1) * 100;
        mem.set(b.igdbId, resB);
      }
      return resB - resA;
    });
  }
}
