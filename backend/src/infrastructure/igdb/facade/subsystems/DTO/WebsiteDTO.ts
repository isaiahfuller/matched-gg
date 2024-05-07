import { Website } from '../enums/Website';

export type NRWebsiteDTO = Pick<WebsiteDTO, 'checksum' | 'trusted' | 'url'>;

export interface WebsiteDTO {
  category: Website;
  checksum: string;
  game: number;
  trusted: boolean;
  url: string;
}
