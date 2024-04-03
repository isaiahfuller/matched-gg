import {
  TwitchHandlerInterface,
  TwitchHandlerConstructor,
  TwitchEndpoints,
} from './interfaces';
import { ApiUrl, ClientId, ClientSecret, GrantType } from './types';

import { TwitchTokenRequestDTO } from './DTO/TwitchTokenRequestDTO';
import { TwitchTokenResponseDTO } from './DTO/TwitchTokenResponseDTO';
import {
  TwitchValidTokenResponseDTO,
  TwitchInvalidTokenResponseDTO,
} from './DTO/TwitchValidateResponseDTO';
import { isInvalidToken } from '../util/isInvalidToken';

import buildTwitchUrl from '../util/buildTwitchUrl';

import axios, { AxiosResponse } from 'axios';

class TwitchHandler implements TwitchHandlerInterface {
  private clientId: ClientId;
  private grantType: GrantType;
  private apiUrl: ApiUrl;
  private clientSecret: ClientSecret;
  private tokenValidationInterval: NodeJS.Timeout | undefined = undefined;
  private initialTimeRemaining: number = 0; // TODO: Implement ticker to keep track of time remaining

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
    if (this.connected) {
      this.logger.info('Already connected to Twitch API');
      return {
        access_token: this.accessToken,
        expires_in: this.initialTimeRemaining,
        token_type: 'bearer',
      } as TwitchTokenResponseDTO;
    }

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

    if (!response || !response.data || response.status !== 200) {
      this.failConnection();
    }

    if (!response.data.access_token) {
      this.logger.error(
        response.data,
        'Failed to get access token, this is an unexpected response from Twitch API\nPlease check the logged object for more information.',
      );
      this.connected = false;
      throw new Error('Failed to get access token');
    }

    this.logger.info('Connected to Twitch API');
    this.connected = true;
    this.accessToken = response.data.access_token;
    this.restartTokenValidationInterval();

    return response.data;
  }

  private failConnection(): void {
    this.logger.error('Failed to connect to Twitch API');
    this.connected = false;
    throw new Error('Failed to connect to Twitch API');
  }

  /**
   * Validates the access token by calling the Twitch API.
   * If a token is provided as an argument, it validates the token *
   * with the param token. Otherwise, it uses the token stored in the class.
   *
   * Unless you have an access token, you should call connect() first before calling this method.
   *
   * @param _accessToken - The access token to validate (optional).
   * @returns A Promise that resolves to a TwitchValidateResponseDTO object.
   * @throws An error if there's no token to validate. Try calling connect() first.
   */
  async validateToken(
    _accessToken?: TwitchHandlerConstructor['accessToken'],
  ): Promise<TwitchValidTokenResponseDTO | TwitchTokenResponseDTO> {
    if (!this.accessToken && !_accessToken) {
      this.logger.error(
        { accessToken: this.accessToken },
        "There's no token to validate! Try calling connect() first.",
      );
      throw new Error(
        "There's no token to validate! Try calling connect() first.",
      );
    }

    const endpoint: ApiUrl = buildTwitchUrl(
      this.apiUrl,
      TwitchEndpoints.OAUTH2_VALIDATE,
    );

    const response: AxiosResponse<
      TwitchValidTokenResponseDTO | TwitchInvalidTokenResponseDTO
    > = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${this.accessToken || _accessToken}`,
      },
    });

    if (isInvalidToken(response.data)) {
      this.logger.error(
        response.data,
        'Invalid access token. Please check the logged object for more information. Attempting to reconnect...',
      );
      return await this.connect();
    } else {
      this.logger.info('Token is valid');
      return response.data;
    }
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

  /**
   * Retrieves the remaining time in seconds until the Twitch token expires.
   * @returns A Promise that resolves to the remaining time in seconds.
   */
  async getTokenTimeRemaining(): Promise<number> {
    const timeRemaining = await this.validateToken();
    return timeRemaining.expires_in;
  }

  /**
   * Starts the token validation interval.
   * This function invokes the validateToken method every 59 minutes. This is required by the Twitch API terms of service to keep the token valid.
   */
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

  /**
   * Stops the token validation interval if it is running.
   */
  stopTokenValidationInterval(): void {
    if (this.tokenValidationInterval) {
      this.logger.info('Found interval.');
      this.clearTokenValidationInterval();
    }
  }

  restartTokenValidationInterval(): void {
    this.stopTokenValidationInterval();
    this.startTokenValidationInterval();
  }

  /**
   * Clears the token validation interval.
   */
  clearTokenValidationInterval(): void {
    this.logger.info('Clearing interval...');
    clearInterval(this.tokenValidationInterval);
    this.tokenValidationInterval = undefined;
  }
}

export default TwitchHandler;
