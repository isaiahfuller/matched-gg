import { TwitchEndpoints } from '../handlers/interfaces';
import validateUrl from './validateUrl';
import { ApiUrl } from '../handlers/types';

/**
 * Builds a Twitch API URL by combining the base API URL and the specified endpoint.
 * @param apiUrl - The base API URL.
 * @param endpoint - The endpoint to append to the base URL.
 * @returns The complete Twitch API URL. i.e. 'https://id.twitch.tv/oauth2/token'
 */
export default function buildTwitchUrl(
  apiUrl: ApiUrl,
  endpoint: TwitchEndpoints,
): ApiUrl {
  const validatedUrl: ApiUrl = validateUrl(`${apiUrl}${endpoint}`);
  return validatedUrl;
}
