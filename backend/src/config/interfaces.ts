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
   * The client ID used for authentication with the IGDB API.
   */
  clientId: string;

  /**
   * The access token used for authentication with the IGDB API.
   */
  accessToken: string;
}

export interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export interface RedisConfig {
  password: string;
  port: number;
}

export interface PinoOptions {
  level: string;
  name: string;
  enabled: boolean;
}

export interface SteamConfig {
  apiKey: string;
}

export interface Config {
  port: number;
  sessionSecret: string;
  db: DbConfig;
  redis: RedisConfig;
  twitch: TwitchConfig;
  steam: SteamConfig;
  pinoOptions: PinoOptions;
}
