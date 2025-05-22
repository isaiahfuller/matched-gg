export interface IGDBGame extends IGDBGeneric {
  alternative_names?: unknown | number[];
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  age_ratings?: unknown | number[];
  bundles?: unknown | number[];
  category: number;
  cover?: IGDBGameArt;
  artworks?: IGDBGameArt[];
  collections?: IGDBGameCollection[] | number[];
  dlcs?: IGDBGame[];
  expanded_games?: IGDBGame[] | number[];
  expansions?: IGDBGame[] | number[];
  external_games?: unknown[] | number[];
  first_release_date: number;
  follows?: number;
  forks?: IGDBGame[] | number[];
  franchise?: IGDBGameCollection[] | number[];
  franchises?: IGDBGameCollection[] | number[];
  game?: IGDBGame | number;
  game_engines?: unknown[] | number[];
  game_localizations?: unknown | number[];
  game_modes?: IGDBGeneric[] | number[];
  genres?: IGDBGeneric[] | number[];
  hypes?: number;
  involved_companies?: IGDBInvolvedCompany[] | number[];
  keywords?: IGDBGeneric[] | number[];
  language_supports?: number[];
  parent_game?: IGDBGame | number;
  platforms?: IGDBPlatform[] | number[];
  player_perspectives?: IGDBGeneric[] | number[];
  ports?: IGDBGame[] | number[];
  rating?: number;
  rating_count?: number;
  release_dates: IGDBDate[] | number[];
  remakes?: IGDBGame[] | number[];
  remasters?: IGDBGame[] | number[];
  screenshots?: { ss: IGDBGameArt }[];
  similar_games: number[];
  standalone_expansions?: IGDBGame[] | number[];
  storyline?: string;
  summary?: string;
  tags?: number[];
  themes?: IGDBGeneric[] | number[];
  total_rating?: number;
  total_rating_count?: number;
  uid?: string;
  updated_at: Date | number;
  videos?: IGDBVideo[] | number[];
  websites?: IGDBWebsite[] | number[];
  year?: number;
}

export interface IGDBGeneric {
  id?: number;
  igdbId?: number;
  name?: string;
  url?: string;
  checksum?: string;
  created_at?: Date | number;
  updated_at?: Date | number;
  slug?: string;
}

export interface IGDBGameArt extends IGDBGeneric {
  alpha_channel?: boolean;
  animated?: boolean;
  height: number;
  url: string;
  width: number;
  imageId: string;
  igdbId?: number;
  id?: number;
  game?: IGDBGame | number;
}

interface IGDBGameCollection extends IGDBGeneric {
  games: IGDBGame[] | number[];
  updated_at: Date | number;
  created_at: Date | number;
  slug: string;
  as_child_relations?: number[];
  as_parent_relations?: number[];
}

interface IGDBCompany extends IGDBGeneric {
  change_date_category?: number;
  country: number;
  description?: string;
  developed: IGDBGame[] | number[];
  logo: IGDBGameArt | number;
  parent?: IGDBCompany | number;
  published: IGDBGame[] | number[];
  start_date?: Date | number;
  start_date_category?: number;
  websites: IGDBWebsite[] | number[];
}

export interface IGDBInvolvedCompany extends IGDBGeneric {
  id?: number;
  company: IGDBCompany;
  developer: boolean;
  game: IGDBGame | number;
  publisher: boolean;
  porting: boolean;
  supporting: boolean;
}

export interface IGDBPlatform extends IGDBGeneric {
  abbreviation: string;
  alternative_name: string;
  category: number;
  generation?: number;
  platform_logo: IGDBGameArt | number;
  platform_family?: number;
  summary?: string;
  versions: number[];
  websites: IGDBWebsite[] | number[];
}

export interface IGDBDate extends IGDBGeneric {
  category?: number;
  date: Date | number;
  game: IGDBGame | number;
  human: string;
  m: number;
  platform: IGDBPlatform | number;
  region: number;
  status?: number;
  y: number;
}

export interface IGDBVideo extends IGDBGeneric {
  game: IGDBGame | number;
  video_id: string;
}

interface IGDBWebsite extends IGDBGeneric {
  game: IGDBGame | number;
  trusted: boolean;
  category: WebsiteEnum;
}

enum WebsiteEnum {
  official = 1,
  wikia = 2,
  wikipedia = 3,
  facebook = 4,
  twitter = 5,
  twitch = 6,
  instagram = 8,
  youtube = 9,
  iphone = 10,
  ipad = 11,
  android = 12,
  steam = 13,
  reddit = 14,
  itch = 15,
  epicgames = 16,
  gog = 17,
  discord = 18,
}

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  id?: number;
  steamId: number;
}
