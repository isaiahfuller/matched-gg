import { IGetTotalGameCount } from './interfaces';
import { Apicalypse } from 'apicalypse';

/**
 * Represents a class that retrieves the total count of games.
 */
export class GetTotalGameCount implements IGetTotalGameCount {
  client: Apicalypse;

  /**
   * Creates an instance of GetTotalGameCount.
   * @param client - The Apicalypse client used to make API requests.
   */
  constructor(client: Apicalypse) {
    this.client = client;
  }

  /**
   * Prepares the GetTotalGameCount instance for execution.
   * @returns A promise that resolves when the preparation is complete.
   */
  public async prepare(): Promise<void> {}

  /**
   * Executes the request to retrieve the total count of games.
   * @returns A promise that resolves with the total count of games.
   * @throws An error if the request fails.
   */
  public async execute(): Promise<number> {
    const countRes = await this.client.request('/games/count');
    if (countRes.status === 200) {
      return countRes.data?.count;
    } else {
      throw new Error('Failed to get total game count');
    }
  }
}
