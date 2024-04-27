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
  IGetCount,
  IGetTotalGameCount,
} from './subsystems/interfaces';
import { GameDTO } from './subsystems/DTO/GameDTO';
import { WebsiteDTO } from './subsystems/DTO/WebsiteDTO';
import { ArtworkDTO } from './subsystems/DTO/ArtworkDTO';
import { GetCount } from './subsystems/GetCount';
import { GetAll } from './subsystems/GetAll';
import { ArtworkFields } from './subsystems/enums/fields/ArtworkFields';
import { GameFields } from './subsystems/enums/fields/GameFields';
import { WebsiteFields } from './subsystems/enums/fields/WebsiteFields';
import { IgdbResources } from './subsystems/enums/IgdbResources';

export class IgdbFacade implements IgdbFacadeInterface {
  public config: IgdbFacadeConstructor['config'];
  public logger: IgdbFacadeConstructor['logger'];
  public accessToken: IgdbFacadeConstructor['accessToken'];
  public client: Apicalypse;

  protected getAllGames: IGetAll;
  protected getTotalGameCount: IGetCount;
  protected getAllWebsites: IGetAll;
  protected getTotalWebsiteCount: IGetCount;
  protected getAllArtworks: IGetAll;
  protected getTotalArtworkCount: IGetCount;

  constructor(
    config: IgdbFacadeConstructor['config'],
    logger: IgdbFacadeConstructor['logger'],
    accessToken: IgdbFacadeConstructor['accessToken'],

    // Dependency injection for methods
    getAllGames?: IGetAllGames,
    getTotalGameCount?: IGetTotalGameCount,
    getAllWebsites?: GetAll,
    getTotalWebsiteCount?: GetCount,
    getAllArtworks?: GetAll,
    getTotalArtworkCount?: GetAll,
  ) {
    this.config = config;
    this.logger = logger;
    this.accessToken = accessToken;
    this.client = igdb(
      this.config.clientId,
      this.accessToken || this.config.accessToken,
    );
    this.getAllGames =
      getAllGames ||
      new GetAll(
        this.config.clientId,
        this.accessToken,
        Object.values(GameFields),
        'games',
      );
    this.getTotalGameCount =
      getTotalGameCount || new GetCount(this.client, IgdbResources.GAMES);
    this.getAllWebsites =
      getAllWebsites ||
      new GetAll(
        this.config.clientId,
        this.accessToken,
        Object.values(WebsiteFields),
        'websites',
      );
    this.getTotalWebsiteCount =
      getTotalWebsiteCount || new GetCount(this.client, IgdbResources.WEBSITES);
    this.getTotalArtworkCount =
      getTotalArtworkCount || new GetCount(this.client, IgdbResources.ARTWORKS);
    this.getAllArtworks =
      getAllArtworks ||
      new GetAll(
        this.config.clientId,
        this.accessToken,
        Object.values(ArtworkFields),
        'artworks',
      );
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
    const games: GameDTO[] = (await this.getAllGames.execute(
      {
        concurrency: concurrency || 1,
        delay: delay,
      },
      limit || 500,
      expanded,
      totalGamesCount,
    )) as GameDTO[];
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
    const websites: WebsiteDTO[] = (await this.getAllWebsites.execute(
      {
        concurrency: concurrency || 1,
        delay: delay,
      },
      limit || 500,
      expanded,
      totalWebsitesCount,
    )) as WebsiteDTO[];
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
    this.logger.info(`Total websites count retrieved from IGDB: ${totalCount}`);
    const artworks: ArtworkDTO[] = (await this.getAllArtworks.execute(
      {
        concurrency: concurrency || 1,
        delay: delay,
      },
      limit || 500,
      expanded,
      totalCount,
    )) as ArtworkDTO[];
    this.logger.info('Artworks seeded');
    return artworks;
  }
}
