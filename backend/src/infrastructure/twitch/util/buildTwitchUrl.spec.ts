import { TwitchEndpoints } from '../handlers/interfaces';
import buildTwitchUrl from './buildTwitchUrl';
jest.mock('src/util/logger');

describe('buildTwitchUrl', () => {
  it('should build a Twitch API URL correctly', () => {
    const apiUrl = 'https://id.twitch.tv';
    const endpoint = TwitchEndpoints.OAUTH2_TOKEN;
    const expectedUrl = 'https://id.twitch.tv/oauth2/token';

    const result = buildTwitchUrl(apiUrl, endpoint);

    expect(result).toBe(expectedUrl);
  });

  it('should throw a zod error if url is invalid', () => {
    const apiUrl = 'https:/id.twitch.tv';
    const endpoint = 'oauth2/token';

    expect(() => buildTwitchUrl(apiUrl, endpoint as TwitchEndpoints)).toThrow();
  });
});
