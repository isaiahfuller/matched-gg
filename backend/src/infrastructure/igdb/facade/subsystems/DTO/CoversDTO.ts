import { NRArtBaseDTO } from './ArtBaseDTO';
import { ArtworkDTO } from './ArtworkDTO';

export type NRCoversDTO = NRArtBaseDTO;

export interface CoversDTO extends ArtworkDTO {
  game_localization: number;
}
