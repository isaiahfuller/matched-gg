import { GameCategory } from '../enums/GameCategory';
import { GameStatus } from '../enums/GameStatus';
import { BaseDTO } from './BaseDTO';

export interface GameDTO extends BaseDTO {
  age_ratings?: number[];
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  alternative_names?: number[];
  artworks?: number[];
  bundles?: number[];
  category?: GameCategory;
  collection?: number;
  collections?: number[];
  cover?: number;
  dlcs?: number[];
  expanded_games?: number[];
  expansions?: number[];
  external_games?: number[];
  first_release_date?: number;
  franchise?: number;
  franchises?: number[];
  game_engines?: number[];
  game_localizations?: number[];
  game_modes?: number[];
  genres?: number[];
  hypes?: number;
  id: number;
  involved_companies?: number[];
  keywords?: number[];
  language_supports?: number[];
  multiplayer_modes?: number[];
  name?: string;
  parent_game?: number;
  platforms?: number[];
  player_perspectives?: number[];
  ports?: number[];
  rating?: number;
  rating_count?: number;
  release_dates?: number;
  remakes?: number[];
  remasters?: number[];
  screenshots?: number[];
  similar_games?: number[];
  slug?: string;
  standalone_expansions?: number[];
  status?: GameStatus;
  storyline?: string;
  summary?: string;
  tags?: number[]; // IMPORTANT
  themes?: number[];
  total_rating?: number;
  total_rating_count?: number;
  url?: string; // url
  version_parent?: number;
  version_title?: string;
  videos?: number[];
  websites?: number[];
}
