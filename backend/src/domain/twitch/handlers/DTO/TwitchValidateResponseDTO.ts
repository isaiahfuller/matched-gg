/**
 * Represents the response from the Twitch API when validating a token.
 */
export interface TwitchValidateResponseDTO {
  login: string | undefined;
  user_id: string | undefined;
  client_id: string;
  expires_in: number;
  scopes: string[] | null;
}
