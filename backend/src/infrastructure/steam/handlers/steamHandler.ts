import { SteamConfig } from '@config/interfaces';
import { UnauthorizedException } from '@nestjs/common';
import { chunk } from '@util/chunk';
import axios from 'axios';
import { eq, gt } from 'drizzle-orm';
import { IgdbDbController } from 'src/infrastructure/igdb/db/controller/IgdbDbController';

import { mapOwnedGame } from '../db/map/mapOwnedGame';
import { userOwnedGames } from '../db/schema/steamUserOwnedGames';
import buildSteamUrl from '../util/buildSteamUrl';
import { SteamOwnedGames } from './interfaces';

export default class SteamHandler {
  private NoIdError = new Error(
    'No Steam ID provided! Is there a valid, logged in session?',
  );
  private apiKey: SteamConfig['apiKey'];
  private dbController: IgdbDbController;
  BASE_URL = 'https://api.steampowered.com';
  constructor(config) {
    this.apiKey = config.steam.apiKey;
    this.dbController = new IgdbDbController();
  }

  /**
   *
   * @param steamId
   * @param appid
   * @returns
   */
  public async getGameAchievements(steamId, appid) {
    if (!steamId) {
      throw this.NoIdError;
    }
    const method = 'ISteamUserStats/GetPlayerAchievements';
    const url = buildSteamUrl(method, {
      appid: appid,
      steamid: steamId,
    });
    const response = await axios.get(url);
    if (!response.data.playerstats.success) {
      throw new Error(response.data.playerstats.error);
    }
    const achievements = response.data.playerstats.achievements;

    return achievements;
  }
  /**
   *
   * @param steamId
   * @returns The user's owned games, with playtime and last played timestamp
   */
  public async getOwnedGames(steamId) {
    if (!steamId) {
      throw this.NoIdError;
    }
    const method = 'IPlayerService/GetOwnedGames';
    const url = buildSteamUrl(method, {
      include_played_free_games: true,
      steamid: steamId,
    });
    const response = await axios.get(url);
    const data: SteamOwnedGames = response.data.response;
    if (!('games' in data)) {
      throw new Error('Steam ID was invalid.');
    }
    return data;
  }
  public async getSimilarGames(session) {
    if (!session || !session.user || !session.user.steam) {
      throw new UnauthorizedException('No Steam account linked');
    }
    const db = this.dbController.getConnection();
    const data = await db.query.userOwnedGames.findMany({
      columns: {},
      orderBy: (userOwnedGames, { desc }) => [desc(userOwnedGames.playtime)],
      where:
        eq(userOwnedGames.userId, session.user.id) &&
        gt(userOwnedGames.playtime, 20),
      with: {
        steam: {
          columns: {},
          with: {
            igdbGame: {
              columns: {},
              with: {
                similarGames: {
                  columns: {},
                  with: {
                    pg: {
                      columns: { name: true },
                    },
                    sg: {
                      with: {
                        // artworks: true,
                        cover: true,
                        screenshots: {
                          columns: {},
                          with: { ss: true },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    console.log(data);
    const games = {};
    for (const p of data.filter(
      (p) => p.steam && p.steam.igdbGame && p.steam.igdbGame.similarGames,
    )) {
      for (const g of p.steam!.igdbGame!.similarGames) {
        if (!games[g.sg.igdbId]) games[g.sg.igdbId] = { count: 1, game: g.sg };
        else games[g.sg.igdbId].count++;
      }
    }
    return Object.values<{ count: number }>(games).sort(
      (a, b) => b.count - a.count,
    );
  }
  public async syncAccount(session) {
    if (!session || !session.user || !session.user.steam) {
      throw new UnauthorizedException('No Steam account linked');
    }
    const data = await this.getOwnedGames(session.user.steam.steamId);
    const games = data.games.map((game) => mapOwnedGame(game, session.user.id));
    const chunks = chunk(games, 1000);
    chunks.forEach((chunk) => {
      this.dbController.storeOwnedSteam(chunk, userOwnedGames);
    });
    return games;
  }
}
