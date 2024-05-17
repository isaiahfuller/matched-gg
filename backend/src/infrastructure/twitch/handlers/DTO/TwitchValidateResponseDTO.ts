/**
 * Represents the response from the Twitch API when validating a token.
 * This response is returned when the token is valid.
 * @link https://dev.twitch.tv/docs/authentication/validate-tokens/
 */
export interface TwitchValidTokenResponseDTO {
  /**
   * The client ID of the application that requested the token.
   */
  client_id: string;
  /**
   * The number of seconds until the token expires.
   */
  expires_in: number;
  /**
   * The login of the user who the token represents. This field is undefined if validate endpoint is called with an App Access Token.
   *
   * @example 'twitchdev' | undefined
   */
  login: string | undefined;
  /**
   * The scopes that the token has.
   * This field is null if the token is an App Access Token.
   *
   * @example ['user:read:email', 'bits:read'] | null
   */
  scopes: null | string[];
  /**
   * The user ID of the user who the token represents. This field is undefined if validate endpoint is called with an App Access Token.
   *
   * @example '123456' | undefined
   */
  user_id: string | undefined;
}

/**
 * Represents the response from the Twitch API when validating a token.
 * This response is returned when the token is invalid.
 *
 * @link https://dev.twitch.tv/docs/authentication/validate-tokens/
 */
export interface TwitchInvalidTokenResponseDTO {
  /**
   * The message of the response.
   * Only present when the token is invalid.
   *
   * @example 'invalid access token'
   */
  message: 'invalid access token';
  /**
   * The status code of the response.
   * Only present when the token is invalid.
   *
   * @example 401
   */
  status: number;
}
