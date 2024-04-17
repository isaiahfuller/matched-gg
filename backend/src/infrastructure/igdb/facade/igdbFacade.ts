// This is a facade design pattern, it is the entry point for the IGDB API.
import igdb from 'igdb-api-node';
import { Apicalypse } from 'apicalypse';
import {
  IgdbFacadeInterface,
  IgdbFacadeConstructor,
  SeedGamesOptionsCC,
  SeedGamesOptionsDelay,
} from './interfaces';
import {
  IGetAllGames,
  IGetAllWebsites,
  IGetTotalGameCount,
  IGetTotalWebsiteCount,
} from './subsystems/interfaces';
import { GetAllGames } from './subsystems/GetAllGames';
import { GetTotalGameCount } from './subsystems/GetTotalGameCount';
import { GameDTO } from './subsystems/DTO/GameDTO';
import { GetAllWebsites } from './subsystems/GetAllWebsites';
import { GetTotalWebsiteCount } from './subsystems/GetTotalWebsiteCount';
import { WebsiteDTO } from './subsystems/DTO/WebsiteDTO';

export class IgdbFacade implements IgdbFacadeInterface {
  public config: IgdbFacadeConstructor['config'];
  public logger: IgdbFacadeConstructor['logger'];
  public accessToken: IgdbFacadeConstructor['accessToken'];
  public client: Apicalypse;

  protected getAllGames: IGetAllGames;
  protected getTotalGameCount: IGetTotalGameCount;
  protected getAllWebsites: IGetAllWebsites;
  protected getTotalWebsiteCount: IGetTotalWebsiteCount;

  constructor(
    config: IgdbFacadeConstructor['config'],
    logger: IgdbFacadeConstructor['logger'],
    accessToken: IgdbFacadeConstructor['accessToken'],

    // Dependency injection for methods
    getAllGames?: IGetAllGames,
    getTotalGameCount?: IGetTotalGameCount,
    getAllWebsites?,
    getTotalWebsiteCount?,
  ) {
    this.config = config;
    this.logger = logger;
    this.accessToken = accessToken;
    this.client = igdb(
      this.config.clientId,
      this.accessToken || this.config.accessToken,
    );
    this.getAllGames =
      getAllGames || new GetAllGames(this.config.clientId, this.accessToken);
    this.getTotalGameCount =
      getTotalGameCount || new GetTotalGameCount(this.client);
    this.getAllWebsites =
      getAllWebsites ||
      new GetAllWebsites(this.config.clientId, this.accessToken);
    this.getTotalWebsiteCount =
      getTotalWebsiteCount || new GetTotalWebsiteCount(this.client);
  }

  public async seedGames({
    limit,
    concurrency,
    delay,
    expanded,
  }: SeedGamesOptionsCC | SeedGamesOptionsDelay): Promise<GameDTO[]> {
    this.logger.info('Starting to seed games...');
    const totalGamesCount = await this.getTotalGameCount.execute();
    this.logger.info(
      `Total games count retrieved from IGDB: ${totalGamesCount}`,
    );
    const games: GameDTO[] = await this.getAllGames.execute(
      {
        concurrency: concurrency || 1,
        delay: delay,
      },
      limit || 500,
      expanded,
      totalGamesCount,
    );
    this.logger.info('Games seeded');
    return games;
  }

  public async seedWebsites({
    limit,
    concurrency,
    delay,
    expanded,
  }: SeedGamesOptionsCC | SeedGamesOptionsDelay): Promise<WebsiteDTO[]> {
    this.logger.info('Starting to seed websites...');
    const totalWebsitesCount = await this.getTotalWebsiteCount.execute();
    this.logger.info(
      `Total websites count retrieved from IGDB: ${totalWebsitesCount}`,
    );
    const websites: WebsiteDTO[] = await this.getAllWebsites.execute(
      {
        concurrency: concurrency || 1,
        delay: delay,
      },
      limit || 500,
      expanded,
      totalWebsitesCount,
    );
    this.logger.info('Websites seeded');
    return websites;
  }
}
