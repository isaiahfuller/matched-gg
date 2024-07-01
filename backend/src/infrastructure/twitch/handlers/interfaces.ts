import { TwitchConfig } from '@config/interfaces';
import { Logger } from 'pino';

import { TwitchTokenResponseDTO } from './DTO/TwitchTokenResponseDTO';
import { TwitchValidTokenResponseDTO } from './DTO/TwitchValidateResponseDTO';

/**
 * Represents the interface for a Twitch handler.
 */
export interface TwitchHandlerInterface {
  accessToken: string;

  /**
   * Clears the token validation interval.
   * Reserved for cleanup or destruction of the handler.
   */
  clearTokenValidationInterval(): void;

  /**
   * Connects to Twitch and returns a promise that resolves to the Twitch response body.
   * @returns A promise that resolves to the Twitch response body.
   */
  connect(): Promise<TwitchTokenResponseDTO>;

  /**
   * Returns the remaining time in seconds until the token expires.
   * @returns The remaining time in seconds until the token expires.
   */
  getTokenTimeRemaining(): Promise<number>;

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

  /**
   * Validates the Twitch token and returns a promise that resolves to the Twitch response body.
   * @returns A promise that resolves to the Twitch response body.
   */
  validateToken(
    _accessToken: TwitchHandlerConstructor['accessToken'],
  ): Promise<TwitchTokenResponseDTO | TwitchValidTokenResponseDTO>;
}

/**
 * Represents the constructor for a Twitch handler.
 */
export interface TwitchHandlerConstructor {
  accessToken: string;
  config: TwitchConfig;
  logger: Logger; // TODO: Create logger abstraction that can take any logger and return a logger with the same interface.
}

/**
 * Enum representing the Twitch API endpoints.
 */
export enum TwitchEndpoints {
  /**
   * Endpoint for revoking an OAuth2 token.
   */
  OAUTH2_REVOKE = 'oauth2/revoke',

  /**
   * Endpoint for obtaining an OAuth2 token.
   */
  OAUTH2_TOKEN = 'oauth2/token',

  /**
   * Endpoint for validating an OAuth2 token.
   */
  OAUTH2_VALIDATE = 'oauth2/validate',
}
