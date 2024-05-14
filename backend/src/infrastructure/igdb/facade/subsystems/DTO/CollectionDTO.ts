import { BaseDTO } from './BaseDTO';

export interface CollectionDTO extends BaseDTO {
  games: number[];
  name: string;
  slug: string;
  url: string;
}
