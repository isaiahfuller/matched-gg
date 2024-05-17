import { Apicalypse } from 'apicalypse';
import { AxiosResponse } from 'axios';

import { CountDTO } from './DTO/CountDTO';
import { IgdbResources } from './enums/IgdbResources';
import { IgdbGetCount } from './interfaces';

export class GetCount implements IgdbGetCount {
  client: Apicalypse;

  constructor(client: Apicalypse) {
    this.client = client;
  }

  private async fetchCount(resource: IgdbResources): Promise<AxiosResponse> {
    try {
      return (await this.client.request(`/${resource}/count`)) as AxiosResponse;
    } catch (error) {
      throw new Error(`Failed to get ${resource} count`);
    }
  }

  public async execute(igdbResource: IgdbResources): Promise<CountDTO> {
    try {
      const data: CountDTO = (await this.fetchCount(igdbResource)).data;
      return data;
    } catch (error) {
      throw new Error(`Failed to get total ${igdbResource} count`);
    }
  }
}
