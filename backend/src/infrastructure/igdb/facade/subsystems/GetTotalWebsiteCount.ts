import { GetTotalCount } from './GetTotalCount';
import { Apicalypse } from 'apicalypse';

/**
 * Represents a class that retrieves the total count of websites.
 */
export class GetTotalWebsiteCount extends GetTotalCount {
  /**
   * Creates an instance of GetTotalWebsiteCount.
   * @param client - The Apicalypse client used to make API requests.
   */
  constructor(client: Apicalypse) {
    super(client);
  }

  /**
   * Executes the request to retrieve the total count of websites.
   * @returns A promise that resolves with the total count of websites.
   * @throws An error if the request fails.
   */
  public async execute(): Promise<number> {
    return super.execute('websites');
  }
}
