import { StaticBaseDTO } from './BaseDTO';

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
