import { BaseDTO } from './BaseDTO';

export interface GameLocalizationDTO extends BaseDTO {
  cover: number;
  game: number;
  name: string;
  region: number;
}
