import { Injectable } from '@nestjs/common';
import { ciLowerBound } from '@util/ciLowerBound';
import { rndm } from '@util/rndm';
import {
  and,
  arrayOverlaps,
  eq,
  gt,
  inArray,
  isNotNull,
  lt,
  notInArray,
} from 'drizzle-orm';

import { db } from './db/db';
import { gamesTable } from './infrastructure/igdb/db/schema/games';
import { genresTable } from './infrastructure/igdb/db/schema/genres';
import { themesTable } from './infrastructure/igdb/db/schema/themes';
import RecommendationHandler from './infrastructure/local/db/handlers/recommendationHandler';
import { mapRecommendations } from './infrastructure/local/db/map/mapRecommendations';
import { igdbSteamConnect } from './infrastructure/steam/db/schema/igdbSteamConnect';
import { userOwnedGames } from './infrastructure/steam/db/schema/steamUserOwnedGames';

@Injectable()
export class GameService {
  recommendationHandler: RecommendationHandler;
  topGames: any[] = [];
  topGamesInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.recommendationHandler = new RecommendationHandler();
    this.topGamesInterval = setInterval(this.getTopGames, 1000 * 60 * 60 * 24); // Update every 24 hours
    this.getTopGames();
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
        with: { igdbGame: { with: { parentGame: true } } },
      },
    });

    // Get genres/themes
    const genres = await this.getTopTag(id, 'genres', genresTable);
    const themes = await this.getTopTag(id, 'themes', themesTable);
    const genreIds = new Set<number>();
    const themeIds = new Set<number>();
    while (genreIds.size < 3) {
      genreIds.add(genres[rndm(0, Math.min(genres.length, 10))].igdbId);
    }
    for (let i = 0; i < 10; i++) {
      if (themes[i].igdbId === 1) continue;
      themeIds.add(themes[i].igdbId);
    }

    // Get playtime of genres
    let genrePlaytime = 0;
    const excludedIds = new Set<number>();
    for (const game of ownedGames) {
      if (!game.steam || !game.steam.igdbGame) continue;
      excludedIds.add(game.steam.igdbGame.igdbId);
      if (game.steam.igdbGame.parentGame) {
        const parentGame = game.steam.igdbGame.parentGame;
        excludedIds.add(parentGame.igdbId);
        if (parentGame.ports) parentGame.ports.map((e) => excludedIds.add(e));
        if (parentGame.bundles)
          parentGame.bundles.map((e) => excludedIds.add(e));
        if (parentGame.remasters)
          parentGame.remasters.map((e) => excludedIds.add(e));
        if (parentGame.expandedGames)
          parentGame.expandedGames.map((e) => excludedIds.add(e));
      }
      if (game.steam.igdbGame.versionParent)
        excludedIds.add(game.steam.igdbGame.versionParent);
      if (game.steam.igdbGame.ports)
        game.steam.igdbGame.ports.map((e) => excludedIds.add(e));
      if (game.steam.igdbGame.bundles)
        game.steam.igdbGame.bundles.map((e) => excludedIds.add(e));
      if (game.steam.igdbGame.remasters)
        game.steam.igdbGame.remasters.map((e) => excludedIds.add(e));
      if (game.steam.igdbGame.expandedGames)
        game.steam.igdbGame.expandedGames.map((e) => excludedIds.add(e));
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

    const gameRecommendations = await this.recommendationDb(
      excludedIds,
      genreIds,
      themeIds,
    );

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
   * Gets the top 100 games from SteamSpy
   * and stores them in the topGames property.
   * This is used for recommendations and other purposes.
   */
  async getTopGames() {
    const steamSpyResponse = await fetch(
      'https://steamspy.com/api.php?request=top100in2weeks',
    );
    const steamSpyData = await steamSpyResponse.json();
    const steamIds = Object.keys(steamSpyData).map(Number);
    const games = await db.query.igdbSteamConnect.findMany({
      where: inArray(igdbSteamConnect.steamId, steamIds),
      with: {
        igdbGame: true,
      },
    });
    this.topGames = games;
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

  /**
   * Gets game recommendations based on user preferences
   * and filters out games the user already owns.
   * @param excludedIds - Set of game ids to exclude from recommendations
   * @param genreIds - Set of genre ids to include in recommendations
   * @param themeIds - Set of theme ids to include in recommendations
   * @returns An array of game recommendations based on the provided filters
   */
  async recommendationDb(
    excludedIds: Set<number>,
    genreIds: Set<number>,
    themeIds: Set<number>,
  ) {
    // Get similar games from db
    const igdbGames = await db.query.gamesTable.findMany({
      where: and(
        arrayOverlaps(gamesTable.genres, [...genreIds]),
        arrayOverlaps(gamesTable.themes, [...themeIds]),
        notInArray(gamesTable.gameType, [14, 7, 1, 3, 2, 6]),
        notInArray(gamesTable.igdbId, [...excludedIds]),
        isNotNull(gamesTable.firstReleaseDate),
        lt(gamesTable.firstReleaseDate, new Date()),
      ),
      with: {
        cover: true,
        genresRelation: {
          columns: {},
          with: { genre: true },
        },
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
          for (const topGenre of genreIds) {
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
      .filter((e) => !excludedIds.has(e.igdbId))
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
      if (filteredGames[i].genres)
        for (const gameGenre of filteredGames[i].genresRelation) {
          for (const topGenre of [...genreIds]) {
            if (gameGenre.genre.igdbId === topGenre) {
              gameRecommendations[i].type = 'tag';
              gameRecommendations[i].typeText = gameGenre.genre.name;
            }
          }
        }
    }
    return gameRecommendations;
  }

  async topGameRecommendations() {
    if (!this.topGames || this.topGames.length === 0) {
      await this.getTopGames();
    }

    // Get top game IGDB ids
    const topGameIds = this.topGames.map((game) => game.igdbGame.igdbId);

    // Get genres and themes from top games
    const genreIds = new Set<number>();
    const themeIds = new Set<number>();
    const genreCount = new Map<number, number>();
    const themeCount = new Map<number, number>();
    for (const game of this.topGames) {
      if (!game.igdbGame || !game.igdbGame.genres) continue;
      for (const genre of game.igdbGame.genres) {
        genreIds.add(genre);
        genreCount.set(genre, (genreCount.get(genre) || 0) + 1);
      }
      if (game.igdbGame.themes) {
        for (const theme of game.igdbGame.themes) {
          themeIds.add(theme);
          themeCount.set(theme, (themeCount.get(theme) || 0) + 1);
        }
      }
    }

    // Select random genres and themes from the top 10 most frequent
    const topGenres = new Set<number>();
    const topThemes = new Set<number>();

    const sortedGenreIds = [...genreCount.entries()].sort(
      (a, b) => b[1] - a[1],
    );
    const sortedThemeIds = [...themeCount.entries()].sort(
      (a, b) => b[1] - a[1],
    );
    while (topGenres.size < 3 && sortedGenreIds.length > 0) {
      const i = rndm(0, Math.min(sortedGenreIds.length - 1, 9));
      topGenres.add(sortedGenreIds[i][0]);
    }
    while (topThemes.size < 10 && sortedThemeIds.length > 0) {
      const i = rndm(0, Math.min(sortedThemeIds.length - 1, 25));
      topThemes.add(sortedThemeIds[i][0]);
    }

    const gameRecommendations = await this.recommendationDb(
      new Set<number>(topGameIds),
      topGenres,
      topThemes,
    );

    const games = gameRecommendations.map((game) => ({
      ...game,
      type: 'top',
      typeText: null,
    }));

    return {
      games: games,
      genres: [...topGenres],
      highlights: [],
      time: 0,
      type: 'top',
    };
  }
}
