import { SteamConfig } from '@config/interfaces';
import axios from 'axios';
import { Logger } from 'pino';
import buildSteamUrl from '../util/buildSteamUrl';
import { SteamOwnedGames } from './interfaces';

export default class SteamHandler {
  private apiKey: SteamConfig['apiKey'];
  BASE_URL = 'https://api.steampowered.com';
  private NoIdError = new Error(
    'No Steam ID provided! Is there a valid, logged in session?',
  );
  constructor(config) {
    this.apiKey = config.steam.apiKey;
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
      steamid: steamId,
      include_played_free_games: true,
    });
    const response = await axios.get(url);
    const data: SteamOwnedGames = response.data.response;
    if (!('games' in data)) {
      throw new Error('Steam ID was invalid.');
    }
    return data;
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
      steamid: steamId,
      appid: appid,
    });
    const response = await axios.get(url);
    if (!response.data.playerstats.success) {
      throw new Error(response.data.playerstats.error);
    }
    const achievements = response.data.playerstats.achievements;

    return achievements;
  }
}
