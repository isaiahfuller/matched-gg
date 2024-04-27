import { Logger } from 'pino';
import TwitchHandler from 'src/infrastructure/twitch/handlers/twitchHandler';
import { IgdbFacade } from '../../facade/igdbFacade';
import { IgdbDbController } from '../controller/IgdbDbController';
import { QueryResult } from 'pg';

export interface SeedConfig {
  twitch: {
    clientId: string;
    clientSecret: string;
    apiUrl: string;
  };
  accessToken?: string;
  logger: Logger;
}

export interface ISeedController {
  prepare(): Promise<() => Promise<QueryResult>>;
  seed(): Promise<QueryResult>;
}
