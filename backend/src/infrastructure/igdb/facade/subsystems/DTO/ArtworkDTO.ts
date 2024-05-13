import { ArtBaseDTO, NRArtBaseDTO } from './ArtBaseDTO';

export type NRArtworkDTO = NRArtBaseDTO;

export interface ArtworkDTO extends ArtBaseDTO {
  game: number;
}
