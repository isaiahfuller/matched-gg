/**
 * Represents the request body for obtaining a Twitch token.
 *
 * @link https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#client-credentials-grant-flow
 */
export interface TwitchTokenRequestDTO {
  /**
   * The client ID of the Twitch application.
   */
  client_id: string;
  /**
   * The client secret of the Twitch application.
   */
  client_secret: string;
  /**
   * The grant type of the Twitch application.
   */
  grant_type: string;
}
