import { config } from '@g4mr/config';
import { TwitchResponseBody } from './interfaces';

export default class TwitchHandler {
  private clientId: string;
  private grantType: string;
  private apiUrl: string;
  private clientSecret: string;
  constructor(public accessToken: string = '') {
    // TODO: Add constructor logic to allow access token to be passed in from start
    this.clientId = config.twitch.clientId;
    this.clientSecret = config.twitch.clientSecret;
    this.apiUrl = config.twitch.apiUrl;
    this.grantType = 'client_credentials';
  }

  async connect() {
    const response = await fetch(`${this.apiUrl}oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: this.grantType,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to connect to Twitch API');
    }

    const resJson: TwitchResponseBody = await response.json();

    if (!resJson.access_token) {
      throw new Error('Failed to get access token');
    }

    this.accessToken = resJson.access_token;

    return resJson;
  }

  async validateToken() {
    const response = await fetch(`${this.apiUrl}/oauth2/validate`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      console.warn('Access token is invalid. Refreshing token...');
      this.connect();
    }

    return await response.json();
  }
}
