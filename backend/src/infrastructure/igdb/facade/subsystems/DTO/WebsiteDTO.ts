import { WebsiteEnum } from '../enums/Website';

export type NRWebsiteDTO = Pick<WebsiteDTO, 'checksum' | 'trusted' | 'url'>;

export interface WebsiteDTO {
  category: WebsiteEnum;
  checksum: string;
  game: number;
  trusted: boolean;
  url: string;
}
