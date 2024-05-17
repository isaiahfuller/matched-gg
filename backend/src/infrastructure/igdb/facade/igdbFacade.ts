// This is a facade design pattern, it is the entry point for the IGDB API.
import { Apicalypse } from 'apicalypse';
import igdb from 'igdb-api-node';

import {
  IgdbFacadeConstructor,
  IgdbFacadeInterface,
  SeedOptionsCC,
  SeedOptionsDelay,
} from './interfaces';
import { GetAll } from './subsystems/GetAll';
import { GetCount } from './subsystems/GetCount';
import { IGetAll, IgdbGetCount } from './subsystems/interfaces';

export class IgdbFacade implements IgdbFacadeInterface {
  public accessToken: IgdbFacadeConstructor['accessToken'];
  public client: Apicalypse;
  public clientId: IgdbFacadeConstructor['config']['clientId'];
  public config: IgdbFacadeConstructor['config'];
  protected getAll: IGetAll;

  protected getCount: IgdbGetCount;
  public logger: IgdbFacadeConstructor['logger'];

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
    concurrency,
    delay,
    expanded,
    limit,
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
