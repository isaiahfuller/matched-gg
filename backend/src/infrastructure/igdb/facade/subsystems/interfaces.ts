import { Apicalypse, RequestAllConfig } from 'apicalypse';

import { CountDTO } from './DTO/CountDTO';
import { GameDTO } from './DTO/GameDTO';
import { IgdbResources } from './enum/IgdbResources';
import { GameField } from './enum/field/GameField';

export interface IGetGame {
  client: Apicalypse;

  execute(
    id: number,
    fields: GameField | GameField[] | string,
  ): Promise<GameDTO>;
  prepare(): Promise<void>;
}

export interface IgdbSubsystem {
  client: Apicalypse;
}

export interface IgdbGetCount {
  client: Apicalypse;
  execute(resource: IgdbResources): Promise<CountDTO>;
}

export interface IGetAll {
  execute<DTO>(
    options: RequestAllConfig,
    limit: number,
    resource: IgdbResources,
    expanded?: boolean,
    totalResourceCount?: number,
  ): Promise<DTO[]>;
}
