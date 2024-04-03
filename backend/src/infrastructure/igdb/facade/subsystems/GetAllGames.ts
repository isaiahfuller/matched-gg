import { IGetAllGames } from './interfaces';
import { GameDTO } from './DTO/GameDTO';
import { GameFields, ExpandedGameFields } from './enums/fields/GameFields';
import { requestFieldsInterceptor } from './util/requestFieldsInterceptor';
import { responseFieldsInterceptor } from './util/responseFieldsInterceptor';
import { ClientId, AccessToken } from 'src/infrastructure/types';
import { Apicalypse, RequestAllConfig } from 'apicalypse';
import igdb from 'igdb-api-node';

// TODO: Fork apicalypse and fix implementation of requestAll
export class GetAllGames implements IGetAllGames {
  /**
   * The fields to be requested from the IGDB API.
   * @privateRemarks We have to delcare this at the subsystem level because of the field enforcement. This is a workaround due to the bug mentioned in the TODO.
   */
  gameFields:
    | GameFields
    | GameFields[]
    | ExpandedGameFields
    | ExpandedGameFields[] = Object.values(GameFields);
  client: Apicalypse;
  protected totalGameCount: number | undefined = undefined;

  constructor(clientId: ClientId, accessToken: AccessToken) {
    this.client = igdb(clientId, accessToken, {
      timeout: 120000,
      transformRequest: (data) =>
        requestFieldsInterceptor(data, this.gameFields, this.totalGameCount),
      transformResponse: (response) =>
        responseFieldsInterceptor(response, this.gameFields),
    });
  }

  public async prepare(): Promise<void> {}

  public async execute(
    options: RequestAllConfig,
    limit: number,
    expanded: boolean = true,
    totalGameCount?: number,
  ): Promise<GameDTO[]> {
    this.gameFields = Object.values(expanded ? ExpandedGameFields : GameFields);
    this.totalGameCount = totalGameCount ? totalGameCount : undefined;
    const games: GameDTO[] = await this.client
      .limit(limit)
      .fields(this.gameFields)
      .requestAll('/games', options);
    return games;
  }
}
