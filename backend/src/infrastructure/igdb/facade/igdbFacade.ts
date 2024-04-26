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
  IGetAll,
  IGetAllGames,
  IGetAllWebsites,
  IGetTotalCount,
  IGetTotalGameCount,
  IGetTotalWebsiteCount,
} from './subsystems/interfaces';
import { GetAllGames } from './subsystems/GetAllGames';
import { GetTotalGameCount } from './subsystems/GetTotalGameCount';
import { GameDTO } from './subsystems/DTO/GameDTO';
import { GetAllWebsites } from './subsystems/GetAllWebsites';
import { GetTotalWebsiteCount } from './subsystems/GetTotalWebsiteCount';
import { WebsiteDTO } from './subsystems/DTO/WebsiteDTO';
import { ArtworkDTO } from './subsystems/DTO/ArtworkDTO';
import { GetTotalCount } from './subsystems/GetTotalCount';
import { GetAll } from './subsystems/GetAll';
import { ArtworkFields } from './subsystems/enums/fields/ArtworkFields';
import { GameFields } from './subsystems/enums/fields/GameFields';
import { WebsiteFields } from './subsystems/enums/fields/WebsiteFields';

export class IgdbFacade implements IgdbFacadeInterface {
  public config: IgdbFacadeConstructor['config'];
  public logger: IgdbFacadeConstructor['logger'];
  public accessToken: IgdbFacadeConstructor['accessToken'];
  public client: Apicalypse;

  protected getAllGames: IGetAll;
  protected getTotalGameCount: IGetTotalCount;
  protected getAllWebsites: IGetAll;
  protected getTotalWebsiteCount: IGetTotalCount;
  protected getAllArtworks: IGetAll
  protected getTotalArtworkCount: IGetTotalCount

  constructor(
    config: IgdbFacadeConstructor['config'],
    logger: IgdbFacadeConstructor['logger'],
    accessToken: IgdbFacadeConstructor['accessToken'],

    // Dependency injection for methods
    getAllGames?: IGetAllGames,
    getTotalGameCount?: IGetTotalGameCount,
    getAllWebsites?,
    getTotalWebsiteCount?,
    getAllArtworks?, getTotalArtworkCount?
  ) {
    this.config = config;
    this.logger = logger;
    this.accessToken = accessToken;
    this.client = igdb(
      this.config.clientId,
      this.accessToken || this.config.accessToken,
    );
    this.getAllGames =
      getAllGames || new GetAll(this.config.clientId, this.accessToken, Object.values(GameFields), 'games')
    this.getTotalGameCount =
      getTotalGameCount || new GetTotalCount(this.client, 'games');
    this.getAllWebsites =
      getAllWebsites ||
      new GetAll(this.config.clientId, this.accessToken, Object.values(WebsiteFields), 'websites')
    this.getTotalWebsiteCount =
      getTotalWebsiteCount || new GetTotalCount(this.client, 'websites');
    this.getTotalArtworkCount = getTotalArtworkCount || new GetTotalCount(this.client, 'artworks')
    this.getAllArtworks = getTotalArtworkCount || new GetAll(this.config.clientId, this.accessToken, Object.values(ArtworkFields), 'artworks')
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
    ) as GameDTO[];
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
    ) as WebsiteDTO[];
    this.logger.info('Websites seeded');
    return websites;
  }

  public async seedArtworks({
    limit,
    concurrency,
    delay,
    expanded,
  }: SeedGamesOptionsCC | SeedGamesOptionsDelay): Promise<ArtworkDTO[]> {
    this.logger.info('Starting to seed artworks...');
    const totalCount = await this.getTotalWebsiteCount.execute();
    this.logger.info(
      `Total websites count retrieved from IGDB: ${totalCount}`,
    );
    const artworks: ArtworkDTO[] = await this.getAllArtworks.execute(
      {
        concurrency: concurrency || 1,
        delay: delay,
      },
      limit || 500,
      expanded,
      totalCount,
    ) as ArtworkDTO[];
    this.logger.info('Artworks seeded');
    return artworks;
  }
}
