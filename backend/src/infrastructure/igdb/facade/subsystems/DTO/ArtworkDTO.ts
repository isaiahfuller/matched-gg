import { ArtBaseDTO } from './ArtBaseDTO';

export type NRArtworkDTO = Pick<
  ArtworkDTO,
  | 'alpha_channel'
  | 'animated'
  | 'checksum'
  | 'height'
  | 'image_id'
  | 'url'
  | 'width'
>;

export interface ArtworkDTO extends ArtBaseDTO {
  game: number;
}
