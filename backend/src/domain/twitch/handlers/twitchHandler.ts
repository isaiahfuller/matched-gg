import {
  TwitchHandlerInterface,
  TwitchHandlerConstructor,
  TwitchEndpoints,
} from './interfaces';
import { ApiUrl, ClientId, ClientSecret, GrantType } from './types';

import { TwitchTokenRequestDTO } from './DTO/TwitchTokenRequestDTO';
import { TwitchTokenResponseDTO } from './DTO/TwitchTokenResponseDTO';
import { TwitchValidateResponseDTO } from './DTO/TwitchValidateResponseDTO';

import buildTwitchUrl from '../util/buildTwitchUrl';

import axios, { AxiosResponse } from 'axios';

class TwitchHandler implements TwitchHandlerInterface {
  private clientId: ClientId;
  private grantType: GrantType;
  private apiUrl: ApiUrl;
  private clientSecret: ClientSecret;
  private tokenValidationInterval: NodeJS.Timeout | undefined = undefined;

  public connected = false;
  public connectionEndpoint: ApiUrl = '';
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

    const endpoint: ApiUrl = buildTwitchUrl(
      this.apiUrl,
      TwitchEndpoints.OAUTH2_TOKEN,
    );

    const response: AxiosResponse<TwitchTokenResponseDTO> = await axios.post(
      endpoint,
      tokenRequestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.statusText !== 'OK' || response.status !== 200) {
      this.logger.error(
        {
          statusText: response.statusText,
          status: response.status,
        },
        'Failed to connect to Twitch API',
      );
      throw new Error('Failed to connect to Twitch API');
    }

    if (!response.data.access_token) {
      this.logger.error(response.data, 'Failed to get access token');
      this.connected = false;
      throw new Error('Failed to get access token');
    }

    this.accessToken = response.data.access_token;

    this.stopTokenValidationInterval();
    this.startTokenValidationInterval();

    this.logger.info('Connected to Twitch API');
    this.connected = true;

    return response.data;
  }

  async validateToken(): Promise<TwitchValidateResponseDTO> {
    if (!this.accessToken) {
      this.logger.error(
        { accessToken: this.accessToken },
        "There's no token to validate! Try calling connect() first.",
      );
    }

    const endpoint: ApiUrl = buildTwitchUrl(
      this.apiUrl,
      TwitchEndpoints.OAUTH2_VALIDATE,
    );

    const response: AxiosResponse<TwitchValidateResponseDTO> = await axios.get(
      endpoint,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      },
    );

    if (response.statusText !== 'OK' || response.status !== 200) {
      this.logger.warn('Access token is invalid. Refreshing token...');
      this.connect();
    }

    return response.data;
  }

  // TODO: Create a type for the return value
  /**
   * Retrieves the connection status and endpoint of the Twitch handler.
   * @returns {object} The connection status and endpoint.
   */
  getConnectionStatus(): object {
    return {
      connected: this.connected,
      endpoint: this.apiUrl,
    };
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

export default TwitchHandler;
