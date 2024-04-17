import { Apicalypse, RequestAllConfig } from 'apicalypse';
import { GameFields } from './enums/fields/GameFields';
import { GameDTO } from './DTO/GameDTO';
import { AxiosResponse } from 'axios';
import { WebsiteDTO } from './DTO/WebsiteDTO';

export interface IGetGame {
  client: Apicalypse;

  prepare(): Promise<void>;
  execute(
    id: number,
    fields: GameFields[] | GameFields | string,
  ): Promise<GameDTO>;
}

export interface IGetTotalCount {
  client: Apicalypse;

  prepare(): Promise<void>;
  execute(resource: string): Promise<number>;
}

export interface IGetTotalGameCount extends IGetTotalCount {
  execute(): Promise<number>;
}

export interface IGetTotalWebsiteCount extends IGetTotalCount {
  execute(): Promise<number>;
}

export interface IGetManyGames {
  client: Apicalypse;

  prepare(): Promise<void>;
  execute(
    fields: GameFields[] | GameFields | string,
    limit: number,
    ids: number[],
    offset?: number,
  ): Promise<AxiosResponse<GameDTO[]>>;
}

export interface IGetAll {
  client: Apicalypse;
  prepare(): Promise<void>;
}

export interface IGetAllGames extends IGetAll {
  execute(
    options: RequestAllConfig,
    limit: number,
    expanded?: boolean,
    totalGameCount?: number,
  ): Promise<GameDTO[]>;
}

export interface IGetAllWebsites extends IGetAll {
  execute(
    options: RequestAllConfig,
    limit: number,
    expanded?: boolean,
    totalGameCount?: number,
  ): Promise<WebsiteDTO[]>;
}
