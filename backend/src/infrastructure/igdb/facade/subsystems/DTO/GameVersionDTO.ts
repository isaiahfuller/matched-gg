import { BaseDTO } from './BaseDTO';

export interface GameVersionDTO extends BaseDTO {
  features: number[];
  game: number;
  games: number[];
  url: string;
}
