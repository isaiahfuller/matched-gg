import {
  TwitchHandlerInterface,
  TwitchHandlerConstructor,
  TwitchEndpoints,
} from './interfaces';

import { TwitchTokenRequestDTO } from './DTO/TwitchTokenRequestDTO';
import { TwitchTokenResponseDTO } from './DTO/TwitchTokenResponseDTO';
import { TwitchValidateResponseDTO } from './DTO/TwitchValidateResponseDTO';

import buildTwitchUrl from '../util/buildTwitchUrl';

export default class TwitchHandler implements TwitchHandlerInterface {
  private clientId: string;
  private grantType: string;
  private apiUrl: string;
  private clientSecret: string;
  private tokenValidationInterval: NodeJS.Timeout | undefined = undefined;
  constructor(
    protected config: TwitchHandlerConstructor['config'],
    protected logger: TwitchHandlerConstructor['logger'],
    public accessToken: TwitchHandlerConstructor['accessToken'] = '',
  ) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.apiUrl = config.apiUrl;
    this.grantType = 'client_credentials';
    this.logger = logger;
  }

  async connect(): Promise<TwitchTokenResponseDTO> {
    const tokenRequestBody: TwitchTokenRequestDTO = {
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
      this.logger.error('Failed to connect to Twitch API');
      throw new Error('Failed to connect to Twitch API');
    }

    const resJson: TwitchTokenResponseDTO = await response.json();

    if (!resJson.access_token) {
      this.logger.error(resJson, 'Failed to get access token');
      throw new Error('Failed to get access token');
    }

    this.accessToken = resJson.access_token;

    this.stopTokenValidationInterval();
    this.startTokenValidationInterval();

    this.logger.info(resJson, 'Connected to Twitch API');

    return resJson;
  }

  async validateToken(): Promise<TwitchValidateResponseDTO> {
    const response = await fetch(
      buildTwitchUrl(this.apiUrl, TwitchEndpoints.OAUTH2_VALIDATE),
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      this.logger.warn('Access token is invalid. Refreshing token...');
      this.connect();
    }

    const resJson: TwitchValidateResponseDTO = await response.json();

    return resJson;
  }

  async getTokenTimeRemaining(): Promise<number> {
    const timeRemaining = await this.validateToken();
    return timeRemaining.expires_in;
  }

  startTokenValidationInterval(): void {
    this.tokenValidationInterval = setInterval(
      async () => {
        this.logger.info('Validating Twitch token...');
        const validateTokenResponse = await this.validateToken();
        if (validateTokenResponse.expires_in < 300) {
          this.logger.warn('Token is about to expire. Refreshing token...');
          this.connect();
        }
        this.logger.info(validateTokenResponse, 'Twitch token validated');
      },
      59 * 60 * 1000,
    ); // Run every 59 minutes
  }

  stopTokenValidationInterval(): void {
    if (this.tokenValidationInterval) {
      this.logger.info('Found interval.');
      this.clearTokenValidationInterval();
    }
  }

  clearTokenValidationInterval(): void {
    this.logger.info('Clearing interval...');
    clearInterval(this.tokenValidationInterval);
    this.tokenValidationInterval = undefined;
  }
}
