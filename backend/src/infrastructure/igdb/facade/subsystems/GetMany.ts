import { IGetMany } from './interfaces';
import { GameDTO } from './DTO/GameDTO';
import { GameFields, ExpandedGameFields } from './enums/fields/GameFields';
import { ClientId, AccessToken } from 'src/infrastructure/types';
import { Apicalypse } from 'apicalypse';
import igdb from 'igdb-api-node';
import { AxiosResponse } from 'axios';

// TODO: Fork apicalypse and fix implementation of requestAll
export class GetMany implements IGetMany {
  /**
   * The fields to be requested from the IGDB API.
   * @privateRemarks We have to delcare this at the subsystem level because of the field enforcement. This is a workaround due to the bug mentioned in the TODO.
   */
  client: Apicalypse;

  constructor(clientId: ClientId, accessToken: AccessToken) {
    this.client = igdb(clientId, accessToken);
  }

  public async execute(
    fields: GameFields[] | GameFields,
    limit: number,
    offset: number = 0,
  ): Promise<GameDTO[]> {
    const games: AxiosResponse<GameDTO[]> = (await this.client
      .limit(limit)
      .fields(fields)
      .offset(offset)
      .request('/games')) as AxiosResponse<GameDTO[]>;
    return games.data;
  }
}
