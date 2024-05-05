import buildSteamUrl from './buildSteamUrl';
jest.mock('src/util/logger');

describe('buildSteamUrl', () => {
  it('should build a Steam API URL correctly', () => {
    const expectedUrl =
      'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=bny8iby8987byobnjhi&steamid=76561197989020054';
    const method = 'IPlayerService/GetOwnedGames';
    const options = {
      steamid: '76561197989020054',
    };
    const result = buildSteamUrl(method, options);

    expect(result).toBe(expectedUrl);
  });
});
