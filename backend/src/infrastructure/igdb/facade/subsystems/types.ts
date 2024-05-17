import { ArtworkDTO } from './DTO/ArtworkDTO';
import { GameDTO } from './DTO/GameDTO';
import { WebsiteDTO } from './DTO/WebsiteDTO';
import {
  ArtworkField,
  ExpandedArtworkField,
} from './enums/fields/ArtworkField';
import { ExpandedGameField, GameField } from './enums/fields/GameField';
import {
  ExpandedWebsiteField,
  WebsiteField,
} from './enums/fields/WebsiteField';

export type Field = string;
export type AllField =
  | ArtworkField
  | ArtworkField[]
  | ExpandedArtworkField
  | ExpandedArtworkField[]
  | ExpandedGameField
  | ExpandedGameField[]
  | ExpandedWebsiteField
  | ExpandedWebsiteField[]
  | GameField
  | GameField[]
  | WebsiteField
  | WebsiteField[];

export type AllDTO =
  | ArtworkDTO
  | ArtworkDTO[]
  | GameDTO
  | GameDTO[]
  | WebsiteDTO
  | WebsiteDTO[];
