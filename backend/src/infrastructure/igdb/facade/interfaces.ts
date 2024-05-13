import { Logger } from 'pino';
import { IgdbConfig } from '@config/interfaces';
import { IgdbAccessToken } from '../types';
import { Apicalypse } from 'apicalypse';
import { IgdbResources } from './subsystems/enums/IgdbResources';

/**
 * Represents the interface for the IGDB (Internet Game Database) facade.
 */
export interface IgdbFacadeInterface {
  /**
   * The configuration for the IGDB API.
   */
  config: IgdbConfig;
  /**
   * The logger for the IGDB facade.
   */
  logger: Logger;
  /**
   * The Apicalypse wrapper
   *
   * @remarks This is a wrapper returned from the `igdb-api-node` package.
   */
  client: Apicalypse;

  /**
   * Seeds games based on the provided options.
   * @param options - The options for seeding games.
   * @returns A promise that resolves to an array of GameDTO objects.
   * @remarks WARNING: This will return over 200,000 games. Only use for seeding.
   */
  seedResources<DTO>(options: SeedOptionsCC | SeedOptionsDelay): Promise<DTO[]>;
}

/**
 * Represents the constructor for a IGDB Facade.
 */
export interface IgdbFacadeConstructor {
  accessToken: IgdbAccessToken;
  config: IgdbConfig;
  logger: Logger; // TODO: Create logger abstraction that can take any logger and return a logger with the same interface.
}

/**
 * Base options for seeding games.
 */
export interface SeedOptions {
  /**
   * The limit of games to retrieve per request.
   * defaults to the maximum of 500.
   *
   * @default 500
   */
  limit?: number | 500;
  /**
   * Whether to expand the game fields.
   * @default true
   */
  expanded?: boolean | true;
  /**
   * The IGDB resource to seed.
   */
  resource: IgdbResources;
}

/**
 * Represents options for seeding games using a multi-threaded queue.
 * If you want to use 1 thread, use `SeedOptionsDelay`.
 */
export interface SeedOptionsCC extends SeedOptions {
  /**
   * The number of concurrent requests to make when seeding games.
   */
  concurrency?: number | undefined;
  /**
   * The delay in milliseconds between requests.
   * Not allowed in `SeedOptionsCC`.
   */
  delay?: never;
}

/**
 * Represents options for seeding games with a delay.
 * Uses 1 thread by default. If you want to make use of threaded requests, use `SeedOptionsCC`.
 */
export interface SeedOptionsDelay extends SeedOptions {
  /**
   * The number of concurrent requests to make when seeding games.
   * Not allowed in `SeedOptionsDelay`.
   */
  concurrency?: never;
  /**
   * The delay in milliseconds between requests.
   */
  delay?: number | undefined;
}
