import { ArtworkDTO } from './DTO/ArtworkDTO';
import { GameDTO } from './DTO/GameDTO';
import { WebsiteDTO } from './DTO/WebsiteDTO';
import {
  ArtworkFields,
  ExpandedArtworkFields,
} from './enums/fields/ArtworkFields';
import { GameFields, ExpandedGameFields } from './enums/fields/GameFields';
import {
  ExpandedWebsiteFields,
  WebsiteFields,
} from './enums/fields/WebsiteFields';

export type Fields = string;
export type AllFields =
  | GameFields
  | GameFields[]
  | ExpandedGameFields
  | ExpandedGameFields[]
  | WebsiteFields
  | WebsiteFields[]
  | ExpandedWebsiteFields
  | ExpandedWebsiteFields[]
  | ArtworkFields
  | ArtworkFields[]
  | ExpandedArtworkFields
  | ExpandedArtworkFields[];

  export type AllDTO = 
  | GameDTO
  | GameDTO[]  
  | WebsiteDTO
  | WebsiteDTO[]
  | ArtworkDTO
  | ArtworkDTO[]