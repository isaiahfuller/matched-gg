import { StaticBaseDTO } from './BaseDTO';

export type NGArtworkDTO = Pick<
  ArtworkDTO,
  | 'alpha_channel'
  | 'animated'
  | 'checksum'
  | 'height'
  | 'image_id'
  | 'url'
  | 'width'
>;

export interface ArtworkDTO extends StaticBaseDTO {
  alpha_channel: boolean;
  animated: boolean;
  game: number;
  height: number;
  id: number;
  image_id: string;
  url: string;
  width: number;
}
