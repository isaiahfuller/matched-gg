import { Logger } from 'pino';
import SteamHandler from './steamHandler';
import axios from 'axios';
import { SteamOwnedGames } from './interfaces';

jest.mock('axios');

const mockAxios = axios as jest.Mocked<typeof axios>;

describe('SteamHandler', () => {
  let steamHandler: SteamHandler;

  const logger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  } as unknown as Logger;

  beforeEach(() => {
    steamHandler = new SteamHandler({
      steam: {
        apiKey: '0d2pal0hrbpjyj1wc8ogqk2d81428z',
      },
    });
  });
  afterEach(() => {
    mockAxios.get.mockReset();
    mockAxios.post.mockReset();
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should connect to Steam', async () => {
    mockAxios.get.mockResolvedValue({
      data: {
        response: {
          game_count: 6969,
          games: [
            {
              appid: '69420',
              playtime_forever: 80085,
              playtime_windows_forever: 145,
              playtime_mac_forever: 145,
              playtime_linux_forever: 145,
              rtime_last_played: 119711,
              playtime_disconnected: 4789,
            },
          ],
        } as SteamOwnedGames,
      },
    });

    const response = await steamHandler.getOwnedGames('vbtgyuvty');
    expect(response).toBeDefined();
    expect(response.game_count).toBeDefined();
  });
  it('throw an error if missing a Steam ID', async () => {
    await expect(steamHandler.getOwnedGames(null)).rejects.toThrow(
      'No Steam ID provided! Is there a valid, logged in session?',
    );
  });
  it('throw an error if the Steam ID is invalid', async () => {
    mockAxios.get.mockResolvedValue({
      data: {
        response: {},
      },
    });
    await expect(steamHandler.getOwnedGames('xxxxxx')).rejects.toThrow(
      'Steam ID was invalid.',
    );
  });
  it("throw an error if achievements are requested on a game the user doesn't own", async () => {
    mockAxios.get.mockResolvedValue({
      data: {
        playerstats: {
          success: false,
          error: 'Requested app has no stats',
        },
      },
    });
    await expect(
      steamHandler.getGameAchievements('xxxxxx', 69420),
    ).rejects.toThrow('Requested app has no stats');
  });
});
