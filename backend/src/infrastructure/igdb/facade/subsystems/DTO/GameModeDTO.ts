import { BaseDTO } from './BaseDTO';

export interface GameModeDTO extends BaseDTO {
  id: number;
  name?: string;
  slug?: string;
  url?: string; // url
}
