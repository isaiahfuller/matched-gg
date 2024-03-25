export interface TwitchConfig {
  apiUrl: string;
  clientId: string;
  clientSecret: string;
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

export interface Config {
  port: number;
  db: DbConfig;
  twitch: TwitchConfig;
  pinoOptions: PinoOptions;
}
