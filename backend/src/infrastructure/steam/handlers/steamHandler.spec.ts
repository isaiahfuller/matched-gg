import axios from 'axios';
import SteamHandler from './steamHandler';

const mockFindMany = jest.fn();
jest.mock('axios');
jest.mock('../util/buildSteamUrl', () => ({
  __esModule: true,
  default: (_method: string, options: Record<string, unknown>) => new URLSearchParams(
    Object.entries(options).map(([key, value]) => [key, String(value)]),
  ).toString(),
}));
jest.mock('src/infrastructure/igdb/db/controller/IgdbDbController', () => ({
  IgdbDbController: jest.fn().mockImplementation(() => ({
    getConnection: () => ({ query: { igdbSteamConnect: { findMany: mockFindMany } } }),
  })),
}));

describe('Steam owned game names', () => {
  beforeEach(() => jest.clearAllMocks());

  it('requests app info and fills missing names without replacing Steam names', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { response: {
      game_count: 3,
      games: [{ appid: 10, name: 'Steam title', playtime_forever: 60 }, { appid: 20 }, { appid: 30 }],
    } } });
    mockFindMany.mockResolvedValue([{ steamId: 20, igdbGame: { name: 'IGDB title' } }]);
    const result = await new SteamHandler({ steam: { apiKey: 'test' } }).getOwnedGames('123');
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('include_appinfo=1'));
    expect(result.games).toEqual([
      { appid: 10, name: 'Steam title', playtime_forever: 60 },
      { appid: 20, name: 'IGDB title' },
      { appid: 30, name: undefined },
    ]);
  });

  it('avoids metadata lookups when Steam supplies names', async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { response: {
      game_count: 1, games: [{ appid: 10, name: 'Steam title' }],
    } } });
    await new SteamHandler({ steam: { apiKey: 'test' } }).getOwnedGames('123');
    expect(mockFindMany).not.toHaveBeenCalled();
  });
});
