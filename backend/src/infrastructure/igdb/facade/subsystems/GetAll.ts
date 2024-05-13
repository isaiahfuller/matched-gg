import { IGetAll } from './interfaces';
import { RequestAllConfig } from 'apicalypse';
import { AllField } from './types';
import { ExpandedGameField, GameField } from './enums/fields/GameField';
import {
  ExpandedWebsiteField,
  WebsiteField,
} from './enums/fields/WebsiteField';
import { IgdbResources } from './enums/IgdbResources';
import { IgdbConfig } from '@config/interfaces';
import { InterceptorSubsystem } from './Subsystem';

// TODO: Fork apicalypse and fix implementation of requestAll
export class GetAll extends InterceptorSubsystem implements IGetAll {
  /**
   * The fields to be requested from the IGDB API.
   * @privateRemarks We have to delcare this at the subsystem level because of the field enforcement. This is a workaround due to the bug mentioned in the TODO.
   */
  fields: AllField | undefined = undefined;
  protected totalCount: number | undefined = undefined;
  constructor(igdbConfig: IgdbConfig) {
    super(igdbConfig);
  }

  public getFields(
    expanded: boolean,
    resource: IgdbResources,
  ): AllField | undefined {
    switch (resource) {
      case IgdbResources.GAMES:
        return Object.values(expanded ? ExpandedGameField : GameField);
      case IgdbResources.WEBSITES:
        return Object.values(expanded ? ExpandedWebsiteField : WebsiteField);
      default:
        return;
    }
  }

  public async prepare({
    expanded = true,
    resource,
    totalResourceCount,
  }): Promise<void> {
    this.totalCount = totalResourceCount ? totalResourceCount : undefined;
    this.fields = this.getFields(expanded, resource) ?? this.fields;
    if (this.fields && this.totalCount) {
      this.setInterceptorClient({
        timeout: 120000,
        fields: this.fields,
        count: this.totalCount,
      });
      return Promise.resolve();
    }
    throw new Error('Fields and totalCount must be defined.');
  }

  public async execute<DTO>(
    options: RequestAllConfig,
    limit: number,
    resource: IgdbResources,
    expanded: boolean = true,
    totalResourceCount: number,
  ): Promise<DTO[]> {
    await this.prepare({ expanded, resource, totalResourceCount });
    if (this.fields) {
      const data: DTO[] = await this.client
        .limit(limit)
        .fields(this.fields)
        .requestAll(`/${resource}`, options);
      return data;
    }
    return [];
  }
}
