import { config } from '@config/config';

const BASE_URL = 'https://api.steampowered.com/';
const API_KEY = config.steam.apiKey;
export default function buildSteamUrl(method, options) {
  const res = [BASE_URL, method, '/v1/', `?key=${API_KEY}`];
  for (const [k, v] of Object.entries(options)) {
    res.push(`&${k}=${v}`);
  }
  return res.join('');
}
