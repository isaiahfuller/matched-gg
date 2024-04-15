import { IGetAllGames } from './interfaces';
import { GameDTO } from './DTO/GameDTO';
import { ExpandedGameFields, GameFields } from './enums/fields/GameFields';
import { ClientId, AccessToken } from 'src/infrastructure/types';
import { RequestAllConfig } from 'apicalypse';
import { GetAll } from './GetAll';

// TODO: Fork apicalypse and fix implementation of requestAll
export class GetAllGames extends GetAll implements IGetAllGames {
  /**
   * The fields to be requested from the IGDB API.
   * @privateRemarks We have to delcare this at the subsystem level because of the field enforcement. This is a workaround due to the bug mentioned in the TODO.
   */
  gameFields:
    | GameFields
    | GameFields[]
    | ExpandedGameFields
    | ExpandedGameFields[] = Object.values(GameFields);
  protected totalGameCount: number | undefined = undefined;

  constructor(clientId: ClientId, accessToken: AccessToken) {
    const fields = Object.values(GameFields);
    super('games', clientId, accessToken, fields);
  }

  public async execute(
    options: RequestAllConfig,
    limit: number,
    expanded: boolean = true,
    totalGameCount?: number,
  ): Promise<GameDTO[]> {
    return super.execute(options, limit, expanded, totalGameCount);
  }
}
