import { ArtworkDTO } from './ArtworkDTO';

export type NRCoversDTO = Pick<
  CoversDTO,
  | 'alpha_channel'
  | 'animated'
  | 'checksum'
  | 'height'
  | 'image_id'
  | 'url'
  | 'width'
>;

export interface CoversDTO extends ArtworkDTO {
  game_localization: number;
}
