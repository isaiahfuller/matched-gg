/**
 * Represents the request body for obtaining a Twitch token.
 */
export interface TwitchTokenRequestDTO {
  client_id: string;
  client_secret: string;
  grant_type: string;
}
