import { Apicalypse, RequestAllConfig } from 'apicalypse';
import { AxiosResponse } from 'axios';

export interface IgdbBase {
  client: Apicalypse;
}

export interface IgdbGet extends IgdbBase {
  execute<Fields, DTO>(
    fields: Fields[] | Fields | string,
    limit: number,
    ids: number[],
    offset?: number,
  ): Promise<AxiosResponse<DTO[]>>;
}

export interface IgdbGetAll extends IgdbBase {
  execute<DTO>(
    options: RequestAllConfig,
    limit: number,
    expanded?: boolean,
    totalCount?: number,
  ): Promise<DTO[]>;
}

export interface IgdbGetCount extends IgdbBase {
  execute<DTO>(): Promise<AxiosResponse<DTO>>;
}
