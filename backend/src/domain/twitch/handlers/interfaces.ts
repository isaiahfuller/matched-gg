/**
 * Represents the response body returned by Twitch API.
 */
export interface TwitchResponseBody {
  access_token: string;
  expires_in: number;
  token_type: string;
}

/**
 * Represents the request body for obtaining a Twitch token.
 */
export interface TwitchTokenRequestBody {
  client_id: string;
  client_secret: string;
  grant_type: string;
}

/**
 * Represents the interface for a Twitch handler.
 */
export interface TwitchHandlerInterface {
  accessToken: string;

  /**
   * Connects to Twitch and returns a promise that resolves to the Twitch response body.
   * @returns A promise that resolves to the Twitch response body.
   */
  connect(): Promise<TwitchResponseBody>;

  /**
   * Validates the Twitch token and returns a promise that resolves to the Twitch response body.
   * @returns A promise that resolves to the Twitch response body.
   */
  validateToken(): Promise<TwitchResponseBody>;

  /**
   * Starts the token validation interval.
   * This is required by the Twitch API terms of service to keep the token valid.
   * DO NOT BYPASS THIS. As you will be subject to punitive action by Twitch.
   */
  startTokenValidationInterval(): void;

  /**
   * Stops the token validation interval.
   * Reserved for cleanup or destruction of the handler.
   */
  stopTokenValidationInterval(): void;
}

/**
 * Represents the constructor for a Twitch handler.
 */
export interface TwitchHandlerConstructor {
  accessToken: string;
}

/**
 * Enum representing the Twitch API endpoints.
 */
export enum TwitchEndpoints {
  /**
   * Endpoint for obtaining an OAuth2 token.
   */
  OAUTH2_TOKEN = 'oauth2/token',

  /**
   * Endpoint for validating an OAuth2 token.
   */
  OAUTH2_VALIDATE = 'oauth2/validate',

  /**
   * Endpoint for revoking an OAuth2 token.
   */
  OAUTH2_REVOKE = 'oauth2/revoke',
}
