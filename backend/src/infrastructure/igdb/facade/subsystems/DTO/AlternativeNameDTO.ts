import { StaticBaseDTO } from './BaseDTO';

export interface AlternativeNameDTO extends StaticBaseDTO {
  comment?: string;
  game?: number;
  id?: number;
  name?: string;
}
