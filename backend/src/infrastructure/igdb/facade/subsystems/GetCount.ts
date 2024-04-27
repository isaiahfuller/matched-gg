import { Apicalypse } from 'apicalypse';
import { IgdbGetCount } from './interfaces';
import { IgdbResources } from './enums/IgdbResources';
import { AxiosResponse } from 'axios';
import { CountDTO } from './DTO/CountDTO';

export class GetCount implements IgdbGetCount {
  client: Apicalypse;
  resource: IgdbResources;
  count: CountDTO | undefined = undefined;

  constructor(client: Apicalypse, resource: IgdbResources) {
    this.client = client;
    this.resource = resource;
  }

  private async fetchCount(): Promise<AxiosResponse> {
    try {
      return (await this.client.request(
        `/${this.resource}/count`,
      )) as AxiosResponse;
    } catch (error) {
      throw new Error(`Failed to get ${this.resource} count`);
    }
  }

  public async execute(): Promise<CountDTO> {
    try {
      const countRes = await this.fetchCount();
      if (countRes.status === 200 && countRes.data) {
        this.count = countRes.data.count;
        return countRes.data;
      }
      throw new Error(`Failed to get ${this.resource} count`);
    }
  }
}
