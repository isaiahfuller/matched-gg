import { BaseDTO } from './BaseDTO';

export type NRArtBaseDTO = Pick<
  ArtBaseDTO,
  | 'alpha_channel'
  | 'animated'
  | 'checksum'
  | 'height'
  | 'image_id'
  | 'url'
  | 'width'
>;

export interface ArtBaseDTO extends BaseDTO {
  alpha_channel: boolean;
  animated: boolean;
  height: number;
  id: number;
  image_id: string;
  url: string;
  width: number;
}
