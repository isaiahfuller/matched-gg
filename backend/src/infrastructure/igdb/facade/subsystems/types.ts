import { ArtworkDTO } from './DTO/ArtworkDTO';
import { GameDTO } from './DTO/GameDTO';
import { WebsiteDTO } from './DTO/WebsiteDTO';
import { ArtworkField, ExpandedArtworkField } from './enum/field/ArtworkField';
import { ExpandedGameField, GameField } from './enum/field/GameField';
import { ExpandedWebsiteField, WebsiteField } from './enum/field/WebsiteField';

export type Field = string;

export type IgdbField =
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

export type IgdbDTO =
  | ArtworkDTO
  | ArtworkDTO[]
  | GameDTO
  | GameDTO[]
  | WebsiteDTO
  | WebsiteDTO[];
