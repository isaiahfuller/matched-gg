import { GetTotalCount } from './GetTotalCount';
import { Apicalypse } from 'apicalypse';
import { IGetTotalGameCount } from './interfaces';

/**
 * Represents a class that retrieves the total count of games.
 */
export class GetTotalGameCount
  extends GetTotalCount
  implements IGetTotalGameCount
{
  /**
   * Creates an instance of GetTotalGameCount.
   * @param client - The Apicalypse client used to make API requests.
   */
  constructor(client: Apicalypse) {
    super(client);
  }

  /**
   * Executes the request to retrieve the total count of games.
   * @returns A promise that resolves with the total count of games.
   * @throws An error if the request fails.
   */
  public async execute(): Promise<number> {
    return super.execute('games');
  }
}
