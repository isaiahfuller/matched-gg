import { ExternalGameCategory } from '../enums/ExternalGameCategory';
import { ExternalGameMedia } from '../enums/ExternalGameMedia';
import { BaseDTO } from './BaseDTO';

export interface ExternalGameDTO extends BaseDTO {
  category: ExternalGameCategory;
  countries: number[];
  game: number;
  id: number;
  media: ExternalGameMedia;
  name: string;
  platform: number[];
  uid: string;
  url: string;
  year: number;
}
