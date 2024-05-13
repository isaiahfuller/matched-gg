import { Website } from '../enums/Website';
import { StaticBaseDTO } from './BaseDTO';

export type NRWebsiteDTO = Pick<
  WebsiteDTO,
  'checksum' | 'id' | 'trusted' | 'url'
>;

export interface WebsiteDTO extends StaticBaseDTO {
  category: Website;
  game: number;
  id: number;
  trusted: boolean;
  url: string;
}
