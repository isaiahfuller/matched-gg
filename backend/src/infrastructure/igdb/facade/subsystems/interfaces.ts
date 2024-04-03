import { Apicalypse, RequestAllConfig } from 'apicalypse';
import { GameFields } from './enums/fields/GameFields';
import { GameDTO } from './DTO/GameDTO';
import { AxiosResponse } from 'axios';

export interface IGetGame {
  client: Apicalypse;

  prepare(): Promise<void>;
  execute(
    id: number,
    fields: GameFields[] | GameFields | string,
  ): Promise<GameDTO>;
}

export interface IGetTotalGameCount {
  client: Apicalypse;

  prepare(): Promise<void>;
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

export interface IGetAllGames {
  client: Apicalypse;

  prepare(): Promise<void>;
  execute(
    options: RequestAllConfig,
    limit: number,
    expanded?: boolean,
    totalGameCount?: number,
  ): Promise<GameDTO[]>;
}
