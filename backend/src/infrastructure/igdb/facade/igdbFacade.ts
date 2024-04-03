// This is a facade design pattern, it is the entry point for the IGDB API.
import igdb from 'igdb-api-node';
import { Apicalypse } from 'apicalypse';
import {
  IgdbFacadeInterface,
  IgdbFacadeConstructor,
  SeedGamesOptionsCC,
  SeedGamesOptionsDelay,
} from './interfaces';
import { IGetAllGames, IGetTotalGameCount } from './subsystems/interfaces';
import { GetAllGames } from './subsystems/GetAllGames';
import { GetTotalGameCount } from './subsystems/GetTotalGameCount';
import { GameDTO } from './subsystems/DTO/GameDTO';

export class IgdbFacade implements IgdbFacadeInterface {
  public config: IgdbFacadeConstructor['config'];
  public logger: IgdbFacadeConstructor['logger'];
  public accessToken: IgdbFacadeConstructor['accessToken'];
  public client: Apicalypse;

  protected getAllGames: IGetAllGames;
  protected getTotalGameCount: IGetTotalGameCount;

  constructor(
    config: IgdbFacadeConstructor['config'],
    logger: IgdbFacadeConstructor['logger'],
    accessToken: IgdbFacadeConstructor['accessToken'],

    // Dependency injection for methods
    getAllGames?: IGetAllGames,
    getTotalGameCount?: IGetTotalGameCount,
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
  }

  public async seedGames({
    limit,
    concurrency,
    delay,
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
      true,
      totalGamesCount,
    );
    this.logger.info('Games seeded');
    return games;
  }
}
