import { Website } from '../enums/Website';

export type NRWebsiteDTO = Pick<
  WebsiteDTO,
  'checksum' | 'id' | 'trusted' | 'url'
>;

export interface WebsiteDTO {
  category: Website;
  checksum: string;
  game: number;
  id: number;
  trusted: boolean;
  url: string;
}
