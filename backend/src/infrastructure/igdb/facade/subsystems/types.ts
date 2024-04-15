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
  | ExpandedWebsiteFields[];
