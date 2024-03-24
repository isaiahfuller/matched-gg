import { TwitchEndpoints } from '../handlers/interfaces';
import validateTwitchUrl from './validateTwitchUrl';

export default function buildTwitchUrl(
  apiUrl: string,
  endpoint: TwitchEndpoints,
): string {
  const validatedUrl = validateTwitchUrl(apiUrl);
  return `${validatedUrl}${endpoint}`;
}
