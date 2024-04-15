import { AccessToken, ClientId } from 'src/infrastructure/types';
import { WebsiteDTO } from './DTO/WebsiteDTO';
import {
  ExpandedWebsiteFields,
  WebsiteFields,
} from './enums/fields/WebsiteFields';
import { RequestAllConfig } from 'apicalypse';
import { GetAll } from './GetAll';

export class GetAllWebsites extends GetAll {
  websiteFields:
    | WebsiteFields
    | WebsiteFields[]
    | ExpandedWebsiteFields
    | ExpandedWebsiteFields[] = Object.values(WebsiteFields);
  protected totalWebsiteCount: number | undefined = undefined;

  constructor(clientId: ClientId, accessToken: AccessToken) {
    const fields = Object.values(WebsiteFields);
    super('websites', clientId, accessToken, fields);
  }

  public async execute(
    options: RequestAllConfig,
    limit: number,
    expanded: boolean = true,
    totalWebsiteCount?: number,
  ): Promise<WebsiteDTO[]> {
    return super.execute(options, limit, expanded, totalWebsiteCount);
  }
}
