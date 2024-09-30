import {
  bigint,
  doublePrecision,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

import { coverTable } from './artworks';
import { franchisesTable } from './franchise';

// declaring enum in database
export const GameCategoryPGEnum = pgEnum('GameCategoryEnum', [
  'MAIN_GAME',
  'DLC_ADDON',
  'EXPANSION',
  'BUNDLE',
  'STANDALONE_EXPANSION',
  'MOD',
  'EPISODE',
  'SEASON',
  'REMAKE',
  'REMASTER',
  'EXPANDED_GAME',
  'PORT',
  'FORK',
  'PACK',
  'UPDATE',
]);

export const StatusPGEnum = pgEnum('StatusEnum', [
  'RELEASED',
  'ALPHA',
  'BETA',
  'EARLY_ACCESS',
  'OFFLINE',
  'CANCELLED',
  'RUMORED',
  'DELISTED',
]);

export const gamesTable = pgTable(
  'games',
  {
    ageRatings: bigint('age_ratings', { mode: 'number' }).array(),
    aggregatedRating: doublePrecision('aggregated_rating'),
    aggregatedRatingCount: integer('aggregated_rating_count'),
    alternativeNames: bigint('alternative_names', { mode: 'number' }).array(),
    artworks: bigint('artworks', { mode: 'number' }).array(),
    bundles: bigint('bundles', { mode: 'number' }).array(),
    category: GameCategoryPGEnum('category'),
    checksum: text('checksum'),
    collections: bigint('collections', { mode: 'number' }).array(),
    cover: bigint('cover', { mode: 'number' }).references(
      () => coverTable.igdbId,
    ),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    dlcs: bigint('dlcs', { mode: 'number' }).array(),
    expandedGames: bigint('expanded_games', { mode: 'number' }).array(),
    expansions: bigint('expansions', { mode: 'number' }).array(),
    externalGames: bigint('external_games', { mode: 'number' }).array(),
    firstReleaseDate: timestamp('first_release_date'),
    forks: bigint('forks', { mode: 'number' }).array(),
    franchise: bigint('franchise', { mode: 'number' }).references(
      () => franchisesTable.igdbId,
    ),
    franchises: bigint('franchises', { mode: 'number' }).array(),
    gameCategory: GameCategoryPGEnum('game_category'),
    gameEngines: bigint('game_engines', { mode: 'number' }).array(),
    gameLocalizations: bigint('game_localizations', { mode: 'number' }).array(),
    gameModes: bigint('game_modes', { mode: 'number' }).array(),
    genres: bigint('genres', { mode: 'number' }).array(),
    hypes: integer('hypes'),
    id: serial('game_id').notNull().unique(),
    igdbCreatedAt: timestamp('igdb_created_at'),
    igdbId: bigint('igdb_id', { mode: 'number' }).primaryKey(),
    igdbUpdatedAt: timestamp('igdb_updated_at'),
    involvedCompanies: bigint('involved_companies', { mode: 'number' }).array(),
    keywords: bigint('keywords', { mode: 'number' }).array(),
    languageSupports: bigint('language_supports', { mode: 'number' }).array(),
    multiplayerModes: bigint('multiplayer_modes', { mode: 'number' }).array(),
    name: text('name').notNull(),
    parentGame: bigint('parent_game', { mode: 'number' }).references(
      () => gamesTable.igdbId,
    ),
    platforms: bigint('platforms', { mode: 'number' }).array(),
    playerPerspectives: bigint('player_perspectives', {
      mode: 'number',
    }).array(),
    ports: bigint('ports', { mode: 'number' }).array(),
    rating: doublePrecision('rating'),
    ratingCount: integer('rating_count'),
    releaseDates: bigint('release_dates', { mode: 'number' }).array(),
    remakes: bigint('remakes', { mode: 'number' }).array(),
    remasters: bigint('remasters', { mode: 'number' }).array(),
    screenshots: bigint('screenshots', { mode: 'number' }).array(),
    similarGames: bigint('similar_games', { mode: 'number' }).array(),
    slug: text('slug'),
    standaloneExpansions: bigint('standalone_expansions', {
      mode: 'number',
    }).array(),
    status: StatusPGEnum('status'),
    storyline: text('storyline'),
    summary: text('summary'),
    tags: bigint('tags', { mode: 'number' }).array(),
    themes: bigint('themes', { mode: 'number' }).array(),
    totalRating: doublePrecision('total_rating'),
    totalRatingCount: integer('total_rating_count'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    url: text('url'),
    versionParent: bigint('version_parent', { mode: 'number' }).references(
      () => gamesTable.igdbId,
    ),
    versionTitle: text('version_title'),
    videos: bigint('videos', { mode: 'number' }).array(),
    websites: bigint('websites', { mode: 'number' }).array(),
  },
  (table) => {
    return {
      nameIdx: index('name_idx').on(table.name),
      slugIdx: index('slug_idx').on(table.slug),
      uniqueIgdbIdIdx: uniqueIndex('igdb_id_idx').on(table.igdbId),
    };
  },
);

export type Games = typeof gamesTable.$inferInsert;
