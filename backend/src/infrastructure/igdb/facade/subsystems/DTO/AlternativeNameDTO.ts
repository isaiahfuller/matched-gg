import { StaticBaseDTO } from './BaseDTO';

export type NRAlternativeNameDTO = Pick<
  AlternativeNameDTO,
  'checksum' | 'comment' | 'id' | 'name'
>;

export interface AlternativeNameDTO extends StaticBaseDTO {
  comment: string;
  game: number;
  id: number;
  name: string;
}
