import igdb from 'igdb-api-node';
import { IGetAll } from './interfaces';
import { RequestAllConfig } from 'apicalypse';
import { requestFieldsInterceptor } from './util/requestFieldsInterceptor';
import { responseFieldsInterceptor } from './util/responseFieldsInterceptor';
import { AllField } from './types';
import { ExpandedGameField, GameField } from './enums/fields/GameField';
import {
  ExpandedWebsiteField,
  WebsiteField,
} from './enums/fields/WebsiteField';
import { Subsystem } from './Subsystem';
import { IgdbResources } from './enums/IgdbResources';
import { IgdbConfig } from '@config/interfaces';

// TODO: Fork apicalypse and fix implementation of requestAll
export class GetAll extends Subsystem implements IGetAll {
  /**
   * The fields to be requested from the IGDB API.
   * @privateRemarks We have to delcare this at the subsystem level because of the field enforcement. This is a workaround due to the bug mentioned in the TODO.
   */
  fields: AllField;
  resource: IgdbResources;

  protected totalCount: number | undefined = undefined;
  constructor(
    { clientId, accessToken }: IgdbConfig,
    fields: AllField,
    resource: IgdbResources,
  ) {
    super(
      igdb(clientId, accessToken, {
      timeout: 120000,
      transformRequest: (data) =>
        requestFieldsInterceptor(data, fields, this.totalCount),
      transformResponse: (response) =>
        responseFieldsInterceptor(response, fields),
      }),
    );
    this.fields = fields;
    this.resource = resource;
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
        this.fields = Object.values(expanded ? ExpandedGameField : GameField);
        break;
      case 'websites':
        this.fields = Object.values(
          expanded ? ExpandedWebsiteField : WebsiteField,
        );
    }
    const data = await this.client
      .limit(limit)
      .fields(this.fields)
      .requestAll(`/${this.resource}`, options);
    return data;
  }
}
