/**
 * Represents the response body returned by Twitch API when obtaining a token.
 *
 * @link https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#client-credentials-grant-flow
 */
export interface TwitchTokenResponseDTO {
  /**
   * The access token for the Twitch API.
   */
  access_token: string;
  /**
   * The number of seconds until the token expires.
   *
   * @example 500000
   */
  expires_in: number;
  /**
   * The type of token returned.
   *
   * @example 'bearer'
   */
  token_type: string;
}
