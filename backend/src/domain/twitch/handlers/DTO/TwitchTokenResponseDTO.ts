/**
 * Represents the response body returned by Twitch API when obtaining a token.
 */
export interface TwitchTokenResponseDTO {
  access_token: string;
  expires_in: number;
  token_type: string;
}
