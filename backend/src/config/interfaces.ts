export interface TwitchConfig {
  apiUrl: string;
  clientId: string;
  clientSecret: string;
}

export interface IgdbConfig {
  clientId: string;
  accessToken: string;
}

export interface DbConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
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
  twitch: TwitchConfig;
  steam: SteamConfig;
  pinoOptions: PinoOptions;
}
