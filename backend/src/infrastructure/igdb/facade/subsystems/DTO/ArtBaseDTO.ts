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

export interface ArtBaseDTO {
  alpha_channel: boolean;
  animated: boolean;
  checksum: string;
  height: number;
  id: number;
  image_id: string;
  url: string;
  width: number;
}
