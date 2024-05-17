import { BaseDTO } from './BaseDTO';

export interface GameEngineDTO extends BaseDTO {
  companies: number[];
  description: string;
  logo: number;
  name: string;
  platforms: number[];
  slug: string;
  url: string;
}
