import { Apicalypse } from 'apicalypse';
import { IGetTotalCount } from './interfaces';

export class GetTotalCount implements IGetTotalCount {
  client: Apicalypse;
  resource: string;

  constructor(client: Apicalypse, resource: string) {
    this.client = client;
    this.resource = resource;
  }

  public async execute(): Promise<number> {
    const countRes = await this.client.request(`/${this.resource}/count`);
    if (countRes.status === 200) {
      return countRes.data?.count;
    } else {
      throw new Error(`Failed to get total ${this.resource} count`);
    }
  }
}
