import { Website } from '../enums/Website';
import { StaticBaseDTO } from './BaseDTO';

export interface WebsiteDTO extends StaticBaseDTO {
  category: Website;
  game: number;
  id: number;
  trusted: boolean;
  url: string;
}
