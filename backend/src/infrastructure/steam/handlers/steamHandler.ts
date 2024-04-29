import { SteamConfig } from '@config/interfaces';
import axios from 'axios';
import { Logger } from 'pino';
import buildSteamUrl from '../util/buildSteamUrl';
import { SteamOwnedGames } from './interfaces';

export default class SteamHandler {
  private apiKey: SteamConfig['apiKey'];
  BASE_URL = 'https://api.steampowered.com';
  constructor(config) {
    this.apiKey = config.steam.apiKey;
  }

  /**
   *
   * @param steamId
   * @returns The user's owned games, with playtime and last played timestamp
   */
  public async getOwnedGames(steamId) {
    const method = 'IPlayerService/GetOwnedGames';
    const url = buildSteamUrl(method, {
      steamid: steamId,
      include_played_free_games: true,
    });
    const response: SteamOwnedGames = (await axios.get(url)).data.response;
    return response;
  }
  /**
   *
   * @param steamId
   * @param appid
   * @returns
   */
  public async getGameAchievements(steamId, appid) {
    const method = 'ISteamUserStats/GetPlayerAchievements';
    const url = buildSteamUrl(method, {
      steamid: steamId,
      appid: appid,
    });
    const response = (await axios.get(url)).data;
    console.log(response.playerstats.achievements);
    return response.playerstats;
  }
}
