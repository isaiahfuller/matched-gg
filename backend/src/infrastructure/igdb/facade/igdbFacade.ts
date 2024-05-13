// This is a facade design pattern, it is the entry point for the IGDB API.
import igdb from 'igdb-api-node';
import { Apicalypse } from 'apicalypse';
import {
  IgdbFacadeInterface,
  IgdbFacadeConstructor,
  SeedOptionsCC,
  SeedOptionsDelay,
} from './interfaces';
import { IGetAll, IgdbGetCount } from './subsystems/interfaces';
import { GetCount } from './subsystems/GetCount';
import { GetAll } from './subsystems/GetAll';

export class IgdbFacade implements IgdbFacadeInterface {
  public config: IgdbFacadeConstructor['config'];
  public logger: IgdbFacadeConstructor['logger'];
  public accessToken: IgdbFacadeConstructor['accessToken'];
  public clientId: IgdbFacadeConstructor['config']['clientId'];
  public client: Apicalypse;

  protected getAll: IGetAll;
  protected getCount: IgdbGetCount;

  constructor({
    config,
    logger,
  }: {
    config: IgdbFacadeConstructor['config'];
    logger: IgdbFacadeConstructor['logger'];
  }) {
    this.config = config;
    this.logger = logger;
    this.accessToken = config.accessToken;
    this.clientId = config.clientId;

    this.client = igdb(
      this.clientId,
      this.accessToken || this.config.accessToken,
    );
    this.getCount = new GetCount(this.client);
    this.getAll = new GetAll(config);
  }

  public async seedResources<DTO>({
    limit,
    concurrency,
    delay,
    expanded,
    resource,
  }: SeedOptionsCC | SeedOptionsDelay): Promise<DTO[]> {
    this.logger.info(`Getting count of ${resource}...`);
    const totalResourcesCount = await this.getCount.execute(resource);

    this.logger.info(
      `Total ${resource} count retrieved from IGDB: ${totalResourcesCount.count}`,
    );

    const resources: DTO[] = await this.getAll.execute<DTO>(
      {
        concurrency: concurrency || 1,
        delay: delay,
      },
      limit || 500,
      resource,
      expanded,
      totalResourcesCount.count,
    );

    this.logger.info(`${resource} seeded`);
    return resources;
  }
}
