import { Apicalypse } from 'apicalypse';
import { IGetTotalCount } from './interfaces';

export abstract class GetTotalCount implements IGetTotalCount {
  client: Apicalypse;

  constructor(client: Apicalypse) {
    this.client = client;
  }

  /**
   * Prepares the GetCount instance for execution.
   * @returns A promise that resolves when the preparation is complete.
   */
  public async prepare(): Promise<void> {}

  public async execute(resource): Promise<number> {
    const countRes = await this.client.request(`/${resource}/count`);
    if (countRes.status === 200) {
      return countRes.data?.count;
    } else {
      throw new Error(`Failed to get total ${resource} count`);
    }
  }
}
