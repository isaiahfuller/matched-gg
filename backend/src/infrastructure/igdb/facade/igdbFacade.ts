// This is a facade design pattern, it is the entry point for the IGDB API.
import igdb from 'igdb-api-node';
import { Apicalypse } from 'apicalypse';
import {
  IgdbFacadeInterface,
  IgdbFacadeConstructor,
  SeedGamesOptionsCC,
  SeedGamesOptionsDelay,
} from './interfaces';
import { IGetAll, IgdbGetCount } from './subsystems/interfaces';
import { GetCount } from './subsystems/GetCount';
import { GameDTO } from './subsystems/DTO/GameDTO';
import { WebsiteDTO } from './subsystems/DTO/WebsiteDTO';
import { ArtworkDTO } from './subsystems/DTO/ArtworkDTO';
import { GetAll } from './subsystems/GetAll';
import { ArtworkField } from './subsystems/enums/fields/ArtworkField';
import { GameField } from './subsystems/enums/fields/GameField';
import { WebsiteField } from './subsystems/enums/fields/WebsiteField';
import { IgdbResources } from './subsystems/enums/IgdbResources';

export class IgdbFacade implements IgdbFacadeInterface {
  public config: IgdbFacadeConstructor['config'];
  public logger: IgdbFacadeConstructor['logger'];
  public accessToken: IgdbFacadeConstructor['accessToken'];
  public client: Apicalypse;

  protected getAllGames: IGetAll;
  protected getAllWebsites: IGetAll;
  protected getAllArtworks: IGetAll;

  protected getCount: IgdbGetCount;

  constructor(
    config: IgdbFacadeConstructor['config'],
    logger: IgdbFacadeConstructor['logger'],
    accessToken: IgdbFacadeConstructor['accessToken'],

    // Dependency injection for methods
    getAllGames?: IGetAll,
    getAllWebsites?,
    getAllArtworks?,

    getCount?: IgdbGetCount,
  ) {
    this.config = config;
    this.logger = logger;
    this.accessToken = accessToken;
    this.client = igdb(
      this.config.clientId,
      this.accessToken || this.config.accessToken,
    );
    this.getCount = getCount || new GetCount(this.client);
    this.getAllGames =
      getAllGames ||
      new GetAll(
        this.config.clientId,
        this.accessToken,
        Object.values(GameField),
        'games',
      );
    this.getAllWebsites =
      getAllWebsites ||
      new GetAll(
        this.config.clientId,
        this.accessToken,
        Object.values(WebsiteField),
        'websites',
      );
    this.getAllArtworks =
      getAllArtworks ||
      new GetAll(
        this.config.clientId,
        this.accessToken,
        Object.values(ArtworkField),
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
    const totalGamesCount = await this.getCount.execute(IgdbResources.GAMES);
    this.logger.info(
      `Total games count retrieved from IGDB: ${totalGamesCount.count}`,
    );
    const games: GameDTO[] = (await this.getAllGames.execute(
      {
        concurrency: concurrency || 1,
        delay: delay,
      },
      limit || 500,
      expanded,
      totalGamesCount.count,
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
    const totalWebsitesCount = await this.getCount.execute(
      IgdbResources.WEBSITES,
    );
    this.logger.info(
      `Total websites count retrieved from IGDB: ${totalWebsitesCount.count}`,
    );
    const websites: WebsiteDTO[] = (await this.getAllWebsites.execute(
      {
        concurrency: concurrency || 1,
        delay: delay,
      },
      limit || 500,
      expanded,
      totalWebsitesCount.count,
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
    const totalArtworksCount = await this.getCount.execute(
      IgdbResources.ARTWORKS,
    );
    this.logger.info(
      `Total websites count retrieved from IGDB: ${totalArtworksCount.count}`,
    );
    const artworks: ArtworkDTO[] = (await this.getAllArtworks.execute(
      {
        concurrency: concurrency || 1,
        delay: delay,
      },
      limit || 500,
      expanded,
      totalArtworksCount.count,
    )) as ArtworkDTO[];
    this.logger.info('Artworks seeded');
    return artworks;
  }
}
