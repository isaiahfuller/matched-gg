import { BaseDTO } from './BaseDTO';

export interface ArtBaseDTO extends BaseDTO {
  alpha_channel?: boolean;
  animated?: boolean;
  height?: number;
  id?: number;
  image_id?: string;
  url?: string;
  width?: number;
}
