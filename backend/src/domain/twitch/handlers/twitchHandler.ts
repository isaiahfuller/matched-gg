import { config } from '@g4mr/config';
import {
  TwitchResponseBody,
  TwitchTokenRequestBody,
  TwitchHandlerInterface,
  TwitchHandlerConstructor,
  TwitchEndpoints,
} from './interfaces';
import buildTwitchUrl from '../util/buildTwitchUrl';
import { logger } from 'src/util/logger';

export default class TwitchHandler implements TwitchHandlerInterface {
  private clientId: string;
  private grantType: string;
  private apiUrl: string;
  private clientSecret: string;
  constructor(
    public accessToken: TwitchHandlerConstructor['accessToken'] = '',
  ) {
    this.clientId = config.twitch.clientId;
    this.clientSecret = config.twitch.clientSecret;
    this.apiUrl = config.twitch.apiUrl;
    this.grantType = 'client_credentials';
  }

  async connect(): Promise<TwitchResponseBody> {
    const tokenRequestBody: TwitchTokenRequestBody = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: this.grantType,
    };

    const response = await fetch(
      buildTwitchUrl(this.apiUrl, TwitchEndpoints.OAUTH2_TOKEN),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenRequestBody),
      },
    );

    if (!response.ok) {
      logger.error('Failed to connect to Twitch API');
      throw new Error('Failed to connect to Twitch API');
    }

    const resJson: TwitchResponseBody = await response.json();

    if (!resJson.access_token) {
      logger.error(resJson, 'Failed to get access token');
      throw new Error('Failed to get access token');
    }

    this.accessToken = resJson.access_token;

    this.stopTokenValidationInterval();
    this.startTokenValidationInterval();

    logger.info(resJson, 'Connected to Twitch API');
    return resJson;
  }

  async validateToken(): Promise<TwitchResponseBody> {
    const response = await fetch(`${this.apiUrl}/oauth2/validate`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      logger.warn('Access token is invalid. Refreshing token...');
      console.warn('Access token is invalid. Refreshing token...');
      this.connect();
    }

    return await response.json();
  }

  private tokenValidationInterval: NodeJS.Timeout | null = null;

  startTokenValidationInterval(): void {
    this.tokenValidationInterval = setInterval(
      () => {
        logger.info('Validating Twitch token...');
        const validateTokenResponse = this.validateToken();
        logger.info(validateTokenResponse, 'Twitch token validated');
      },
      59 * 60 * 1000,
    ); // Run every 59 minutes
  }

  stopTokenValidationInterval(): void {
    if (this.tokenValidationInterval) {
      logger.info('Found token validation interval. Clearing interval...');
      clearInterval(this.tokenValidationInterval);
      this.tokenValidationInterval = null;
    }
  }
}
