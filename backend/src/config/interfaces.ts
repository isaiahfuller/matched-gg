export interface TwitchConfig {
  apiUrl: string;
  clientId: string;
  clientSecret: string;
}

export interface SteamConfig {
  apiKey: string;
}

/**
 * Represents the configuration for the IGDB (Internet Game Database) API.
 */
export interface IgdbConfig {
  /**
   * The access token used for authentication with the IGDB API.
   */
  accessToken: string;

  /**
   * The client ID used for authentication with the IGDB API.
   */
  clientId: string;
}

export interface DbConfig {
  database: string;
  host: string;
  password: string;
  port: number;
  user: string;
}

export interface RedisConfig {
  password: string;
  port: number;
}

export interface PinoOptions {
  enabled: boolean;
  level: string;
  name: string;
}

export interface SteamConfig {
  apiKey: string;
}

export interface AuthSecrets {
  jwt: string;
  jwtRefresh: string;
  session: string;
}

export interface Config {
  authSecrets: AuthSecrets;
  db: DbConfig;
  pinoOptions: PinoOptions;
  port: number;
  redis: RedisConfig;
  steam: SteamConfig;
  twitch: TwitchConfig;
}
