import { Apicalypse, RequestAllConfig } from 'apicalypse';
import { GameField } from './enums/fields/GameField';
import { GameDTO } from './DTO/GameDTO';
import { AxiosResponse } from 'axios';
import { WebsiteDTO } from './DTO/WebsiteDTO';
import { AllDTO } from './types';
import { IgdbResources } from './enums/IgdbResources';
import { CountDTO } from './DTO/CountDTO';

export interface IGetGame {
  client: Apicalypse;

  prepare(): Promise<void>;
  execute(
    id: number,
    fields: GameField[] | GameField | string,
  ): Promise<GameDTO>;
}

export interface IgdbGetCount {
  client: Apicalypse;
  execute(resource: IgdbResources): Promise<CountDTO>;
}

export interface IGetManyGames {
  client: Apicalypse;

  prepare(): Promise<void>;
  execute(
    fields: GameField[] | GameField | string,
    limit: number,
    ids: number[],
    offset?: number,
  ): Promise<AxiosResponse<GameDTO[]>>;
}

export interface IGetAll {
  client: Apicalypse;
  execute(
    options: RequestAllConfig,
    limit: number,
    expanded?: boolean,
    totalGameCount?: number,
  ): Promise<AllDTO>;
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
