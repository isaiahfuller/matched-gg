import { ArtworkDTO } from './DTO/ArtworkDTO';
import { GameDTO } from './DTO/GameDTO';
import { WebsiteDTO } from './DTO/WebsiteDTO';
import {
  ArtworkField,
  ExpandedArtworkField,
} from './enums/fields/ArtworkField';
import { GameField, ExpandedGameField } from './enums/fields/GameField';
import {
  ExpandedWebsiteField,
  WebsiteField,
} from './enums/fields/WebsiteField';

export type Field = string;
export type AllField =
  | GameField
  | GameField[]
  | ExpandedGameField
  | ExpandedGameField[]
  | WebsiteField
  | WebsiteField[]
  | ExpandedWebsiteField
  | ExpandedWebsiteField[]
  | ArtworkField
  | ArtworkField[]
  | ExpandedArtworkField
  | ExpandedArtworkField[];

export type AllDTO =
  | GameDTO
  | GameDTO[]
  | WebsiteDTO
  | WebsiteDTO[]
  | ArtworkDTO
  | ArtworkDTO[];
