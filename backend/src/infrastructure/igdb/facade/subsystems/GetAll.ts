import igdb from 'igdb-api-node';
import { IgdbGetAll } from './interfaces';
import { Apicalypse, RequestAllConfig } from 'apicalypse';
import { AccessToken, ClientId } from 'src/infrastructure/types';
import { requestFieldsInterceptor } from './util/requestFieldsInterceptor';
import { responseFieldsInterceptor } from './util/responseFieldsInterceptor';
import { AllFields } from './types';
import { ExpandedGameFields, GameFields } from './enums/fields/GameFields';
import {
  ExpandedWebsiteFields,
  WebsiteFields,
} from './enums/fields/WebsiteFields';

// TODO: Fork apicalypse and fix implementation of requestAll
export class GetAll implements IgdbGetAll {
  /**
   * The fields to be requested from the IGDB API.
   * @privateRemarks We have to delcare this at the subsystem level because of the field enforcement. This is a workaround due to the bug mentioned in the TODO.
   */
  fields: AllFields;
  resource: string;
  client: Apicalypse;

  protected totalCount: number | undefined = undefined;
  constructor(
    clientId: ClientId,
    accessToken: AccessToken,
    fields: AllFields,
    resource: string,
  ) {
    this.fields = fields;
    this.resource = resource;
    this.client = igdb(clientId, accessToken, {
      timeout: 120000,
      transformRequest: (data) =>
        requestFieldsInterceptor(data, fields, this.totalCount),
      transformResponse: (response) =>
        responseFieldsInterceptor(response, fields),
    });
  }

  public async execute(
    options: RequestAllConfig,
    limit: number,
    expanded: boolean = true,
    totalCount?: number,
  ) {
    this.totalCount = totalCount ? totalCount : undefined;
    switch (this.resource) {
      case 'games':
        this.fields = Object.values(expanded ? ExpandedGameFields : GameFields);
        break;
      case 'websites':
        this.fields = Object.values(
          expanded ? ExpandedWebsiteFields : WebsiteFields,
        );
    }
    const data = await this.client
      .limit(limit)
      .fields(this.fields)
      .requestAll(`/${this.resource}`, options);
    return data;
  }
}
