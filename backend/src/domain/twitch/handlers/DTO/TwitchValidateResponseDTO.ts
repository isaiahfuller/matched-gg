/**
 * Represents the response from the Twitch API when validating a token.
 *
 * @link https://dev.twitch.tv/docs/authentication/validate-tokens/
 */
export interface TwitchValidateResponseDTO {
  /**
   * The client ID of the application that requested the token.
   */
  client_id: string;
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
  scopes: string[] | null;
  /**
   * The user ID of the user who the token represents. This field is undefined if validate endpoint is called with an App Access Token.
   *
   * @example '123456' | undefined
   */
  user_id: string | undefined;
  /**
   * The number of seconds until the token expires.
   */
  expires_in: number;
}
