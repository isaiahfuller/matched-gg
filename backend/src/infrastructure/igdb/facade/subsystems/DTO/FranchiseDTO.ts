import { BaseDTO } from './BaseDTO';

export interface FranchiseDTO extends BaseDTO {
  games: number[];
  name: string;
  slug: string;
  url: string;
}
