export type NRAlternativeNameDTO = Pick<
  AlternativeNameDTO,
  'checksum' | 'comment' | 'id' | 'name'
>;

export interface AlternativeNameDTO {
  checksum: string;
  comment: string;
  game: number;
  id: number;
  name: string;
}
