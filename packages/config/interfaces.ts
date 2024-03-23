export interface Config {
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  twitch: {
    apiUrl: string;
    clientId: string;
    clientSecret: string;
  };
}
